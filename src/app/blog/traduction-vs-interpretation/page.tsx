import { SiteHeader } from "@/components/site/header"
import { ArticlePage } from "@/components/site/article-page"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

export const metadata = {
  title: "Traduction ou interprétation : quelle différence ?",
  description: "Ces deux métiers voisins ne s'appliquent pas aux mêmes situations. Guide pratique pour choisir la prestation adaptée à votre besoin de communication internationale.",
}

const article = {
  category: "Conseils",
  title: "Traduction ou interprétation : quelle différence ?",
  excerpt: "Ces deux métiers voisins ne s'appliquent pas aux mêmes situations. Guide pratique pour choisir la prestation adaptée à votre besoin de communication internationale.",
  date: "28 mai 2026",
  readTime: "4 min",
  color: "navy",
  image: "/blog-3.jpg",
  content: [
    { type: "p", text: "Traducteur et interprète : beaucoup de gens confondent ces deux métiers, voire pensent qu'il s'agit de la même profession. Pourtant, ce sont deux activités bien distinctes, qui exigent des compétences différentes et interviennent à des moments différents de votre communication internationale." },
    { type: "p", text: "Comprendre la différence est essentiel pour choisir la bonne prestation et éviter les malentendus coûteux. Voici un guide clair pour vous aider à y voir juste." },
    { type: "h2", text: "La traduction : l'écrit" },
    { type: "p", text: "Le traducteur travaille sur des documents écrits : contrats, rapports, sites web, brochures, articles, dossiers administratifs, livres. Il dispose de temps pour réfléchir, vérifier la terminologie, consulter des dictionnaires spécialisés, faire des recherches. La traduction est un travail de précision où chaque mot compte." },
    { type: "p", text: "Un bon traducteur possède une excellente maîtrise de la langue cible (sa langue maternelle en général), une connaissance pointue du domaine traité (juridique, technique, médical, financier), et une rigueur méthodologique. Il peut traiter entre 1500 et 2500 mots par jour selon la complexité du texte." },
    { type: "h3", text: "Quand faire appel à un traducteur ?" },
    { type: "ul", items: [
      "Vous avez un document écrit à faire traduire (contrat, rapport, site web)",
      "Le document sera lu, relu, archivé — la précision est cruciale",
      "Vous souhaitez une traduction certifiée (valeur juridique)",
      "Le délai permet une traduction soignée (24h à plusieurs jours)",
      "Le document contient des termes techniques ou juridiques spécifiques",
    ]},
    { type: "h2", text: "L'interprétation : l'oral" },
    { type: "p", text: "L'interprète travaille en direct, à l'oral. Il traduit en temps réel les propos d'un orateur, soit en simultané (cabine insonorisée, casque, micro), soit en consécutif (l'orateur parle puis s'interrompt pour permettre la traduction). L'interprète n'a pas le temps de réfléchir longuement : il doit comprendre, mémoriser et restituer instantanément." },
    { type: "p", text: "Cette discipline exige une concentration extrême, une excellente mémoire, une voix posée et une résistance au stress. C'est pourquoi les interprètes travaillent généralement en binôme et se relayent toutes les 30 minutes pour maintenir la qualité. Le métier est physiquement et mentalement exigeant." },
    { type: "h3", text: "Quand faire appel à un interprète ?" },
    { type: "ul", items: [
      "Vous organisez un événement avec participants multilingues (conférence, séminaire)",
      "Une réunion implique des intervenants qui ne parlent pas la même langue",
      "Vous accueillez une délégation étrangère (mission diplomatique, partenariat)",
      "Un atelier de formation réunit des apprenants francophones et anglophones",
      "Vous participez à une négociation commerciale internationale",
    ]},
    { type: "h2", text: "Tableau comparatif" },
    { type: "p", text: "Voici un récapitulatif simple pour vous aider à identifier la prestation dont vous avez besoin :" },
    { type: "ul", items: [
      "Support : écrit pour la traduction, oral pour l'interprétation",
      "Temps : différée pour la traduction, en temps réel pour l'interprétation",
      "Compétences : précision et recherche pour le traducteur, réactivité et mémoire pour l'interprète",
      "Lieu : le traducteur travaille à son bureau, l'interprète se déplace sur place",
      "Délai : jours ou semaines pour traduire, immédiat pour interpréter",
      "Tarification : au mot pour la traduction, à la journée (ou demi-journée) pour l'interprétation",
    ]},
    { type: "h2", text: "Peut-on être les deux à la fois ?" },
    { type: "p", text: "Oui, certains professionnels exercent les deux métiers, mais c'est rare. Les compétences sont suffisamment différentes pour que la plupart des linguistes se spécialisent. Chez VISION 2000 ELC, nous travaillons avec des traducteurs spécialisés par domaine et des interprètes certifiés pour la conférence, ce qui garantit la meilleure qualité dans chaque discipline." },
    { type: "quote", text: "Demander un traducteur pour une conférence ou un interprète pour traduire un contrat : voilà le genre de confusion qui peut coûter cher. Le bon professionnel pour le bon besoin." },
    { type: "h2", text: "Comment choisir : 3 questions à se poser" },
    { type: "ul", items: [
      "Mon besoin est-il écrit ou oral ? (écrit = traduction, oral = interprétation)",
      "Le résultat doit-il être conservé (document) ou éphémère (événement) ?",
      "Quel est mon délai ? (court = interprète disponible, long = traducteur peut travailler)",
    ]},
    { type: "p", text: "Si vous hésitez encore, n'hésitez pas à nous contacter. Nous analysons gratuitement votre besoin et vous orientons vers la prestation la plus adaptée." },
    { type: "cta", text: "Besoin d'une traduction ou d'un interprète ? Parlons-en." },
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
