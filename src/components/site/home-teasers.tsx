'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Brain, GraduationCap, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const TEASERS = [
  {
    icon: Brain,
    badge: "Notre différence",
    title: "L'IA traduit les mots. Nous traduisons le sens.",
    text: "Confidentialité absolue, valeur juridique, nuance culturelle, relation humaine. Découvrez pourquoi des centaines de professionnels continuent de nous faire confiance face aux outils d'IA gratuits.",
    cta: "Pourquoi Humain > IA",
    href: "/pourquoi-humain",
    color: "emerald",
  },
  {
    icon: GraduationCap,
    badge: "Nos programmes",
    title: "Des formations structurées pour chaque objectif",
    text: "Anglais général, professionnel, préparations TOEIC / TOEFL / IELTS. Cours en groupe, particuliers, en entreprise ou en ligne. Trouvez le parcours adapté à votre niveau et votre secteur.",
    cta: "Explorer les formations",
    href: "/formations",
    color: "orange",
  },
  {
    icon: ShieldCheck,
    badge: "Service 100% en ligne",
    title: "Traduisez vos documents en quelques clics",
    text: "Téléchargez vos fichiers, recevez un devis gratuit sous 2h, obtenez une traduction professionnelle révisée. Service Express disponible en 24-48h pour vos urgences.",
    cta: "Demander un devis",
    href: "/traduction",
    color: "navy",
  },
]

const colorMap: Record<string, { bg: string; text: string; btn: string }> = {
  emerald: { bg: "bg-emerald/10", text: "text-emerald", btn: "bg-emerald hover:bg-emerald/90" },
  orange: { bg: "bg-orange/10", text: "text-orange", btn: "bg-orange hover:bg-orange-deep" },
  navy: { bg: "bg-navy/10", text: "text-navy", btn: "bg-navy hover:bg-navy-soft" },
}

export function HomeTeasers() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="absolute inset-0 pattern-dots opacity-50 pointer-events-none" />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" />
            Nos expertises
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-navy">
            Trois raisons de nous confier <br className="hidden sm:block" />
            votre <span className="gradient-text-orange">communication internationale</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TEASERS.map((t, i) => {
            const Icon = t.icon
            const c = colorMap[t.color]
            return (
              <motion.div
                key={t.title}
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
                  {t.badge}
                </div>
                <h3 className="font-display text-xl font-bold text-navy mb-3 leading-snug">
                  {t.title}
                </h3>
                <p className="text-navy-soft/80 leading-relaxed mb-6 flex-1">
                  {t.text}
                </p>
                <Button asChild className={`${c.btn} text-white font-semibold h-12`}>
                  <Link href={t.href}>
                    {t.cta}
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
