import { SiteHeader } from "@/components/site/header"
import { ArticlePage } from "@/components/site/article-page"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

export const metadata = {
  title: "Réussir une présentation professionnelle en anglais",
  description: "Structure, vocabulaire, gestion du stress, supports visuels : la méthode complète pour livrer un pitch impactant devant un public anglophone.",
}

const article = {
  category: "Professionnel",
  title: "Réussir une présentation professionnelle en anglais",
  excerpt: "Structure, vocabulaire, gestion du stress, supports visuels : la méthode complète pour livrer un pitch impactant devant un public anglophone.",
  date: "20 mai 2026",
  readTime: "8 min",
  color: "crimson",
  image: "/blog-4.jpg",
  content: [
    { type: "p", text: "Présenter en anglais devant un public professionnel est l'un des exercices les plus redoutés, même pour ceux qui ont un bon niveau général. La combinaison du stress de la prise de parole, de la nécessité de faire passer un message clair et de la barrière linguistique peut paralyser. Pourtant, avec une méthode adaptée, c'est une compétence qui s'apprend et se perfectionne." },
    { type: "p", text: "Que vous deviez présenter un projet à des bailleurs, pitcher une offre à des clients internationaux, ou animer une réunion d'équipe multilingue, ce guide vous donne les clés pour livrer une présentation impactante et mémorable." },
    { type: "h2", text: "1. La structure : la règle des 3" },
    { type: "p", text: "Une bonne présentation suit une structure simple et universelle. Dites-leur ce que vous allez dire (introduction), dites-le (développement), puis dites-leur ce que vous avez dit (conclusion). Cette règle traditionnelle fonctionne particulièrement bien en anglais, langue qui valorise la clarté et la concision." },
    { type: "h3", text: "Introduction (10-15% du temps)" },
    { type: "ul", items: [
      "Hook : une question, une statistique choc, une anecdote pour capter l'attention",
      "Contexte : pourquoi ce sujet, pourquoi maintenant",
      "Annonce du plan : « Today I will cover three main points... »",
      "Bénéfice : ce que l'auditoire va gagner en écoutant",
    ]},
    { type: "h3", text: "Développement (70-75% du temps)" },
    { type: "p", text: "Trois points maximum. Au-delà, votre auditoire perd le fil. Chaque point suit la structure PREP : Point, Raison, Exemple, Point (reformulé). Cette méthode facilite la mémorisation et rend votre propos percutant." },
    { type: "h3", text: "Conclusion (10-15% du temps)" },
    { type: "ul", items: [
      "Récapitulatif des 3 points clés",
      "Call to action : que doivent faire vos auditeurs maintenant ?",
      "Remerciement et ouverture aux questions",
    ]},
    { type: "h2", text: "2. Le vocabulaire professionnel essentiel" },
    { type: "p", text: "Quelques structures et expressions à maîtriser pour sonner professionnel :" },
    { type: "ul", items: [
      "Ouverture : « Good morning everyone, thank you for being here today. »",
      "Transition : « Moving on to my next point... » / « This brings me to... »",
      "Illustration : « Let me give you an example... » / « To illustrate this point... »",
      "Mise en relief : « The key takeaway here is... » / « What I want you to remember is... »",
      "Conclusion : « To sum up... » / « In conclusion... » / « Let me wrap up by saying... »",
      "Questions : « I'd be happy to take any questions you may have. »",
    ]},
    { type: "p", text: "Évitez les remplisseurs (um, uh, you know) qui décrédibilisent. Pratiquez avec des silences : une pause de 2 secondes avant un point important est plus impactante que n'importe quel mot de liaison." },
    { type: "h2", text: "3. Les supports visuels" },
    { type: "p", text: "Vos slides ne sont pas votre présentation : elles l'illustrent. Voici les règles d'or à respecter :" },
    { type: "ul", items: [
      "Une idée par slide maximum",
      "Maximum 6 lignes de texte par slide, 6 mots par ligne (règle des 6×6)",
      "Privilégiez les visuels : graphiques, photos, icônes plutôt que du texte",
      "Police minimum 24 points pour la lisibilité",
      "Contraste élevé : fond sombre + texte clair ou inversement",
      "Testez vos slides sur un vidéoprojecteur avant le jour J",
    ]},
    { type: "p", text: "En anglais, gardez vos slides en anglais même si votre présentation est bilingue. Mélanger les langues sur les supports crée une confusion visuelle." },
    { type: "h2", text: "4. La gestion du stress" },
    { type: "p", text: "Le stress est normal, même chez les professionnels. La clé est de le canaliser. Voici les techniques qui fonctionnent :" },
    { type: "ul", items: [
      "Respiration : inspirez 4 secondes, bloquez 4 secondes, expirez 4 secondes (technique 4-4-4)",
      "Préparation : répétez votre présentation 7 à 10 fois à voix haute avant le jour J",
      "Ancrage : tenez-vous droit, pieds bien posés, épaules relâchées",
      "Contact visuel : regardez une personne différente toutes les 3-4 secondes",
      "Ralentissez : en anglais, votre débit naturel est probablement trop rapide pour un public international",
    ]},
    { type: "quote", text: "Mieux vaut faire une présentation courte et impactante que longue et confuse. Vingt minutes bien préparées valent mieux qu'une heure improvisée." },
    { type: "h2", text: "5. Les erreurs à éviter absolument" },
    { type: "ul", items: [
      "Lire vos slides : c'est la mort de l'attention",
      "Tourner le dos à votre auditoire pour regarder l'écran",
      "Utiliser du jargon technique sans l'expliquer",
      "Finir sans appel à l'action clair",
      "Dépasser le temps imparti (préparez 20% plus court que prévu)",
      "Démarrer par des excuses (« Sorry, my English is not perfect »)",
    ]},
    { type: "h2", text: "6. La phase Q&A : votre moment de vérité" },
    { type: "p", text: "Les questions ne sont pas une menace, c'est l'occasion de montrer votre expertise. Préparez-vous à 5-10 questions probables à l'avance. Quand une question vous est posée :" },
    { type: "ul", items: [
      "Répétez ou reformulez la question pour vérifier la compréhension",
      "Prenez 2 secondes pour réfléchir avant de répondre",
      "Structurez : « There are two aspects to this question... »",
      "Si vous ne savez pas : « That's an excellent question. I don't have the exact figure with me, but I'll get back to you by email. »",
      "Terminez en demandant si votre réponse est satisfaisante : « Does that answer your question? »",
    ]},
    { type: "h2", text: "7. Pratiquer avec feedback" },
    { type: "p", text: "On ne devient pas bon en présentation anglaise en lisant des articles. Il faut pratiquer, enregistrer, se réécouter, et idéalement recevoir un feedback professionnel. C'est l'objet de notre coaching linguistique : vous accompagner dans la préparation de vos présentations importantes, du script aux questions difficiles, en passant par la voix, le rythme et la gestion des slides." },
    { type: "cta", text: "Une présentation importante à préparer en anglais ? Notre coaching peut faire la différence." },
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
