'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Lang = "fr" | "en"

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextType | null>(null)

// Dictionnaire de traductions
const translations: Record<Lang, Record<string, string>> = {
  fr: {
    // Header / Nav
    "nav.services": "Services",
    "nav.pourquoi": "Pourquoi Humain",
    "nav.formations": "Formations",
    "nav.traduction": "Traduction",
    "nav.interpretation": "Interprétation",
    "nav.apropos": "À propos",
    "nav.galerie": "Galerie",
    "nav.temoignages": "Témoignages",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.devis": "Devis gratuit",
    "nav.call": "Appeler",
    "nav.tagline": "Formation · Traduction · Interprétation",
    // Hero
    "hero.badge": "Plus de 20 ans d'expertise humaine à Ouagadougou",
    "hero.title1": "Maîtrisez l'anglais.",
    "hero.title2": "Communiquez",
    "hero.title3": "avec le monde.",
    "hero.subtitle": "Centre de référence à Ouagadougou. Formation en anglais, traduction professionnelle et interprétation de conférences — par des humains, pour des humains.",
    "hero.cta1": "Demander un devis",
    "hero.cta2": "Nos formations",
    "hero.trust.confidentiality": "Confidentialité garantie",
    "hero.trust.express": "Livraison express 24-48h",
    "hero.trust.human": "100% humain & certifié",
    "hero.trust.since": "Depuis 2003",
    // Common
    "common.readMore": "Lire la suite",
    "common.viewAll": "Voir tous les articles",
    "common.callNow": "Appeler maintenant",
    "common.getQuote": "Demander un devis",
    "common.bookInterpreter": "Réserver un interprète",
    "common.bookSession": "Réserver une séance",
    "common.viewFormations": "Voir les formations",
    "common.discussExpert": "Discuter avec un expert humain",
    "common.becomeClient": "Devenir notre prochain client satisfait",
    // Footer
    "footer.tagline": "Formation · Traduction · Interprétation",
    "footer.newsletter.title": "Recevez nos conseils en anglais & traduction",
    "footer.newsletter.desc": "Une newsletter mensuelle, zéro spam. Astuces, actualités du centre et offres réservées aux abonnés.",
    "footer.newsletter.placeholder": "Votre adresse email",
    "footer.newsletter.btn": "S'abonner",
    "footer.services": "Services",
    "footer.center": "Centre",
    "footer.contact": "Contact",
    "footer.follow": "Suivez-nous",
    "footer.available": "Disponible maintenant",
    "footer.rights": "Tous droits réservés.",
    "footer.madeIn": "Conçu avec expertise à Ouagadougou, Burkina Faso.",
    // TrustBar
    "trustbar.label": "Ils nous confient leur communication internationale depuis 2003",
    "trustbar.ministries": "Ministères & États",
    "trustbar.companies": "Entreprises",
    "trustbar.ngo": "ONG",
    "trustbar.banks": "Banques",
    "trustbar.universities": "Universités",
    "trustbar.individuals": "Particuliers",
    // Services
    "services.eyebrow": "Nos Services",
    "services.title1": "Une expertise linguistique ",
    "services.title2": "complète",
    "services.title3": ", tout au long de votre parcours",
    "services.intro": "De la formation à la traduction, de l'interprétation au coaching exécutif, VISION 2000 ELC vous accompagne à chaque étape de votre communication internationale. Quatre pôles d'expertise, une même exigence : l'excellence humaine.",
    "services.formation.title": "Formation en anglais",
    "services.formation.desc": "Anglais général, professionnel, Business English, préparation TOEIC/TOEFL/IELTS, cours en entreprise ou en ligne. Programmes sur-mesure pour débutants et avancés.",
    "services.formation.cta": "Voir les formations",
    "services.traduction.title": "Traduction professionnelle",
    "services.traduction.desc": "Traduction spécialisée français ↔ anglais de documents administratifs, juridiques, techniques, financiers et sites web. Révision par des linguistes professionnels et livraison express possible.",
    "services.traduction.cta": "Demander un devis",
    "services.interpretation.title": "Interprétation",
    "services.interpretation.desc": "Interprétation simultanée et consécutive pour conférences internationales, réunions ministérielles, ateliers et missions diplomatiques. Des cabines équipées et des interprètes certifiés.",
    "services.interpretation.cta": "Réserver un interprète",
    "services.coaching.title": "Coaching linguistique",
    "services.coaching.desc": "Préparation d'entretiens, communication professionnelle, présentations en anglais, coaching exécutif personnalisé. Développez votre aisance à l'oral comme à l'écrit.",
    "services.coaching.cta": "Réserver une séance",
    // HomeTeasers
    "teasers.eyebrow": "Nos expertises",
    "teasers.title1": "Trois raisons de nous confier",
    "teasers.title2": "votre communication internationale",
    "teasers.1.badge": "Notre différence",
    "teasers.1.title": "L'IA traduit les mots. Nous traduisons le sens.",
    "teasers.1.text": "Confidentialité absolue, valeur juridique, nuance culturelle, relation humaine. Découvrez pourquoi des centaines de professionnels continuent de nous faire confiance face aux outils d'IA gratuits.",
    "teasers.1.cta": "Pourquoi Humain > IA",
    "teasers.2.badge": "Nos programmes",
    "teasers.2.title": "Des formations structurées pour chaque objectif",
    "teasers.2.text": "Anglais général, professionnel, préparations TOEIC / TOEFL / IELTS. Cours en groupe, particuliers, en entreprise ou en ligne. Trouvez le parcours adapté à votre niveau et votre secteur.",
    "teasers.2.cta": "Explorer les formations",
    "teasers.3.badge": "Service 100% en ligne",
    "teasers.3.title": "Traduisez vos documents en quelques clics",
    "teasers.3.text": "Téléchargez vos fichiers, recevez un devis gratuit sous 2h, obtenez une traduction professionnelle révisée. Service Express disponible en 24-48h pour vos urgences.",
    "teasers.3.cta": "Demander un devis",
    // Stats
    "stats.eyebrow": "Réalisations",
    "stats.title1": "Des chiffres qui ",
    "stats.title2": "parlent d'eux-mêmes",
    "stats.intro": "Plus de deux décennies d'engagement auprès des particuliers, entreprises, ONG et institutions du Burkina Faso. Chaque chiffre représente une mission réussie, un professionnel accompagné, une communication facilitée.",
    "stats.1.label": "Années d'expérience",
    "stats.1.sub": "Au service du Burkina Faso et de la sous-région",
    "stats.2.label": "Mots traduits",
    "stats.2.sub": "Documents administratifs, juridiques, techniques",
    "stats.3.label": "Professionnels formés",
    "stats.3.sub": "Cadres, fonctionnaires, étudiants, entrepreneurs",
    "stats.4.label": "Conférences accompagnées",
    "stats.4.sub": "Nationales et internationales",
    "stats.retention.title": "Un partenariat linguistique durable, pas une simple prestation",
    "stats.retention.text": "80% de nos clients renouvellent leurs missions avec nous. C'est notre meilleure publicité : la confiance que nous construisons mission après mission, document après document, formation après formation.",
    "stats.retention.sub": "de clients fidèles",
    // Testimonials
    "testimonials.eyebrow": "Témoignages",
    "testimonials.title1": "Ce que disent ",
    "testimonials.title2": "ceux qui nous font confiance",
    "testimonials.intro": "La meilleure preuve de notre expertise, ce sont les mots de nos clients. Voici quelques-uns de leurs retours, recueillis au fil de nos missions.",
    // HomeCTA
    "homecta.title": "Prêt à communiquer avec le monde ?",
    "homecta.text": "Discutons de votre projet dès aujourd'hui. La première consultation est gratuite, et nous répondons sous 2h ouvrées.",
    "homecta.btn1": "Demander un devis gratuit",
    "homecta.btn2": "Discutons sur WhatsApp",
    "homecta.stat1": "ans d'expérience",
    "homecta.stat2": "mots traduits",
    "homecta.stat3": "livraison Express",
    "homecta.stat4": "humain & certifié",
    // Floating
    "floating.whatsapp.title": "VISION 2000 ELC",
    "floating.whatsapp.status": "Répond en quelques minutes",
    "floating.whatsapp.msg": "👋 Bonjour ! Je suis l'équipe de VISION 2000 ELC. Comment pouvons-nous vous aider aujourd'hui ? Traduction, formation, interprétation ?",
    "floating.whatsapp.open": "Ouvrir la conversation",
    // Misc
    "misc.langToggle": "English",
    "misc.home": "Accueil",
  },
  en: {
    // Header / Nav
    "nav.services": "Services",
    "nav.pourquoi": "Why Human",
    "nav.formations": "Training",
    "nav.traduction": "Translation",
    "nav.interpretation": "Interpreting",
    "nav.apropos": "About",
    "nav.galerie": "Gallery",
    "nav.temoignages": "Testimonials",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.devis": "Free quote",
    "nav.call": "Call",
    "nav.tagline": "Training · Translation · Interpreting",
    // Hero
    "hero.badge": "Over 20 years of human expertise in Ouagadougou",
    "hero.title1": "Master English.",
    "hero.title2": "Communicate",
    "hero.title3": "with the world.",
    "hero.subtitle": "A leading language center in Ouagadougou. English training, professional translation and conference interpreting — by humans, for humans.",
    "hero.cta1": "Get a quote",
    "hero.cta2": "Our courses",
    "hero.trust.confidentiality": "Confidentiality guaranteed",
    "hero.trust.express": "Express delivery 24-48h",
    "hero.trust.human": "100% human & certified",
    "hero.trust.since": "Since 2003",
    // Common
    "common.readMore": "Read more",
    "common.viewAll": "View all articles",
    "common.callNow": "Call now",
    "common.getQuote": "Get a quote",
    "common.bookInterpreter": "Book an interpreter",
    "common.bookSession": "Book a session",
    "common.viewFormations": "View courses",
    "common.discussExpert": "Talk to a human expert",
    "common.becomeClient": "Become our next satisfied client",
    // Footer
    "footer.tagline": "Training · Translation · Interpreting",
    "footer.newsletter.title": "Get our English & translation tips",
    "footer.newsletter.desc": "Monthly newsletter, zero spam. Tips, center news and subscriber-only offers.",
    "footer.newsletter.placeholder": "Your email address",
    "footer.newsletter.btn": "Subscribe",
    "footer.services": "Services",
    "footer.center": "Center",
    "footer.contact": "Contact",
    "footer.follow": "Follow us",
    "footer.available": "Available now",
    "footer.rights": "All rights reserved.",
    "footer.madeIn": "Crafted with expertise in Ouagadougou, Burkina Faso.",
    // TrustBar
    "trustbar.label": "Trusted with international communication since 2003",
    "trustbar.ministries": "Ministries & States",
    "trustbar.companies": "Companies",
    "trustbar.ngo": "NGOs",
    "trustbar.banks": "Banks",
    "trustbar.universities": "Universities",
    "trustbar.individuals": "Individuals",
    // Services
    "services.eyebrow": "Our Services",
    "services.title1": "Comprehensive language ",
    "services.title2": "expertise",
    "services.title3": " throughout your journey",
    "services.intro": "From training to translation, from interpreting to executive coaching, VISION 2000 ELC supports you at every stage of your international communication. Four areas of expertise, one standard: human excellence.",
    "services.formation.title": "English Training",
    "services.formation.desc": "General, professional, Business English, TOEIC/TOEFL/IELTS preparation, in-house or online courses. Tailored programs for beginners and advanced learners.",
    "services.formation.cta": "View courses",
    "services.traduction.title": "Professional Translation",
    "services.traduction.desc": "Specialized French ↔ English translation of administrative, legal, technical, financial documents and websites. Reviewed by professional linguists with express delivery available.",
    "services.traduction.cta": "Get a quote",
    "services.interpretation.title": "Interpreting",
    "services.interpretation.desc": "Simultaneous and consecutive interpreting for international conferences, ministerial meetings, workshops and diplomatic missions. Equipped booths and certified interpreters.",
    "services.interpretation.cta": "Book an interpreter",
    "services.coaching.title": "Language Coaching",
    "services.coaching.desc": "Interview preparation, professional communication, English presentations, personalized executive coaching. Develop your fluency in both spoken and written English.",
    "services.coaching.cta": "Book a session",
    // HomeTeasers
    "teasers.eyebrow": "Our expertise",
    "teasers.title1": "Three reasons to trust us with",
    "teasers.title2": "your international communication",
    "teasers.1.badge": "Our difference",
    "teasers.1.title": "AI translates words. We translate meaning.",
    "teasers.1.text": "Absolute confidentiality, legal value, cultural nuance, human relationship. Discover why hundreds of professionals continue to trust us over free AI tools.",
    "teasers.1.cta": "Why Human > AI",
    "teasers.2.badge": "Our programs",
    "teasers.2.title": "Structured training for every goal",
    "teasers.2.text": "General, professional English, TOEIC / TOEFL / IELTS preparation. Group, private, in-house or online courses. Find the right track for your level and sector.",
    "teasers.2.cta": "Explore courses",
    "teasers.3.badge": "100% online service",
    "teasers.3.title": "Translate your documents in a few clicks",
    "teasers.3.text": "Upload your files, get a free quote within 2 hours, receive a professionally reviewed translation. Express service available 24-48h for urgent needs.",
    "teasers.3.cta": "Get a quote",
    // Stats
    "stats.eyebrow": "Achievements",
    "stats.title1": "Numbers that ",
    "stats.title2": "speak for themselves",
    "stats.intro": "Over two decades of commitment to individuals, companies, NGOs and institutions in Burkina Faso. Each number represents a successful mission, a supported professional, a facilitated communication.",
    "stats.1.label": "Years of experience",
    "stats.1.sub": "Serving Burkina Faso and the sub-region",
    "stats.2.label": "Words translated",
    "stats.2.sub": "Administrative, legal, technical documents",
    "stats.3.label": "Professionals trained",
    "stats.3.sub": "Executives, civil servants, students, entrepreneurs",
    "stats.4.label": "Conferences supported",
    "stats.4.sub": "National and international",
    "stats.retention.title": "A lasting language partnership, not just a service",
    "stats.retention.text": "80% of our clients renew their missions with us. That's our best advertisement: the trust we build mission after mission, document after document, training after training.",
    "stats.retention.sub": "loyal clients",
    // Testimonials
    "testimonials.eyebrow": "Testimonials",
    "testimonials.title1": "What ",
    "testimonials.title2": "our clients say",
    "testimonials.intro": "The best proof of our expertise is the words of our clients. Here are some of their feedback, gathered over our missions.",
    // HomeCTA
    "homecta.title": "Ready to communicate with the world?",
    "homecta.text": "Let's discuss your project today. The first consultation is free, and we respond within 2 business hours.",
    "homecta.btn1": "Get a free quote",
    "homecta.btn2": "Chat on WhatsApp",
    "homecta.stat1": "years of experience",
    "homecta.stat2": "words translated",
    "homecta.stat3": "Express delivery",
    "homecta.stat4": "human & certified",
    // Floating
    "floating.whatsapp.title": "VISION 2000 ELC",
    "floating.whatsapp.status": "Replies within minutes",
    "floating.whatsapp.msg": "👋 Hello! This is the VISION 2000 ELC team. How can we help you today? Translation, training, interpreting?",
    "floating.whatsapp.open": "Open conversation",
    // Misc
    "misc.langToggle": "Français",
    "misc.home": "Home",
  },
}

export function LangProvider({ children }: { children: ReactNode }) {
  // Initialisation paresseuse : lit localStorage au premier render (pas d'effet)
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "fr"
    const stored = localStorage.getItem("lang") as Lang | null
    return stored === "fr" || stored === "en" ? stored : "fr"
  })

  // Synchronise l'attribut lang du <html> quand la langue change
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l)
    }
  }

  const toggle = () => setLang(lang === "fr" ? "en" : "fr")

  const t = (key: string): string => {
    return translations[lang][key] || translations.fr[key] || key
  }

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used within LangProvider")
  return ctx
}
