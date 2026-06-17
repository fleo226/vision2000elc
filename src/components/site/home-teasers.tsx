'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Brain, GraduationCap, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang } from "@/lib/lang-context"

const colorMap: Record<string, { bg: string; text: string; btn: string }> = {
  emerald: { bg: "bg-emerald/10", text: "text-emerald", btn: "bg-emerald hover:bg-emerald/90" },
  orange: { bg: "bg-orange/10", text: "text-orange", btn: "bg-orange hover:bg-orange-deep" },
  navy: { bg: "bg-navy/10", text: "text-navy", btn: "bg-navy hover:bg-navy-soft" },
}

export function HomeTeasers() {
  const { t } = useLang()

  const TEASERS = [
    {
      icon: Brain,
      badgeKey: "teasers.1.badge",
      titleKey: "teasers.1.title",
      textKey: "teasers.1.text",
      ctaKey: "teasers.1.cta",
      href: "/pourquoi-humain",
      color: "emerald",
    },
    {
      icon: GraduationCap,
      badgeKey: "teasers.2.badge",
      titleKey: "teasers.2.title",
      textKey: "teasers.2.text",
      ctaKey: "teasers.2.cta",
      href: "/formations",
      color: "orange",
    },
    {
      icon: ShieldCheck,
      badgeKey: "teasers.3.badge",
      titleKey: "teasers.3.title",
      textKey: "teasers.3.text",
      ctaKey: "teasers.3.cta",
      href: "/traduction",
      color: "navy",
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="absolute inset-0 pattern-dots opacity-50 pointer-events-none" />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" />
            {t("teasers.eyebrow")}
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-navy">
            {t("teasers.title1")} <br className="hidden sm:block" />
            <span className="gradient-text-orange">{t("teasers.title2")}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TEASERS.map((teaser, i) => {
            const Icon = teaser.icon
            const c = colorMap[teaser.color]
            return (
              <motion.div
                key={teaser.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-7 border border-navy/8 shadow-soft hover:shadow-card transition-all flex flex-col h-full"
              >
                <div className={`w-14 h-14 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center mb-5`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className={`inline-flex self-start px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${c.bg} ${c.text} mb-3`}>
                  {t(teaser.badgeKey)}
                </div>
                <h3 className="font-display text-xl font-bold text-navy mb-3 leading-snug">
                  {t(teaser.titleKey)}
                </h3>
                <p className="text-navy-soft/80 leading-relaxed mb-6 flex-1">
                  {t(teaser.textKey)}
                </p>
                <Button asChild className={`${c.btn} text-white font-semibold h-12`}>
                  <Link href={teaser.href}>
                    {t(teaser.ctaKey)}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
