'use client'

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Award, BookOpen, Mic, Users } from "lucide-react"
import { SectionHeading } from "./services"
import { useLang } from "@/lib/lang-context"

const STATS = [
  { icon: Award, value: 20, suffix: "+", labelKey: "stats.1.label", subKey: "stats.1.sub", color: "orange" },
  { icon: BookOpen, value: 1000000, suffix: "+", labelKey: "stats.2.label", subKey: "stats.2.sub", color: "emerald", format: "compact" },
  { icon: Users, value: 500, suffix: "+", labelKey: "stats.3.label", subKey: "stats.3.sub", color: "crimson" },
  { icon: Mic, value: 100, suffix: "+", labelKey: "stats.4.label", subKey: "stats.4.sub", color: "gold" },
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
  const { t } = useLang()
  return (
    <section id="realisations" className="relative py-20 lg:py-28 bg-cream-warm overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("stats.eyebrow")}
          title={<>{t("stats.title1")}<span className="gradient-text-orange">{t("stats.title2")}</span></>}
          intro={t("stats.intro")}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {STATS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.labelKey}
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
                  <div className="font-display font-bold text-navy text-sm sm:text-base mb-1">{t(s.labelKey)}</div>
                  <div className="text-xs text-navy-soft/65 leading-relaxed">{t(s.subKey)}</div>
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
                {t("stats.retention.title")}
              </h3>
              <p className="text-cream/75 leading-relaxed">
                {t("stats.retention.text")}
              </p>
            </div>
            <div className="text-center md:text-right">
              <div className="font-display text-6xl font-extrabold gradient-text-orange">80%</div>
              <div className="text-sm text-cream/70 mt-1">{t("stats.retention.sub")}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
