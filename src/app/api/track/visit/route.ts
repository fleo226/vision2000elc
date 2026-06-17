import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST : enregistrer une visite de page
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, path, referrer, userAgent, language } = body;

    if (!sessionId || !path) {
      return NextResponse.json({ error: "sessionId et path requis" }, { status: 400 });
    }

    const visit = await db.visit.create({
      data: {
        sessionId,
        path,
        referrer: referrer || null,
        userAgent: userAgent || null,
        language: language || null,
        duration: 0,
        enteredAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, id: visit.id });
  } catch (error) {
    console.error("Erreur track visit:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PATCH : mettre à jour la durée d'une visite (à la sortie)
// Supporte aussi le POST avec ?method=PATCH pour sendBeacon
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, duration } = body;

    if (!id) {
      return NextResponse.json({ error: "id requis" }, { status: 400 });
    }

    await db.visit.update({
      where: { id },
      data: {
        duration: duration || 0,
        exitedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur track visit update:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST avec ?method=PATCH : pour sendBeacon (qui ne supporte que POST)
export async function PUT(req: NextRequest) {
  return PATCH(req);
}
