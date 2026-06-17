import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST : nouvelle soumission (contact, devis ou formation)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, phone, subject, message, sourceLang, targetLang, wordCount, docType, delivery, estimatedPrice, formation } = body;

    // Validation de base
    if (!name || !email || !type) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const submission = await db.submission.create({
      data: {
        type,
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message: message || null,
        sourceLang: sourceLang || null,
        targetLang: targetLang || null,
        wordCount: wordCount ? parseInt(wordCount) : null,
        docType: docType || null,
        delivery: delivery || null,
        estimatedPrice: estimatedPrice ? parseInt(estimatedPrice) : null,
        formation: formation || null,
      },
    });

    return NextResponse.json({
      success: true,
      id: submission.id,
      message: "Soumission enregistrée avec succès",
    });
  } catch (error) {
    console.error("Erreur API submissions POST:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// GET : liste des soumissions (protégé par mot de passe admin)
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "vision2000admin";

    if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const submissions = await db.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Erreur API submissions GET:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PATCH : mettre à jour le statut d'une soumission
export async function PATCH(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "vision2000admin";

    if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID et statut requis" }, { status: 400 });
    }

    const updated = await db.submission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, submission: updated });
  } catch (error) {
    console.error("Erreur API submissions PATCH:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE : supprimer une soumission
export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "vision2000admin";

    if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }

    await db.submission.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API submissions DELETE:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
