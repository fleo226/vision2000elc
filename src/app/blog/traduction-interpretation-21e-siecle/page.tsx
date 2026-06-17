import { SiteHeader } from "@/components/site/header"
import { ArticlePage } from "@/components/site/article-page"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

export const metadata = {
  title: "Traduction & interprétation au XXIe siècle",
  description: "Comment la profession évolue à l'ère de l'IA, et pourquoi l'expertise humaine reste irremplaçable pour les missions critiques. Le métier de linguiste de demain.",
}

const article = {
  category: "Métiers",
  title: "Traduction & interprétation au XXIe siècle",
  excerpt: "Comment la profession évolue à l'ère de l'IA, et pourquoi l'expertise humaine reste irremplaçable pour les missions critiques. Le métier de linguiste de demain.",
  date: "10 mai 2026",
  readTime: "6 min",
  color: "gold",
  image: "/blog-5.jpg",
  content: [
    { type: "p", text: "L'avènement de l'intelligence artificielle (Google Translate, DeepL, ChatGPT, Gemini) a bouleversé le monde de la traduction. Certains annoncent la fin du métier de traducteur. D'autres, au contraire, y voient une opportunité. Quelle est la réalité ? Comment la profession évolue-t-elle réellement ? Et pourquoi l'expertise humaine reste-t-elle irremplaçable pour les missions critiques ?" },
    { type: "p", text: "En tant que centre de traduction et d'interprétation avec plus de 20 ans d'expérience au Burkina Faso, nous observons ces évolutions de l'intérieur. Voici notre analyse lucide de la situation." },
    { type: "h2", text: "Ce que l'IA fait bien" },
    { type: "p", text: "Reconnaissons d'abord les forces des outils d'IA. Ils excellent dans plusieurs domaines où les traducteurs humains étaient auparavant indispensables :" },
    { type: "ul", items: [
      "Vitesse : Google Translate traduit un document de 1000 mots en 2 secondes",
      "Coût : la traduction IA est quasi gratuite",
      "Volume : aucune limite de taille de document",
      "Langues rares : l'IA couvre plus de 100 langues",
      "Brouillons rapides : utile pour comprendre le gist d'un texte",
    ]},
    { type: "p", text: "Pour un utilisateur qui veut comprendre rapidement un email, lire un article étranger ou produire un brouillon non critique, l'IA est un outil formidable. Nous le recommandons sans hésiter pour ces usages." },
    { type: "h2", text: "Ce que l'IA ne sait pas faire" },
    { type: "p", text: "Cependant, dès qu'on entre dans le domaine du professionnel, du critique, du juridique ou du stratégique, les limites de l'IA deviennent criantes :" },
    { type: "h3", text: "1. Confidentialité" },
    { type: "p", text: "Quand vous utilisez Google Translate ou ChatGPT, vos documents sont envoyés sur leurs serveurs et peuvent être utilisés pour entraîner leurs modèles. Pour un contrat confidentiel, un dossier médical, une stratégie commerciale, c'est rédhibitoire. Les entreprises sérieuses ne peuvent pas se permettre cette fuite." },
    { type: "h3", text: "2. Valeur juridique" },
    { type: "p", text: "Une traduction IA n'a aucune valeur juridique. Les administrations, ambassades, tribunaux et institutions internationales exigent des traductions certifiées par un professionnel. Une erreur de l'IA dans un contrat peut entraîner des poursuites. Une traduction humaine engage la responsabilité du traducteur." },
    { type: "h3", text: "3. Contexte culturel" },
    { type: "p", text: "L'IA traduit littéralement, sans comprendre le contexte. Un même mot peut avoir des sens très différents selon le pays, le secteur, le registre. « Meeting » peut être une réunion formelle ou un entretien ; « implement » peut être un outil ou une politique. Seul un humain avec une expertise locale et sectorielle peut faire le bon choix." },
    { type: "h3", text: "4. Créativité et style" },
    { type: "p", text: "Pour un slogan marketing, un discours, une présentation, le ton et le style comptent autant que le sens. L'IA produit des traductions plates, sans relief. Un bon traducteur est aussi un rédacteur qui adapte le message à la culture cible." },
    { type: "quote", text: "L'IA traduit les mots. Le traducteur humain traduit le sens, l'intention et le contexte. La différence est invisible jusqu'au jour où elle devient critique." },
    { type: "h2", text: "Le nouveau rôle du traducteur" },
    { type: "p", text: "Plutôt que de remplacer le traducteur, l'IA transforme son métier. Le traducteur moderne devient un « post-éditeur » : il révise, corrige et améliore les traductions IA pour atteindre la qualité professionnelle. Cette approche hybride permet de traiter de gros volumes plus rapidement, tout en garantissant la qualité finale." },
    { type: "p", text: "Le traducteur expert se positionne sur les segments où l'IA ne peut pas intervenir : documents confidentiels, traductions certifiées, contenus créatifs, interprétation de conférence, conseil linguistique. C'est sur ces segments à forte valeur ajoutée que VISION 2000 ELC se positionne depuis 20 ans." },
    { type: "h2", text: "L'interprétation : un domaine protégé" },
    { type: "p", text: "L'interprétation simultanée est encore plus protégée que la traduction. Si l'IA peut maintenant traduire en direct une conversation simple (Google Translate conversation mode), elle est incapable de :" },
    { type: "ul", items: [
      "Suivre le rythme d'un orateur rapide dans un environnement bruyant",
      "Gérer les accents, les hésitations, les corrections en direct",
      "Comprendre l'ironie, l'humour, les sous-entendus",
      "Adapter le registre selon le public",
      "Intervenir dans une conférence avec terminologie technique spécialisée",
    ]},
    { type: "p", text: "Pour les sommets ministériels, les conférences internationales et les négociations diplomatiques, l'interprète humain reste indispensable. Et ce pour longtemps encore." },
    { type: "h2", text: "Comment se positionner en 2026" },
    { type: "p", text: "Si vous êtes professionnel de la langue ou si vous envisagez cette carrière, voici les compétences à développer :" },
    { type: "ul", items: [
      "Expertise sectorielle : devenir spécialiste d'un domaine (droit, médecine, finance, technologie)",
      "Post-édition : maîtriser les outils d'IA pour les intégrer dans votre workflow",
      "Certifications : obtenir des agréments (traducteur assermenté, interprète de conférence)",
      "Conseil : devenir partenaire linguistique de vos clients, pas seulement prestataire",
      "Localisation : maîtriser les nuances culturelles de votre marché (Afrique de l'Ouest)",
    ]},
    { type: "h2", text: "Pour les clients : comment choisir" },
    { type: "p", text: "Face à la multiplication des outils, comment choisir entre IA gratuite et traducteur professionnel ? Posez-vous ces questions :" },
    { type: "ul", items: [
      "Ce document est-il confidentiel ? (Oui = humain obligatoire)",
      "Une erreur peut-elle avoir des conséquences juridiques ou financières ? (Oui = humain)",
      "Le document sera-t-il publié ou diffusé publiquement ? (Oui = humain pour la qualité)",
      "Le texte contient-il des nuances culturelles, de l'humour, du style ? (Oui = humain)",
      "Le délai est-il critique (< 24h) ? (Considérez l'IA + post-édition humaine)",
    ]},
    { type: "p", text: "Dans 80% des cas professionnels, la réponse est : faites appel à un traducteur humain. Le surcoût est largement compensé par la qualité, la sécurité et la valeur juridique obtenues." },
    { type: "cta", text: "Pour une traduction professionnelle, confidentielle et certifiée, contactez VISION 2000 ELC." },
  ],
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <ArticlePage article={article} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
