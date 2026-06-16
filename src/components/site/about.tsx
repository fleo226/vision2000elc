'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Target, Eye, Heart, ArrowRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "./services"

const VALUES = [
  { title: "Excellence", desc: "Chaque mission est traitée avec la plus haute exigence qualité, du premier mot au dernier.", color: "orange" },
  { title: "Professionnalisme", desc: "Ponctualité, discrétion, méthodologie éprouvée. Le sérieux d'un partenaire de confiance.", color: "navy" },
  { title: "Intégrité", desc: "Engagement transparent sur les délais, les tarifs et la qualité livrée. Pas de promesse en l'air.", color: "emerald" },
  { title: "Confidentialité", desc: "Vos documents et informations sont protégés. NDA disponible pour chaque mission sensible.", color: "crimson" },
  { title: "Satisfaction client", desc: "Notre réputation s'est bâtie sur le bouche-à-oreille. Votre succès est le nôtre.", color: "gold" },
]

const colorMap: Record<string, string> = {
  orange: "text-orange bg-orange/10 border-orange/20",
  navy: "text-navy bg-navy/10 border-navy/20",
  emerald: "text-emerald bg-emerald/10 border-emerald/20",
  crimson: "text-crimson bg-crimson/10 border-crimson/20",
  gold: "text-gold bg-gold/10 border-gold/20",
}

export function About() {
  return (
    <section id="a-propos" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cream/40 -skew-x-6 origin-top-right" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Colonne gauche : Histoire + Vision */}
          <div className="lg:col-span-7 space-y-8">
            <SectionHeading
              eyebrow="À propos"
              title={<>20 ans d'expertise humaine <span className="gradient-text-orange">au cœur de Ouagadougou</span></>}
              intro="Fondé il y a plus de deux décennies, VISION 2000 ELC est aujourd'hui un acteur incontournable de la communication linguistique au Burkina Faso et dans la sous-région ouest-africaine."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative pl-6 border-l-4 border-orange"
            >
              <Quote className="absolute -top-2 -left-4 w-8 h-8 text-orange/20 bg-white" />
              <h3 className="font-display text-xl font-bold text-navy mb-3">Notre histoire</h3>
              <p className="text-navy-soft/85 leading-relaxed mb-3">
                VISION 2000 ELC est né d'une conviction simple : la maîtrise de l'anglais et la qualité de la
                traduction sont des leviers puissants de développement économique et professionnel,
                particulièrement en Afrique de l'Ouest. Ce que les outils automatisés ne pourront jamais
                remplacer, c'est la <strong className="text-navy">compréhension fine du contexte local</strong>,
                la <strong className="text-navy">relation de confiance</strong> avec un partenaire linguistique,
                et la <strong className="text-navy">valeur juridique</strong> d'une traduction certifiée.
              </p>
              <p className="text-navy-soft/85 leading-relaxed">
                Au fil des années, nous avons accompagné des ministères, des ONG internationales, des banques,
                des universités et des centaines de particuliers dans leurs enjeux de communication
                internationale. Chaque mission nous a renforcés dans notre conviction : l'expertise humaine
                reste irremplaçable.
              </p>
            </motion.div>

            {/* Photo du formateur en session */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-card border border-navy/8"
            >
              { }
              <img
                src="/formateur.jpg"
                alt="Formateur VISION 2000 ELC animant une session de formation"
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-deep/80 to-transparent p-4">
                <p className="text-cream text-sm font-medium">
                  Session de formation Business English à Ouagadougou
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-orange/5 rounded-2xl p-7 border border-orange/15"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-orange/15 text-orange flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy">Notre vision</h3>
              </div>
              <p className="text-navy-soft/85 leading-relaxed text-lg">
                Former une nouvelle génération de professionnels bilingues capables d'évoluer
                dans un monde globalisé, et demeurer le partenaire linguistique de référence
                des organisations qui font l'Afrique de demain.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-cream rounded-2xl p-7 border border-navy/8"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-crimson/10 text-crimson flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy">Notre mission</h3>
              </div>
              <p className="text-navy-soft/85 leading-relaxed">
                Aider les professionnels et les organisations du Burkina Faso et de la sous-région à
                communiquer efficacement dans un environnement international — par des formations
                pratiques, des traductions certifiées et une interprétation de conférence de niveau
                international, toujours portées par une équipe humaine expérimentée.
              </p>
            </motion.div>
          </div>

          {/* Colonne droite : Valeurs */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-cream rounded-3xl p-7 border border-navy/8 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy">Nos valeurs</h3>
                  <p className="text-xs text-navy-soft/70">Les piliers de notre engagement</p>
                </div>
              </div>

              <div className="space-y-3">
                {VALUES.map((v) => (
                  <div key={v.title} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-navy/5 hover:border-orange/20 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-extrabold text-xs shrink-0 border ${colorMap[v.color]}`}>
                      ✓
                    </div>
                    <div>
                      <div className="font-display font-bold text-navy text-sm">{v.title}</div>
                      <div className="text-xs text-navy-soft/75 leading-relaxed mt-0.5">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild className="w-full mt-6 bg-navy hover:bg-navy-soft text-cream font-semibold h-12">
                <Link href="/contact">
                  Devenir notre prochain client satisfait
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
