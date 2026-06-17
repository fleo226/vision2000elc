'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Globe2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang-context"

const NAV_LINKS = [
  { href: "/services", labelKey: "nav.services" },
  { href: "/pourquoi-humain", labelKey: "nav.pourquoi" },
  { href: "/formations", labelKey: "nav.formations" },
  { href: "/traduction", labelKey: "nav.traduction" },
  { href: "/interpretation", labelKey: "nav.interpretation" },
  { href: "/a-propos", labelKey: "nav.apropos" },
  { href: "/temoignages", labelKey: "nav.temoignages" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/contact", labelKey: "nav.contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { t, lang, toggle } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleNavClick = () => {
    setMobileOpen(false)
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled || pathname !== "/"
            ? "bg-white/95 backdrop-blur-md shadow-soft py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo + Nom */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-orange/30 group-hover:ring-orange/60 transition-all shrink-0">
                { }
                <img src="/logo.jpeg" alt="VISION 2000 ELC" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-display font-extrabold text-lg tracking-tight text-navy">
                  VISION <span className="text-crimson">2000</span> ELC
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-navy-soft/70 font-semibold mt-0.5">
                  {t("nav.tagline")}
                </span>
              </div>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.slice(0, 7).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive(link.href)
                      ? "text-orange bg-orange/10"
                      : "text-navy-soft hover:text-orange hover:bg-cream-warm"
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            {/* CTAs */}
            <div className="flex items-center gap-2">
              {/* Bouton toggle langue */}
              <button
                onClick={toggle}
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-semibold text-navy hover:text-orange transition-colors rounded-md hover:bg-cream-warm"
                aria-label="Switch language"
                title={lang === "fr" ? "Switch to English" : "Passer en français"}
              >
                <Globe2 className="w-4 h-4" />
                <span className="font-bold">{lang === "fr" ? "EN" : "FR"}</span>
              </button>

              <a
                href="tel:+22670462670"
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-navy hover:text-orange transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">+226 70 46 26 70</span>
                <span className="xl:hidden">{t("nav.call")}</span>
              </a>
              <Button
                asChild
                size="sm"
                className="hidden sm:inline-flex bg-orange hover:bg-orange-deep text-white shadow-glow-orange font-semibold"
              >
                <Link href="/contact">{t("nav.devis")}</Link>
              </Button>

              {/* Burger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-navy hover:bg-cream-warm"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer mobile */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden transition-all duration-300",
          mobileOpen ? "visible" : "invisible"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-navy-deep/70 backdrop-blur-sm transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl transition-transform duration-300 flex flex-col",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-5 border-b border-navy/10">
            <div className="flex items-center gap-3">
              { }
              <img src="/logo.jpeg" alt="VISION 2000 ELC" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-display font-extrabold text-navy">
                VISION <span className="text-crimson">2000</span>
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 inline-flex items-center justify-center rounded-md hover:bg-cream-warm text-navy"
              aria-label="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-5 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={cn(
                  "block px-4 py-3 rounded-lg font-semibold transition-colors",
                  isActive(link.href)
                    ? "text-orange bg-orange/10"
                    : "text-navy hover:bg-cream-warm hover:text-orange"
                )}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="p-5 border-t border-navy/10 space-y-3">
            <a
              href="tel:+22670462670"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-navy/15 text-navy font-semibold hover:bg-cream-warm"
            >
              <Phone className="w-4 h-4" /> +226 70 46 26 70
            </a>
            <Button
              asChild
              className="w-full bg-orange hover:bg-orange-deep text-white shadow-glow-orange"
            >
              <Link href="/contact" onClick={handleNavClick}>
                {t("nav.devis")}
              </Link>
            </Button>
            <button
              onClick={toggle}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-navy/15 text-navy font-semibold hover:bg-cream-warm"
            >
              <Globe2 className="w-4 h-4" />
              {lang === "fr" ? "Switch to English" : "Passer en français"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
