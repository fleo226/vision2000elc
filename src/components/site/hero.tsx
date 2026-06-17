'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Star, ShieldCheck, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang } from "@/lib/lang-context"

export function Hero() {
  const { t } = useLang()
  return (
    <section
      id="accueil"
      className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden gradient-hero text-navy"
    >
      {/* Background blobs subtils */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-orange/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-emerald/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Colonne gauche */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange/20 shadow-soft text-navy text-xs sm:text-sm font-medium mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
              </span>
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-navy"
            >
              {t("hero.title1")}
              <br />
              <span className="gradient-text-orange">{t("hero.title2")}</span> {t("hero.title3")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-navy-soft/80 max-w-2xl leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="bg-orange hover:bg-orange-deep text-white shadow-glow-orange font-bold text-base h-14 px-7 group"
              >
                <Link href="/contact">
                  {t("hero.cta1")}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-navy/20 text-navy hover:bg-navy hover:text-cream font-semibold text-base h-14 px-7"
              >
                <Link href="/formations">
                  {t("hero.cta2")}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-navy hover:bg-cream-warm hover:text-orange font-semibold text-base h-14 px-7"
              >
                <a href="tel:+22670462670">
                  <Phone className="w-5 h-5 mr-2" />
                  +226 70 46 26 70
                </a>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            >
              <div className="flex items-center gap-2 text-navy-soft">
                <ShieldCheck className="w-5 h-5 text-emerald" />
                <span>{t("hero.trust.confidentiality")}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-soft">
                <Clock className="w-5 h-5 text-orange" />
                <span>{t("hero.trust.express")}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-soft">
                <Sparkles className="w-5 h-5 text-gold" />
                <span>{t("hero.trust.human")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-navy-soft">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <span>{t("hero.trust.since")}</span>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite - Photo du formateur + carte de preuve */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              {/* Photo principale du formateur en session */}
              <div className="relative rounded-3xl overflow-hidden shadow-card border border-navy/8">
                { }
                <img
                  src="/formateur.jpg"
                  alt="Formateur VISION 2000 ELC en session de formation à Ouagadougou"
                  className="w-full h-[420px] sm:h-[500px] object-cover"
                />
                {/* Overlay dégradé en bas */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />

                {/* Carte notoriété en bas de la photo */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-light rounded-xl p-3 flex items-center gap-3">
                    { }
                    <img src="/logo.jpeg" alt="VISION 2000 ELC" className="w-10 h-10 rounded-lg object-cover ring-1 ring-orange/30 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-display font-bold text-navy text-sm">VISION 2000 ELC</div>
                      <div className="text-[11px] text-navy-soft/70 truncate">+20 ans d'expertise humaine à Ouagadougou</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display font-extrabold text-orange text-lg leading-none">20+</div>
                      <div className="text-[10px] text-navy-soft/70 uppercase tracking-wider">ans</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge flottant */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-3 sm:-right-5 bg-emerald text-white text-xs font-bold px-3 py-2 rounded-full shadow-glow-emerald flex items-center gap-1.5 z-10"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Humain
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-3 sm:-left-5 bg-orange text-white text-xs font-bold px-3 py-2 rounded-full shadow-glow-orange flex items-center gap-1.5 z-10"
              >
                <Clock className="w-3.5 h-3.5" />
                Express 24h
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
