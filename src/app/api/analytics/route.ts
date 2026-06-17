import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET : récupérer toutes les statistiques pour le dashboard admin
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "vision2000admin";

    if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // === STATISTIQUES VISITES ===
    const visitsToday = await db.visit.count({
      where: { enteredAt: { gte: todayStart } },
    });
    const visitsWeek = await db.visit.count({
      where: { enteredAt: { gte: weekAgo } },
    });
    const visitsMonth = await db.visit.count({
      where: { enteredAt: { gte: monthAgo } },
    });
    const visitsTotal = await db.visit.count();

    // Sessions uniques (visiteurs uniques)
    const uniqueSessionsToday = await db.visit.groupBy({
      by: ["sessionId"],
      where: { enteredAt: { gte: todayStart } },
    });
    const uniqueSessionsWeek = await db.visit.groupBy({
      by: ["sessionId"],
      where: { enteredAt: { gte: weekAgo } },
    });
    const uniqueSessionsMonth = await db.visit.groupBy({
      by: ["sessionId"],
      where: { enteredAt: { gte: monthAgo } },
    });
    const uniqueSessionsTotal = await db.visit.groupBy({
      by: ["sessionId"],
    });

    // === PAGES LES PLUS VISITÉES (top 10) ===
    const topPages = await db.visit.groupBy({
      by: ["path"],
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    });

    // === DURÉE MOYENNE DE VISITE ===
    const visitsWithDuration = await db.visit.findMany({
      where: { duration: { gt: 0 } },
      select: { duration: true },
      take: 1000,
    });
    const avgDuration =
      visitsWithDuration.length > 0
        ? Math.round(
            visitsWithDuration.reduce((sum, v) => sum + v.duration, 0) /
              visitsWithDuration.length
          )
        : 0;

    // === CLICS LES PLUS POPULAIRES (top 10) ===
    const topClicks = await db.click.groupBy({
      by: ["element", "label"],
      _count: { element: true },
      orderBy: { _count: { element: "desc" } },
      take: 10,
    });

    // === CLICS PAR JOUR (7 derniers jours) ===
    const clicksLast7Days = await db.click.findMany({
      where: { timestamp: { gte: weekAgo } },
      select: { timestamp: true, element: true },
    });
    const clicksByDay: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().split("T")[0];
      clicksByDay[key] = 0;
    }
    clicksLast7Days.forEach((c) => {
      const key = c.timestamp.toISOString().split("T")[0];
      if (key in clicksByDay) clicksByDay[key]++;
    });

    // === VISITES PAR JOUR (7 derniers jours) ===
    const visitsLast7Days = await db.visit.findMany({
      where: { enteredAt: { gte: weekAgo } },
      select: { enteredAt: true },
    });
    const visitsByDay: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().split("T")[0];
      visitsByDay[key] = 0;
    }
    visitsLast7Days.forEach((v) => {
      const key = v.enteredAt.toISOString().split("T")[0];
      if (key in visitsByDay) visitsByDay[key]++;
    });

    // === SOURCES (referrers) ===
    const referrers = await db.visit.groupBy({
      by: ["referrer"],
      _count: { referrer: true },
      orderBy: { _count: { referrer: "desc" } },
      take: 5,
    });

    // === SOUMISSIONS (déjà dans /api/submissions mais on inclut les compteurs) ===
    const submissionsNew = await db.submission.count({
      where: { status: "new" },
    });
    const submissionsTotal = await db.submission.count();

    // === VISITEURS EN LIGNE (sessions actives dans les 5 dernières minutes) ===
    const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const activeSessions = await db.visit.groupBy({
      by: ["sessionId"],
      where: { enteredAt: { gte: fiveMinAgo } },
    });

    return NextResponse.json({
      visits: {
        today: visitsToday,
        week: visitsWeek,
        month: visitsMonth,
        total: visitsTotal,
      },
      visitors: {
        today: uniqueSessionsToday.length,
        week: uniqueSessionsWeek.length,
        month: uniqueSessionsMonth.length,
        total: uniqueSessionsTotal.length,
      },
      onlineNow: activeSessions.length,
      avgDuration,
      topPages: topPages.map((p) => ({ path: p.path, count: p._count.path })),
      topClicks: topClicks.map((c) => ({
        element: c.element,
        label: c.label,
        count: c._count.element,
      })),
      visitsByDay: Object.entries(visitsByDay).map(([date, count]) => ({ date, count })),
      clicksByDay: Object.entries(clicksByDay).map(([date, count]) => ({ date, count })),
      referrers: referrers.map((r) => ({
        source: r.referrer || "(direct)",
        count: r._count.referrer,
      })),
      submissions: {
        new: submissionsNew,
        total: submissionsTotal,
      },
    });
  } catch (error) {
    console.error("Erreur analytics GET:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
