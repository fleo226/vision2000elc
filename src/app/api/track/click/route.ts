import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST : enregistrer un clic
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, path, element, label, href } = body;

    if (!sessionId || !path || !element) {
      return NextResponse.json({ error: "sessionId, path et element requis" }, { status: 400 });
    }

    const click = await db.click.create({
      data: {
        sessionId,
        path,
        element,
        label: label || null,
        href: href || null,
      },
    });

    return NextResponse.json({ success: true, id: click.id });
  } catch (error) {
    console.error("Erreur track click:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
