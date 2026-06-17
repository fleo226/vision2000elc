'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { SectionHeading } from "./services"
import { useAutoCarousel } from "./effects"
import { useLang } from "@/lib/lang-context"

const TESTIMONIALS = [
  {
    quote: "Grâce à VISION 2000 ELC, notre personnel a considérablement amélioré son niveau d'anglais professionnel. Les formations sont concrètes, adaptées à notre secteur bancaire, et les résultats sont mesurables. Nous recommandons vivement.",
    author: "Directrice des Ressources Humaines",
    org: "Banque de premier plan, Ouagadougou",
    initials: "DR",
    color: "bg-orange",
  },
  {
    quote: "Service d'interprétation remarquable lors de notre conférence internationale sur le développement. Équipe ponctuelle, professionnelle, parfaitement équipée. Nos invités anglophones se sont sentis pleinement inclus.",
    author: "Coordonnateur de programme",
    org: "ONG internationale de développement",
    initials: "CP",
    color: "bg-emerald",
  },
  {
    quote: "Des traductions précises, livrées dans les délais, et un interlocuteur toujours disponible. Nous avons confié à VISION 2000 ELC la traduction de tous nos rapports bailleurs depuis 3 ans, sans une seule déception.",
    author: "Responsable Communication",
    org: "Projet de développement rural",
    initials: "RC",
    color: "bg-crimson",
  },
  {
    quote: "J'ai préparé mon TOEIC en cours particuliers avec VISION 2000 ELC. Score obtenu : 845. Cette formation a véritablement accéléré ma carrière en m'ouvrant les portes d'une entreprise internationale.",
    author: "Cadre supérieur",
    org: "Secteur télécommunications",
    initials: "CS",
    color: "bg-gold",
  },
  {
    quote: "L'équipe a accompagné notre délégation ministérielle lors d'un sommet régional. Discrétion, professionnalisme et précision : tout était parfait. Nous recontracterons sans hésiter.",
    author: "Chef de cabinet",
    org: "Ministère, Burkina Faso",
    initials: "CC",
    color: "bg-navy",
  },
]

export function Testimonials() {
  const { t } = useLang()
  const { idx, direction, paused, setPaused, go, goTo } = useAutoCarousel(TESTIMONIALS.length, 6000)

  const current = TESTIMONIALS[idx]

  return (
    <section
      id="temoignages"
      className="relative py-20 lg:py-28 bg-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 pattern-dots opacity-50" />
      <div className="relative container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("testimonials.eyebrow")}
          title={<>{t("testimonials.title1")}<span className="gradient-text-orange">{t("testimonials.title2")}</span></>}
          intro={t("testimonials.intro")}
        />

        <div className="mt-14 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-orange text-white flex items-center justify-center shadow-glow-orange rotate-6 z-10">
            <Quote className="w-8 h-8" />
          </div>

          <div className="bg-white rounded-3xl shadow-card border border-navy/8 p-8 sm:p-12 min-h-[320px] sm:min-h-[280px] overflow-hidden relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={idx}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                <blockquote className="font-display text-lg sm:text-xl lg:text-2xl text-navy leading-relaxed font-medium mb-6">
                  « {current.quote} »
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-navy/8">
                  <div className={`w-14 h-14 rounded-full ${current.color} text-white flex items-center justify-center font-display font-bold text-lg`}>
                    {current.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{current.author}</div>
                    <div className="text-sm text-navy-soft/70">{current.org}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Contrôles */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-12 h-12 rounded-full bg-white border border-navy/10 text-navy hover:bg-orange hover:text-white hover:border-orange shadow-soft flex items-center justify-center transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    goTo(i)
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    i === idx ? "w-8 bg-orange" : "w-2.5 bg-navy/15 hover:bg-navy/30"
                  }`}
                  aria-label={`Aller au témoignage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-12 h-12 rounded-full bg-white border border-navy/10 text-navy hover:bg-orange hover:text-white hover:border-orange shadow-soft flex items-center justify-center transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
