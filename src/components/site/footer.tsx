'use client'

import Link from "next/link"
import { Mail, Phone, MapPin, Globe, Facebook, Linkedin, Youtube, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLang } from "@/lib/lang-context"

const NAV_SECTIONS_KEYS = [
  {
    titleKey: "footer.services",
    links: [
      { labelKey: "footer.formation", href: "/formations" },
      { labelKey: "footer.traduction", href: "/traduction" },
      { labelKey: "footer.interpretation", href: "/interpretation" },
      { labelKey: "footer.coaching", href: "/services" },
    ],
  },
  {
    titleKey: "footer.center",
    links: [
      { labelKey: "footer.apropos", href: "/a-propos" },
      { labelKey: "footer.galerie", href: "/galerie" },
      { labelKey: "footer.pourquoi", href: "/pourquoi-humain" },
      { labelKey: "footer.temoignages", href: "/temoignages" },
      { labelKey: "footer.blog", href: "/blog" },
    ],
  },
  {
    titleKey: "footer.contact",
    links: [
      { labelKey: "footer.devis", href: "/contact" },
      { labelKey: "footer.inscrire", href: "/formations" },
      { labelKey: "footer.reserver", href: "/interpretation" },
      { labelKey: "footer.faq", href: "/pourquoi-humain" },
    ],
  },
]

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/22670462670" },
]

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="relative bg-navy-deep text-cream pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="grid lg:grid-cols-2 gap-8 items-center pb-12 mb-12 border-b border-cream/10">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-cream mb-2">
              {t("footer.newsletter.title")}
            </h3>
            <p className="text-cream/70 leading-relaxed">
              {t("footer.newsletter.desc")}
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              required
              placeholder={t("footer.newsletter.placeholder")}
              className="bg-cream/10 border-cream/15 text-cream placeholder:text-cream/50 h-12 focus-visible:ring-orange focus-visible:border-orange"
            />
            <Button type="submit" className="bg-orange hover:bg-orange-deep text-white font-bold h-12 px-6 shadow-glow-orange shrink-0">
              {t("footer.newsletter.btn")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>

        {/* Grille principale */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              { }
              <img src="/logo.jpeg" alt="VISION 2000 ELC" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-orange/30" />
              <div>
                <div className="font-display font-extrabold text-cream text-xl">
                  VISION <span className="text-crimson">2000</span> ELC
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-cream/60 font-semibold">
                  {t("footer.tagline")}
                </div>
              </div>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed mb-5 max-w-sm">
              {t("footer.desc")}
            </p>
            <div className="space-y-2 text-sm">
              <a href="https://maps.google.com/?q=Koulouba+Ouagadougou+Burkina+Faso" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cream/75 hover:text-orange transition-colors">
                <MapPin className="w-4 h-4 text-orange shrink-0" />
                Koulouba, Ouagadougou, Burkina Faso
              </a>
              <a href="tel:+22670462670" className="flex items-center gap-2 text-cream/75 hover:text-orange transition-colors">
                <Phone className="w-4 h-4 text-orange shrink-0" />
                +226 70 46 26 70
              </a>
              <a href="mailto:contact@vision2000elc.com" className="flex items-center gap-2 text-cream/75 hover:text-orange transition-colors">
                <Mail className="w-4 h-4 text-orange shrink-0" />
                contact@vision2000elc.com
              </a>
              <a href="https://vision2000elc.com" className="flex items-center gap-2 text-cream/75 hover:text-orange transition-colors">
                <Globe className="w-4 h-4 text-orange shrink-0" />
                www.vision2000elc.com
              </a>
            </div>
          </div>

          {/* Liens */}
          <div className="lg:col-span-6 grid sm:grid-cols-3 gap-6">
            {NAV_SECTIONS_KEYS.map((s) => (
              <div key={s.titleKey}>
                <h4 className="font-display font-bold text-cream mb-3 text-sm uppercase tracking-wider">
                  {t(s.titleKey)}
                </h4>
                <ul className="space-y-2">
                  {s.links.map((l) => (
                    <li key={l.labelKey}>
                      <Link
                        href={l.href}
                        className="text-sm text-cream/70 hover:text-orange transition-colors"
                      >
                        {t(l.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Réseaux sociaux */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-cream mb-3 text-sm uppercase tracking-wider">
              {t("footer.follow")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="w-10 h-10 rounded-xl bg-cream/10 hover:bg-orange text-cream hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 text-emerald text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              {t("footer.available")}
            </div>
          </div>
        </div>

        {/* Bandeau bas */}
        <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/55">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} VISION 2000 ELC. {t("footer.rights")}
            <span className="hidden sm:inline"> · {t("footer.madeIn")}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-orange transition-colors">{t("footer.legal")}</Link>
            <Link href="#" className="hover:text-orange transition-colors">{t("footer.privacy")}</Link>
            <Link href="#" className="hover:text-orange transition-colors">{t("footer.cgv")}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
