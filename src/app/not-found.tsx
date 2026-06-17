'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft, Search, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
        <div className="text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block mb-8"
          >
            {/* Gros 404 stylisé */}
            <motion.h1
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="font-display font-extrabold text-[120px] sm:text-[180px] leading-none tracking-tighter bg-gradient-to-r from-orange via-crimson to-orange bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              404
            </motion.h1>

            {/* Logo flottant derrière */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-2xl opacity-90"
            >
              { }
              <img src="/logo.jpeg" alt="VISION 2000 ELC" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-3">
              Oups, cette page s'est perdue en traduction ! 😅
            </h2>
            <p className="text-navy-soft/80 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              La page que vous cherchez n'existe pas ou a été déplacée. Mais pas de panique : nos linguistes
              peuvent vous aider à trouver votre chemin. Choisissez une destination ci-dessous.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Button asChild size="lg" className="bg-orange hover:bg-orange-deep text-white shadow-glow-orange font-bold h-14 px-7 group">
                <Link href="/">
                  <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-navy/20 text-navy hover:bg-navy hover:text-cream font-semibold h-14 px-7">
                <Link href="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Nous contacter
                </Link>
              </Button>
            </div>

            {/* Liens rapides */}
            <div className="pt-8 border-t border-navy/10">
              <p className="text-xs uppercase tracking-widest font-bold text-navy-soft/60 mb-4">
                Pages populaires
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { label: "Formations", href: "/formations" },
                  { label: "Traduction", href: "/traduction" },
                  { label: "Interprétation", href: "/interpretation" },
                  { label: "Pourquoi Humain", href: "/pourquoi-humain" },
                  { label: "Blog", href: "/blog" },
                  { label: "Témoignages", href: "/temoignages" },
                ].map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-lg bg-white border border-navy/8 text-sm font-semibold text-navy-soft hover:text-orange hover:border-orange/30 transition-colors shadow-soft"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
