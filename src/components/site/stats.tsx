'use client'

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Award, BookOpen, Mic, Users } from "lucide-react"
import { SectionHeading } from "./services"

const STATS = [
  { icon: Award, value: 20, suffix: "+", label: "Années d'expérience", sub: "Au service du Burkina Faso et de la sous-région", color: "orange" },
  { icon: BookOpen, value: 1000000, suffix: "+", label: "Mots traduits", sub: "Documents administratifs, juridiques, techniques", color: "emerald", format: "compact" },
  { icon: Users, value: 500, suffix: "+", label: "Professionnels formés", sub: "Cadres, fonctionnaires, étudiants, entrepreneurs", color: "crimson" },
  { icon: Mic, value: 100, suffix: "+", label: "Conférences accompagnées", sub: "Nationales et internationales", color: "gold" },
]

const colorMap: Record<string, string> = {
  orange: "text-orange bg-orange/10",
  emerald: "text-emerald bg-emerald/10",
  crimson: "text-crimson bg-crimson/10",
  gold: "text-gold bg-gold/10",
}

function Counter({ value, suffix = "", format = "default" }: { value: number; suffix?: string; format?: "default" | "compact" }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(value * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  const formatted = format === "compact" && display >= 1000
    ? display >= 1000000
      ? `${(display / 1000000).toFixed(display % 1000000 === 0 ? 0 : 1)}M`
      : `${(display / 1000).toFixed(display % 1000 === 0 ? 0 : 0)}K`
    : display.toLocaleString("fr-FR")

  return (
    <span ref={ref}>
      {formatted}
      <span className="text-orange">{suffix}</span>
    </span>
  )
}

export function Stats() {
  return (
    <section id="realisations" className="relative py-20 lg:py-28 bg-cream-warm overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Réalisations"
          title={<>Des chiffres qui <span className="gradient-text-orange">parlent d'eux-mêmes</span></>}
          intro="Plus de deux décennies d'engagement auprès des particuliers, entreprises, ONG et institutions du Burkina Faso. Chaque chiffre représente une mission réussie, un professionnel accompagné, une communication facilitée."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {STATS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative bg-white rounded-2xl p-6 shadow-soft border border-navy/8 text-center overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange/0 to-orange/0 group-hover:from-orange/5 group-hover:to-transparent transition-all" />
                <div className="relative">
                  <div className={`w-14 h-14 mx-auto rounded-2xl ${colorMap[s.color]} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-1 tracking-tight">
                    <Counter value={s.value} suffix={s.suffix} format={s.format as "default" | "compact"} />
                  </div>
                  <div className="font-display font-bold text-navy text-sm sm:text-base mb-1">{s.label}</div>
                  <div className="text-xs text-navy-soft/65 leading-relaxed">{s.sub}</div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-navy text-cream rounded-3xl p-8 sm:p-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="relative grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                Un partenariat linguistique durable, pas une simple prestation
              </h3>
              <p className="text-cream/75 leading-relaxed">
                80% de nos clients renouvellent leurs missions avec nous. C'est notre meilleure publicité :
                la confiance que nous construisons mission après mission, document après document, formation après formation.
              </p>
            </div>
            <div className="text-center md:text-right">
              <div className="font-display text-6xl font-extrabold gradient-text-orange">80%</div>
              <div className="text-sm text-cream/70 mt-1">de clients fidèles</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
