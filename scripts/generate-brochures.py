"""
Génère 3 brochures PDF professionnelles pour VISION 2000 ELC
- brochure-formations.pdf : catalogue formations 2026
- brochure-traduction.pdf : tarifs et services traduction
- brochure-interpretation.pdf : services d'interprétation
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, Image, KeepTogether, ListFlowable, ListItem
)
from reportlab.platypus.flowables import HRFlowable
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os

# Palette
NAVY = HexColor("#0B1F3A")
NAVY_SOFT = HexColor("#1A3458")
CREAM = HexColor("#FAF7F2")
CREAM_WARM = HexColor("#F4EDE2")
ORANGE = HexColor("#F97316")
ORANGE_DEEP = HexColor("#EA580C")
CRIMSON = HexColor("#DC2626")
EMERALD = HexColor("#10B981")
GOLD = HexColor("#F59E0B")

OUTPUT_DIR = "/home/z/my-project/public"

# ============================================================
# Styles communs
# ============================================================
def get_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name="CoverTitle",
        parent=styles["Title"],
        fontSize=32,
        leading=38,
        textColor=white,
        alignment=TA_CENTER,
        spaceAfter=10,
        fontName="Helvetica-Bold",
    ))
    styles.add(ParagraphStyle(
        name="CoverSubtitle",
        parent=styles["Normal"],
        fontSize=14,
        leading=18,
        textColor=white,
        alignment=TA_CENTER,
        fontName="Helvetica",
    ))
    styles.add(ParagraphStyle(
        name="SectionHeading",
        parent=styles["Heading1"],
        fontSize=20,
        leading=24,
        textColor=NAVY,
        alignment=TA_LEFT,
        spaceBefore=20,
        spaceAfter=10,
        fontName="Helvetica-Bold",
    ))
    styles.add(ParagraphStyle(
        name="SubHeading",
        parent=styles["Heading2"],
        fontSize=14,
        leading=18,
        textColor=ORANGE,
        alignment=TA_LEFT,
        spaceBefore=12,
        spaceAfter=6,
        fontName="Helvetica-Bold",
    ))
    styles.add(ParagraphStyle(
        name="BodyTextCustom",
        parent=styles["Normal"],
        fontSize=10,
        leading=14,
        textColor=NAVY_SOFT,
        alignment=TA_JUSTIFY,
        fontName="Helvetica",
        spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name="BulletItem",
        parent=styles["Normal"],
        fontSize=10,
        leading=14,
        textColor=NAVY_SOFT,
        alignment=TA_LEFT,
        fontName="Helvetica",
        leftIndent=15,
    ))
    styles.add(ParagraphStyle(
        name="FooterStyle",
        parent=styles["Normal"],
        fontSize=8,
        leading=10,
        textColor=NAVY_SOFT,
        alignment=TA_CENTER,
        fontName="Helvetica-Oblique",
    ))
    return styles

# ============================================================
# Page de couverture (fond navy + titre)
# ============================================================
def cover_page(canvas_obj, doc, title, subtitle, color=NAVY):
    canvas_obj.saveState()
    width, height = A4
    # Fond
    canvas_obj.setFillColor(color)
    canvas_obj.rect(0, 0, width, height, fill=1, stroke=0)
    # Bande orange en haut
    canvas_obj.setFillColor(ORANGE)
    canvas_obj.rect(0, height - 1.2*cm, width, 1.2*cm, fill=1, stroke=0)
    # Cercles décoratifs
    canvas_obj.setFillColor(HexColor("#1A3458"))
    canvas_obj.circle(width - 3*cm, 5*cm, 6*cm, fill=1, stroke=0)
    canvas_obj.setFillColor(ORANGE)
    canvas_obj.setFillAlpha(0.15)
    canvas_obj.circle(2*cm, height - 8*cm, 4*cm, fill=1, stroke=0)
    canvas_obj.setFillAlpha(1.0)
    # Logo (carré orange avec texte)
    canvas_obj.setFillColor(white)
    canvas_obj.roundRect(width/2 - 2.5*cm, height/2 + 1*cm, 5*cm, 5*cm, 10, fill=0, stroke=1)
    canvas_obj.setFillColor(ORANGE)
    canvas_obj.circle(width/2, height/2 + 3.5*cm, 1.2*cm, fill=1, stroke=0)
    canvas_obj.setFillColor(white)
    canvas_obj.setFont("Helvetica-Bold", 10)
    canvas_obj.drawCentredString(width/2, height/2 + 3.3*cm, "VISION")
    canvas_obj.drawCentredString(width/2, height/2 + 2.8*cm, "2000")
    canvas_obj.drawCentredString(width/2, height/2 + 2.3*cm, "ELC")
    # Titre
    canvas_obj.setFillColor(white)
    canvas_obj.setFont("Helvetica-Bold", 28)
    canvas_obj.drawCentredString(width/2, height/2 - 1*cm, title)
    # Sous-titre
    canvas_obj.setFont("Helvetica", 14)
    canvas_obj.setFillColor(HexColor("#F4EDE2"))
    canvas_obj.drawCentredString(width/2, height/2 - 2*cm, subtitle)
    # Bas de page
    canvas_obj.setFont("Helvetica-Oblique", 9)
    canvas_obj.setFillColor(HexColor("#9CB0C9"))
    canvas_obj.drawCentredString(width/2, 2*cm, "VISION 2000 ELC · Koulouba, Ouagadougou, Burkina Faso · +226 70 46 26 70")
    canvas_obj.restoreState()

# ============================================================
# Page de contenu standard (fond crème)
# ============================================================
def content_page(canvas_obj, doc):
    canvas_obj.saveState()
    width, height = A4
    # Fond crème
    canvas_obj.setFillColor(CREAM)
    canvas_obj.rect(0, 0, width, height, fill=1, stroke=0)
    # Bande supérieure navy
    canvas_obj.setFillColor(NAVY)
    canvas_obj.rect(0, height - 1*cm, width, 1*cm, fill=1, stroke=0)
    # Logo en haut à gauche
    canvas_obj.setFillColor(white)
    canvas_obj.setFont("Helvetica-Bold", 9)
    canvas_obj.drawString(2*cm, height - 0.65*cm, "VISION 2000 ELC")
    # Texte à droite
    canvas_obj.setFont("Helvetica", 8)
    canvas_obj.drawRightString(width - 2*cm, height - 0.65*cm, "Koulouba, Ouagadougou · +226 70 46 26 70")
    # Footer
    canvas_obj.setFillColor(NAVY_SOFT)
    canvas_obj.setFont("Helvetica-Oblique", 8)
    canvas_obj.drawCentredString(width/2, 1.2*cm, f"Page {doc.page} · © 2026 VISION 2000 ELC · contact@vision2000elc.com")
    canvas_obj.restoreState()

# ============================================================
# Brochure 1 : Formations
# ============================================================
def brochure_formations():
    doc = SimpleDocTemplate(
        f"{OUTPUT_DIR}/brochure-formations.pdf",
        pagesize=A4,
        topMargin=2*cm,
        bottomMargin=2*cm,
        leftMargin=2*cm,
        rightMargin=2*cm,
    )
    styles = get_styles()
    story = []

    # ===== Page 1 : Couverture =====
    story.append(Spacer(1, 12*cm))  # espace pour la couverture
    story.append(PageBreak())

    # ===== Page 2 : Introduction + programme général =====
    story.append(Paragraph("Nos Formations en Anglais", styles["SectionHeading"]))
    story.append(Paragraph(
        "Depuis plus de 20 ans, VISION 2000 ELC forme particuliers, entreprises, ONG et institutions "
        "au Burkina Faso. Nos programmes progressifs vous mènent du niveau débutant au niveau avancé, "
        "avec un suivi pédagogique personnalisé et des formateurs expérimentés.",
        styles["BodyTextCustom"]
    ))

    story.append(Paragraph("Programme Anglais Général", styles["SubHeading"]))
    story.append(Paragraph(
        "Trois niveaux pour structurer votre apprentissage, du premier mot à la maîtrise complète :",
        styles["BodyTextCustom"]
    ))

    general_data = [
        ["Niveau", "Durée", "Objectifs clés"],
        ["Débutant (A1-A2)", "3-6 mois", "Vocabulaire de survie, conversations basiques, grammaire fondamentale"],
        ["Intermédiaire (B1-B2)", "4-6 mois", "Expression courante, compréhension de textes complexes, discussions professionnelles"],
        ["Avancé (C1-C2)", "3-6 mois", "Maîtrise stylistique, nuances idiomatiques, débats et argumentation"],
    ]
    t = Table(general_data, colWidths=[4*cm, 3*cm, 9*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),
        ("BACKGROUND", (0, 1), (-1, -1), white),
        ("TEXTCOLOR", (0, 1), (-1, -1), NAVY_SOFT),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#E5DDD0")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, CREAM_WARM]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.5*cm))

    # ===== Anglais professionnel =====
    story.append(Paragraph("Anglais Professionnel Sectoriel", styles["SubHeading"]))
    story.append(Paragraph(
        "Des modules ciblés pour les professionnels qui doivent communiquer en anglais dans leur secteur :",
        styles["BodyTextCustom"]
    ))

    pro_modules = [
        ["Module", "Contenu principal"],
        ["Administration & Secrétariat", "Emails et courriers pro, vocabulaire administratif, comptes-rendus de réunion"],
        ["Finance & Banque", "Terminologie financière, rapports annuels, négociations bancaires"],
        ["Commerce International", "Incoterms, contrats, négociation fournisseurs, prospection internationale"],
        ["ONG & Développement", "Vocabulaire du développement, rapports bailleurs, logframe, présentations de projets"],
    ]
    t2 = Table(pro_modules, colWidths=[5*cm, 11*cm])
    t2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), ORANGE),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),
        ("BACKGROUND", (0, 1), (-1, -1), white),
        ("TEXTCOLOR", (0, 1), (-1, -1), NAVY_SOFT),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#E5DDD0")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, CREAM_WARM]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(t2)
    story.append(PageBreak())

    # ===== Page 3 : Certifications + Formats + Tarifs =====
    story.append(Paragraph("Préparation aux Certifications", styles["SectionHeading"]))

    cert_data = [
        ["Certification", "Durée", "Objectif"],
        ["TOEIC", "2-3 mois", "Score reconnu par les entreprises internationales (750+ points)"],
        ["TOEFL", "3-4 mois", "Accès aux universités anglophones (90+ points)"],
        ["IELTS", "3-4 mois", "Immigration et universités (6.5+ bandes)"],
    ]
    t3 = Table(cert_data, colWidths=[4*cm, 3*cm, 9*cm])
    t3.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), EMERALD),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),
        ("BACKGROUND", (0, 1), (-1, -1), white),
        ("TEXTCOLOR", (0, 1), (-1, -1), NAVY_SOFT),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#E5DDD0")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, CREAM_WARM]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(t3)
    story.append(Spacer(1, 0.5*cm))

    story.append(Paragraph("Formats disponibles", styles["SubHeading"]))
    formats_data = [
        ["Format", "Description", "Tarif indicatif"],
        ["Cours en groupe", "Petits groupes de 8 à 12 apprenants", "À partir de 75 000 FCFA / module"],
        ["Cours particuliers", "Suivi individualisé, horaires flexibles", "À partir de 15 000 FCFA / heure"],
        ["Formation en entreprise", "Dans vos locaux, adaptée à votre secteur", "Sur devis personnalisé"],
        ["Formation en ligne", "À distance via Zoom/Teams", "À partir de 60 000 FCFA / module"],
    ]
    t4 = Table(formats_data, colWidths=[4*cm, 7*cm, 5*cm])
    t4.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),
        ("BACKGROUND", (0, 1), (-1, -1), white),
        ("TEXTCOLOR", (0, 1), (-1, -1), NAVY_SOFT),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#E5DDD0")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, CREAM_WARM]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(t4)
    story.append(Spacer(1, 0.8*cm))

    # CTA final
    cta_data = [[Paragraph(
        "<b>Pour vous inscrire :</b><br/>"
        "Téléphone : +226 70 46 26 70<br/>"
        "Email : contact@vision2000elc.com<br/>"
        "WhatsApp : wa.me/22670462670<br/>"
        "Adresse : Koulouba, Ouagadougou, Burkina Faso",
        styles["BodyTextCustom"]
    )]]
    t5 = Table(cta_data, colWidths=[16*cm])
    t5.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#FEF3E2")),
        ("BOX", (0, 0), (-1, -1), 1, ORANGE),
        ("LEFTPADDING", (0, 0), (-1, -1), 15),
        ("RIGHTPADDING", (0, 0), (-1, -1), 15),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    story.append(t5)

    # Build avec pages différentes
    def first_page(canvas_obj, doc):
        cover_page(canvas_obj, doc, "Formations 2026", "Catalogue complet des programmes")
    def later_pages(canvas_obj, doc):
        content_page(canvas_obj, doc)

    doc.build(story, onFirstPage=first_page, onLaterPages=later_pages)
    print("✓ brochure-formations.pdf généré")

# ============================================================
# Brochure 2 : Traduction
# ============================================================
def brochure_traduction():
    doc = SimpleDocTemplate(
        f"{OUTPUT_DIR}/brochure-traduction.pdf",
        pagesize=A4,
        topMargin=2*cm,
        bottomMargin=2*cm,
        leftMargin=2*cm,
        rightMargin=2*cm,
    )
    styles = get_styles()
    story = []

    # Page 1 couverture
    story.append(Spacer(1, 12*cm))
    story.append(PageBreak())

    # Page 2 : Services + tarifs
    story.append(Paragraph("Service de Traduction Professionnelle", styles["SectionHeading"]))
    story.append(Paragraph(
        "VISION 2000 ELC vous propose un service de traduction 100% en ligne, rapide, sécurisé et confidentiel. "
        "Nos linguistes professionnels traduisent vos documents administratifs, juridiques, techniques, financiers "
        "et bien plus, du français vers l'anglais et inversement.",
        styles["BodyTextCustom"]
    ))

    story.append(Paragraph("Nos domaines de spécialisation", styles["SubHeading"]))
    domains = [
        "Documents administratifs (CV, lettres, certificats, dossiers)",
        "Documents juridiques (contrats, statuts, actes notariés)",
        "Documents techniques (manuels, spécifications, rapports)",
        "Documents financiers (rapports annuels, bilans, budgets)",
        "Rapports de projets (ONG, bailleurs, partenaires)",
        "Sites web et contenu marketing (brochures, présentations)",
    ]
    for d in domains:
        story.append(Paragraph(f"✓ {d}", styles["BulletItem"]))

    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph("Grille tarifaire indicative (FCFA / mot)", styles["SubHeading"]))

    tarifs_data = [
        ["Type de document", "Tarif normal", "Express 48h", "Express 24h"],
        ["Document général", "80 FCFA/mot", "100 FCFA/mot", "120 FCFA/mot"],
        ["Document administratif", "88 FCFA/mot", "110 FCFA/mot", "132 FCFA/mot"],
        ["Document technique", "92 FCFA/mot", "115 FCFA/mot", "138 FCFA/mot"],
        ["Document juridique", "96 FCFA/mot", "120 FCFA/mot", "144 FCFA/mot"],
        ["Document financier", "88 FCFA/mot", "110 FCFA/mot", "132 FCFA/mot"],
        ["Site web / marketing", "84 FCFA/mot", "105 FCFA/mot", "126 FCFA/mot"],
    ]
    t = Table(tarifs_data, colWidths=[5*cm, 3.5*cm, 3.5*cm, 3.5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("BACKGROUND", (0, 1), (-1, -1), white),
        ("TEXTCOLOR", (0, 1), (-1, -1), NAVY_SOFT),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("ALIGN", (1, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#E5DDD0")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, CREAM_WARM]),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph(
        "<i>Les tarifs sont indicatifs et peuvent varier selon la complexité, le volume et le délai. "
        "Un devis personnalisé vous est envoyé sous 2h ouvrées.</i>",
        styles["FooterStyle"]
    ))
    story.append(PageBreak())

    # Page 3 : Process + Garanties + CTA
    story.append(Paragraph("Comment ça fonctionne ?", styles["SectionHeading"]))

    process_data = [
        ["Étape", "Action", "Délai"],
        ["1", "Téléchargement de vos documents via le formulaire en ligne", "Immédiat"],
        ["2", "Analyse et envoi du devis gratuit détaillé", "Sous 2h ouvrées"],
        ["3", "Validation et paiement (Orange Money, Moov, Visa, PayPal)", "Immédiat"],
        ["4", "Traduction par un linguiste professionnel", "Selon volume"],
        ["5", "Révision par un second linguiste", "Incluse"],
        ["6", "Livraison du document traduit + certificat", "Selon délai choisi"],
    ]
    t2 = Table(process_data, colWidths=[1.5*cm, 10*cm, 4.5*cm])
    t2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), ORANGE),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),
        ("BACKGROUND", (0, 1), (-1, -1), white),
        ("TEXTCOLOR", (0, 1), (-1, -1), NAVY_SOFT),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("ALIGN", (0, 0), (0, -1), "CENTER"),
        ("ALIGN", (2, 0), (2, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#E5DDD0")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, CREAM_WARM]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(t2)
    story.append(Spacer(1, 0.5*cm))

    story.append(Paragraph("Nos garanties", styles["SubHeading"]))
    garanties = [
        "Confidentialité absolue (NDA disponible sur demande)",
        "Traduction certifiée (valable auprès des administrations et ambassades)",
        "Révision incluse par un second linguiste professionnel",
        "Respect strict des délais (98% de livraisons à l'heure)",
        "Service Express disponible en 24-48h pour vos urgences",
        "Livraison partout dans le monde (format numérique)",
    ]
    for g in garanties:
        story.append(Paragraph(f"✓ {g}", styles["BulletItem"]))

    story.append(Spacer(1, 0.5*cm))
    cta_data = [[Paragraph(
        "<b>Demandez votre devis gratuit maintenant :</b><br/><br/>"
        "🌐 Site web : vision2000elc.com/traduction<br/>"
        "📞 Téléphone : +226 70 46 26 70<br/>"
        "📧 Email : contact@vision2000elc.com<br/>"
        "💬 WhatsApp : wa.me/22670462670<br/>"
        "📍 Adresse : Koulouba, Ouagadougou, Burkina Faso",
        styles["BodyTextCustom"]
    )]]
    t3 = Table(cta_data, colWidths=[16*cm])
    t3.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#FEF3E2")),
        ("BOX", (0, 0), (-1, -1), 1, ORANGE),
        ("LEFTPADDING", (0, 0), (-1, -1), 15),
        ("RIGHTPADDING", (0, 0), (-1, -1), 15),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    story.append(t3)

    def first_page(canvas_obj, doc):
        cover_page(canvas_obj, doc, "Traduction Pro", "Services & tarifs 2026")
    def later_pages(canvas_obj, doc):
        content_page(canvas_obj, doc)

    doc.build(story, onFirstPage=first_page, onLaterPages=later_pages)
    print("✓ brochure-traduction.pdf généré")

# ============================================================
# Brochure 3 : Interprétation
# ============================================================
def brochure_interpretation():
    doc = SimpleDocTemplate(
        f"{OUTPUT_DIR}/brochure-interpretation.pdf",
        pagesize=A4,
        topMargin=2*cm,
        bottomMargin=2*cm,
        leftMargin=2*cm,
        rightMargin=2*cm,
    )
    styles = get_styles()
    story = []

    story.append(Spacer(1, 12*cm))
    story.append(PageBreak())

    story.append(Paragraph("Services d'Interprétation", styles["SectionHeading"]))
    story.append(Paragraph(
        "L'interprétation de conférence est un art qui exige des professionnels certifiés, une concentration "
        "extrême et une maîtrise parfaite des deux langues. Nos interprètes ont accompagné des sommets "
        "ministériels, des conférences internationales et des missions diplomatiques au Burkina Faso et "
        "dans la sous-région ouest-africaine.",
        styles["BodyTextCustom"]
    ))

    story.append(Paragraph("Nos deux modes d'interprétation", styles["SubHeading"]))

    modes_data = [
        ["Mode", "Description", "Idéal pour"],
        ["Interprétation simultanée",
         "Traduction en temps réel via cabine insonorisée et équipement audio. Le débit n'est pas ralenti.",
         "Conférences plénières, sommets, grands événements"],
        ["Interprétation consécutive",
         "L'orateur parle, puis s'interrompt pour que l'interprète traduise par segments.",
         "Réunions restreintes, entretiens, négociations, discours"],
    ]
    t = Table(modes_data, colWidths=[4*cm, 7*cm, 5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),
        ("BACKGROUND", (0, 1), (-1, -1), white),
        ("TEXTCOLOR", (0, 1), (-1, -1), NAVY_SOFT),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#E5DDD0")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, CREAM_WARM]),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.5*cm))

    story.append(Paragraph("Nos domaines d'intervention", styles["SubHeading"]))
    domains = [
        "Conférences internationales et congrès",
        "Réunions ministérielles et délégations officielles",
        "Ateliers de formation et workshops",
        "Forums économiques et sommets régionaux",
        "Missions diplomatiques et bilatérales",
        "Événements d'entreprise (lancements, conventions, assemblées)",
        "Missions de terrain (ONG, bailleurs, experts)",
    ]
    for d in domains:
        story.append(Paragraph(f"✓ {d}", styles["BulletItem"]))

    story.append(PageBreak())

    story.append(Paragraph("Ce qui est inclus dans notre prestation", styles["SectionHeading"]))
    inclus = [
        "Interprètes certifiés expérimentés (français ↔ anglais)",
        "Matériel technique complet : cabines insonorisées, casques, micros",
        "Coordination logistique complète avant et pendant l'événement",
        "Briefing pré-événement avec vos intervenants",
        "Documentation technique préparée par nos soins",
        "Équipe de remplacement disponible en cas de besoin",
    ]
    for i in inclus:
        story.append(Paragraph(f"✓ {i}", styles["BulletItem"]))

    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("Bon à savoir", styles["SubHeading"]))
    story.append(Paragraph(
        "Pour les événements de plus d'1h30, deux interprètes par cabine sont nécessaires (rotation "
        "toutes les 30 minutes pour maintenir la qualité). Nous vous conseillons de nous contacter au "
        "moins 2 semaines avant l'événement pour garantir la disponibilité.",
        styles["BodyTextCustom"]
    ))

    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("Langues couvertes", styles["SubHeading"]))
    story.append(Paragraph(
        "<b>Français ↔ Anglais</b> (bidirectionnel)<br/>"
        "Autres combinaisons linguistiques sur demande (Mooré, Dioula, etc.)",
        styles["BodyTextCustom"]
    ))

    story.append(Spacer(1, 0.8*cm))
    cta_data = [[Paragraph(
        "<b>Réservez vos interprètes dès maintenant :</b><br/><br/>"
        "🌐 Site web : vision2000elc.com/interpretation<br/>"
        "📞 Téléphone : +226 70 46 26 70<br/>"
        "📧 Email : contact@vision2000elc.com<br/>"
        "💬 WhatsApp : wa.me/22670462670<br/>"
        "📍 Adresse : Koulouba, Ouagadougou, Burkina Faso",
        styles["BodyTextCustom"]
    )]]
    t2 = Table(cta_data, colWidths=[16*cm])
    t2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#FEF3E2")),
        ("BOX", (0, 0), (-1, -1), 1, ORANGE),
        ("LEFTPADDING", (0, 0), (-1, -1), 15),
        ("RIGHTPADDING", (0, 0), (-1, -1), 15),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    story.append(t2)

    def first_page(canvas_obj, doc):
        cover_page(canvas_obj, doc, "Interprétation", "Conférences & événements")
    def later_pages(canvas_obj, doc):
        content_page(canvas_obj, doc)

    doc.build(story, onFirstPage=first_page, onLaterPages=later_pages)
    print("✓ brochure-interpretation.pdf généré")

# ============================================================
# Génération
# ============================================================
if __name__ == "__main__":
    print("📄 Génération des brochures PDF VISION 2000 ELC...\n")
    brochure_formations()
    brochure_traduction()
    brochure_interpretation()
    print("\n✅ Toutes les brochures générées !")
    # Vérification
    for f in ["brochure-formations.pdf", "brochure-traduction.pdf", "brochure-interpretation.pdf"]:
        path = f"{OUTPUT_DIR}/{f}"
        size = os.path.getsize(path) / 1024
        print(f"  - {f} : {size:.1f} KB")
