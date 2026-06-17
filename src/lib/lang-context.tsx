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
