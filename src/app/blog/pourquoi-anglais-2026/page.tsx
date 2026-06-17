import { SiteHeader } from "@/components/site/header"
import { ArticlePage } from "@/components/site/article-page"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

export const metadata = {
  title: "Pourquoi apprendre l'anglais en 2026 ?",
  description: "L'anglais n'est plus une option mais une compétence stratégique. Découvrez les opportunités professionnelles qu'il débloque au Burkina Faso et en Afrique de l'Ouest en 2026.",
}

const article = {
  category: "Carrière",
  title: "Pourquoi apprendre l'anglais en 2026 ?",
  excerpt: "L'anglais n'est plus une option mais une compétence stratégique. Tour d'horizon des opportunités professionnelles qu'il débloque au Burkina Faso et en Afrique de l'Ouest.",
  date: "12 juin 2026",
  readTime: "5 min",
  color: "orange",
  image: "/blog-1.jpg",
  content: [
    { type: "p", text: "En 2026, l'anglais n'est plus simplement une langue étrangère que l'on apprend à l'école : c'est devenu une compétence stratégique qui ouvre ou ferme des portes professionnelles. Au Burkina Faso et plus largement en Afrique de l'Ouest, la maîtrise de l'anglais est désormais un facteur clé de différenciation sur le marché du travail, d'accès à des opportunités internationales et de mobilité professionnelle." },
    { type: "p", text: "Que vous soyez étudiant, jeune diplômé, cadre en activité ou entrepreneur, comprendre pourquoi et comment apprendre l'anglais cette année peut transformer votre trajectoire. Voici les raisons concrètes pour lesquelles 2026 est l'année idéale pour investir dans votre niveau d'anglais." },
    { type: "h2", text: "1. L'Afrique de l'Ouest devient bilingue" },
    { type: "p", text: "Notre région est entourée de pays anglophones : le Ghana, le Nigeria, le Liberia, la Sierra Leone, la Gambie. Les échanges commerciaux, les partenariats économiques et les projets transfrontaliers se multiplient dans le cadre de la CEDEAO. Pour un cadre burkinabè, savoir communiquer en anglais avec un partenaire nigérian ou ghanéen n'est plus un luxe, c'est une nécessité opérationnelle." },
    { type: "p", text: "Les entreprises qui recrutent aujourd'hui à Ouagadougou (banques, ONG, télécommunications, mines) précisent de plus en plus « bilingue français-anglais obligatoire » dans leurs annonces. Un candidat qui ne parle pas anglais se prive automatiquement d'une part importante du marché de l'emploi qualifié." },
    { type: "h2", text: "2. L'anglais, langue des bailleurs et des ONG" },
    { type: "p", text: "Le Burkina Faso accueille de nombreuses organisations internationales : PNUD, Banque Mondiale, USAID, Union Européenne, UNICEF, et des dizaines d'ONG. Ces organisations travaillent en anglais pour leurs rapports, leurs réunions de coordination régionale et leurs communications avec leurs sièges. Un professionnel qui maîtrise l'anglais peut prétendre à des postes mieux rémunérés et à des carrières internationales." },
    { type: "quote", text: "Dans le secteur du développement, l'anglais n'est plus un plus : c'est la condition sine qua non pour accéder aux postes de coordination régionale." },
    { type: "h2", text: "3. Le digital et l'accès au savoir" },
    { type: "p", text: "Plus de 60% du contenu Internet est en anglais. Les formations en ligne (Coursera, edX, Udemy), les documentations techniques, les tutoriels, les recherches académiques : tout est en anglais. Sans cette langue, vous êtes coupé de la majorité des ressources mondiales de formation continue." },
    { type: "p", text: "Pour un développeur, un ingénieur, un marketeur ou un entrepreneur, l'anglais donne accès à une veille technologique indispensable. Les innovations arrivent d'abord en anglais avant d'être traduites — parfois avec des années de retard." },
    { type: "h2", text: "4. La mobilité internationale" },
    { type: "p", text: "Études à l'étranger, bourses, programmes d'échange, immigration professionnelle : l'anglais est exigé partout. Le TOEFL et l'IELTS sont des prérequis pour les universités anglophones. Le TOEIC est demandé par de nombreuses entreprises multinationales. Sans certification, vos dossiers sont rejetés dès la première sélection." },
    { type: "ul", items: [
      "Bourses Chevening (Royaume-Uni) : IELTS obligatoire",
      "Fulbright (États-Unis) : TOEFL obligatoire",
      "Programmes Erasmus+ : niveau B2 minimum exigé",
      "Visas Canada/Australie : preuve de compétence linguistique",
    ]},
    { type: "h2", text: "5. Le salaire : l'anglais paie" },
    { type: "p", text: "Les études sont unanimes : un professionnel bilinghe gagne en moyenne 20 à 35% de plus qu'un professionnel unilingue, à poste équivalent. À Ouagadougou, un cadre bilingue peut prétendre à des salaires de 500 000 à 1 500 000 FCFA par mois dans les organisations internationales, contre 300 000 à 600 000 FCFA pour un poste équivalent unilingue." },
    { type: "p", text: "L'investissement dans une formation anglaise (75 000 à 200 000 FCFA pour un module complet) est rentabilisé en quelques mois grâce à l'augmentation salariale qu'il permet." },
    { type: "h2", text: "Comment commencer en 2026 ?" },
    { type: "p", text: "La bonne nouvelle : il n'est jamais trop tard pour apprendre. Que vous partiez de zéro ou que vous cherchiez à perfectionner votre anglais professionnel, un programme structuré adapté à vos objectifs peut vous faire progresser significativement en 3 à 6 mois." },
    { type: "ul", items: [
      "Évaluez votre niveau actuel (test gratuit en ligne ou en centre)",
      "Définissez un objectif concret (certification, mobilité, carrière)",
      "Choisissez un format adapté (groupe, particulier, en ligne)",
      "Engagez-vous sur une durée réaliste (minimum 3 mois)",
      "Pratiquez régulièrement : 30 minutes par jour valent mieux que 3 heures le week-end",
    ]},
    { type: "cta", text: "Prêt à transformer votre carrière grâce à l'anglais ?" },
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
