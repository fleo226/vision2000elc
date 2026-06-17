'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { GraduationCap, Languages, Mic, Briefcase, ArrowRight, Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TiltCard } from "./effects"
import { useLang } from "@/lib/lang-context"

const SERVICES = [
  {
    icon: GraduationCap,
    color: "orange",
    titleKey: "services.formation.title",
    descKey: "services.formation.desc",
    ctaKey: "services.formation.cta",
    ctaHref: "/formations",
    itemsFr: ["Anglais général & professionnel", "Business English", "Préparation TOEIC / TOEFL / IELTS", "Cours particuliers & en entreprise", "Formation en ligne"],
    itemsEn: ["General & professional English", "Business English", "TOEIC / TOEFL / IELTS preparation", "Private & in-house courses", "Online training"],
  },
  {
    icon: Languages,
    color: "navy",
    titleKey: "services.traduction.title",
    descKey: "services.traduction.desc",
    ctaKey: "services.traduction.cta",
    ctaHref: "/traduction",
    itemsFr: ["Français ↔ Anglais", "Documents administratifs & juridiques", "Rapports de projets & contrats", "Documents techniques & financiers", "Sites web & brochures"],
    itemsEn: ["French ↔ English", "Administrative & legal documents", "Project reports & contracts", "Technical & financial documents", "Websites & brochures"],
  },
  {
    icon: Mic,
    color: "crimson",
    titleKey: "services.interpretation.title",
    descKey: "services.interpretation.desc",
    ctaKey: "services.interpretation.cta",
    ctaHref: "/interpretation",
    itemsFr: ["Interprétation simultanée & consécutive", "Conférences internationales", "Réunions ministérielles & diplomatiques", "Ateliers, séminaires & forums", "Missions de terrain"],
    itemsEn: ["Simultaneous & consecutive interpreting", "International conferences", "Ministerial & diplomatic meetings", "Workshops, seminars & forums", "Field missions"],
  },
  {
    icon: Briefcase,
    color: "emerald",
    titleKey: "services.coaching.title",
    descKey: "services.coaching.desc",
    ctaKey: "services.coaching.cta",
    ctaHref: "/contact",
    itemsFr: ["Préparation d'entretiens", "Communication professionnelle", "Présentations en anglais", "Coaching exécutif", "Accompagnement personnalisé"],
    itemsEn: ["Interview preparation", "Professional communication", "English presentations", "Executive coaching", "Personalized support"],
  },
]

const colorMap: Record<string, { bg: string; text: string; ring: string; hover: string; gradient: string }> = {
  orange: { bg: "bg-orange/10", text: "text-orange", ring: "ring-orange/20", hover: "group-hover:bg-orange group-hover:text-white", gradient: "from-orange/5 to-orange/0" },
  navy: { bg: "bg-navy/10", text: "text-navy", ring: "ring-navy/20", hover: "group-hover:bg-navy group-hover:text-white", gradient: "from-navy/5 to-navy/0" },
  crimson: { bg: "bg-crimson/10", text: "text-crimson", ring: "ring-crimson/20", hover: "group-hover:bg-crimson group-hover:text-white", gradient: "from-crimson/5 to-crimson/0" },
  emerald: { bg: "bg-emerald/10", text: "text-emerald", ring: "ring-emerald/20", hover: "group-hover:bg-emerald group-hover:text-white", gradient: "from-emerald/5 to-emerald/0" },
}

export function Services() {
  const { t, lang } = useLang()
  return (
    <section id="services" className="relative py-20 lg:py-28 bg-cream overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-50" />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("services.eyebrow")}
          title={<>{t("services.title1")}<span className="gradient-text-orange">{t("services.title2")}</span>{t("services.title3")}</>}
          intro={t("services.intro")}
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-14">
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            const c = colorMap[service.color]
            const items = lang === "en" ? service.itemsEn : service.itemsFr
            return (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <TiltCard intensity={6} className="h-full" data-cursor="hover">
                <Card className={`group relative overflow-hidden p-7 lg:p-8 border-navy/8 shadow-soft hover:shadow-card transition-all duration-300 bg-white h-full`} style={{ transformStyle: "preserve-3d" }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-16 h-16 rounded-2xl ${c.bg} ${c.text} ring-1 ${c.ring} flex items-center justify-center transition-colors ${c.hover}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-5xl font-display font-extrabold text-navy/5 leading-none">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-navy mb-3">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-navy-soft/80 leading-relaxed mb-5 text-[15px]">
                      {t(service.descKey)}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-navy-soft">
                          <Check className={`w-4 h-4 ${c.text} mt-0.5 shrink-0`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      variant="ghost"
                      className={`px-0 hover:bg-transparent ${c.text} hover:${c.text} font-semibold text-sm group/btn`}
                    >
                      <Link href={service.ctaHref}>
                        {t(service.ctaKey)}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </Card>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, intro, light = false }: { eyebrow: string; title: React.ReactNode; intro?: string; light?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto"
    >
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${light ? "bg-cream/10 text-orange" : "bg-orange/10 text-orange"}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-orange" />
        {eyebrow}
      </div>
      <h2 className={`mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight ${light ? "text-cream" : "text-navy"}`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base sm:text-lg leading-relaxed ${light ? "text-cream/75" : "text-navy-soft/80"}`}>
          {intro}
        </p>
      )}
    </motion.div>
  )
}
