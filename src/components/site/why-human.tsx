'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldCheck, Brain, Globe2, Award, Lock, FileCheck, Zap, Heart, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "./services"

const HUMAN_ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: "Confidentialité absolue",
    text: "Vos documents ne quittent jamais notre équipe. Aucune donnée envoyée à un cloud d'IA, aucune fuite possible de vos informations stratégiques.",
    contrast: "L'IA publique entraîne ses modèles sur vos données.",
    color: "emerald",
  },
  {
    icon: Brain,
    title: "Nuance culturelle & contextuelle",
    text: "Un mot n'a pas le même sens à Ouagadougou, à Paris ou à New York. Nos linguistes maîtrisent les subtilités africaines, francophones et anglophones.",
    contrast: "L'IA traduit littéralement, sans comprendre le contexte local.",
    color: "orange",
  },
  {
    icon: Award,
    title: "Traductions certifiées",
    text: "Nos traductions sont valables auprès des administrations, ambassades, tribunaux et institutions internationales. Tampon, signature et engagement de qualité.",
    contrast: "Une traduction IA n'a aucune valeur juridique.",
    color: "navy",
  },
  {
    icon: Heart,
    title: "Relation humaine & conseil",
    text: "Un interlocuteur dédié qui comprend votre secteur, vos enjeux et votre ton. Vous parlez à un expert, pas à un chatbot.",
    contrast: "L'IA vous laisse seul face à un champ de texte.",
    color: "crimson",
  },
]

const COMPARISON = [
  { criteria: "Confidentialité des documents", human: true, ai: false },
  { criteria: "Traduction certifiée (valeur juridique)", human: true, ai: false },
  { criteria: "Compréhension du contexte local (Burkina, Afrique de l'Ouest)", human: true, ai: false },
  { criteria: "Interprétation simultanée en cabine", human: true, ai: false },
  { criteria: "Conseil personnalisé et suivi humain", human: true, ai: false },
  { criteria: "Respect des nuances culturelles et idiomatiques", human: true, ai: false },
  { criteria: "Vitesse (textes simples, brouillons)", human: false, ai: true },
  { criteria: "Coût quasi nul", human: false, ai: true },
]

const colorMap: Record<string, string> = {
  emerald: "text-emerald bg-emerald/10",
  orange: "text-orange bg-orange/10",
  navy: "text-navy bg-navy/10",
  crimson: "text-crimson bg-crimson/10",
}

export function WhyHuman() {
  return (
    <section id="pourquoi-humain" className="relative py-20 lg:py-28 gradient-navy text-cream overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-30" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-crimson/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow="Pourquoi Humain > IA"
          title={<>L'IA traduit les mots. <span className="gradient-text-orange">Nous traduisons le sens.</span></>}
          intro="Google Translate, ChatGPT et autres outils IA sont séduisants — gratuits, rapides, accessibles. Mais pour vos documents officiels, vos contrats, vos conférences et votre image professionnelle, ils présentent des risques majeurs. Voici pourquoi des centaines de professionnels, ONG et institutions continuent de nous confier leurs communications critiques."
        />

        {/* Avantages humains */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {HUMAN_ADVANTAGES.map((a, i) => {
            const Icon = a.icon
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 hover:bg-cream/10 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[a.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-cream mb-2">{a.title}</h3>
                <p className="text-sm text-cream/75 leading-relaxed mb-3">{a.text}</p>
                <div className="flex items-start gap-2 pt-3 border-t border-cream/10">
                  <X className="w-4 h-4 text-crimson mt-0.5 shrink-0" />
                  <p className="text-xs text-cream/55 italic">{a.contrast}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Tableau comparatif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 glass rounded-3xl p-6 sm:p-10 overflow-hidden"
        >
          <h3 className="font-display text-xl sm:text-2xl font-bold text-cream mb-6 text-center">
            Comparatif : Humain vs IA sur vos besoins critiques
          </h3>

          <div className="overflow-x-auto -mx-6 sm:-mx-10 px-6 sm:px-10">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-cream/15">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-cream/70">Critère</th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-emerald">
                    <div className="flex flex-col items-center gap-1">
                      <Heart className="w-5 h-5" />
                      VISION 2000 ELC (Humain)
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-cream/60">
                    <div className="flex flex-col items-center gap-1">
                      <Zap className="w-5 h-5" />
                      Outils IA publics
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.criteria} className={i % 2 === 0 ? "bg-cream/5" : ""}>
                    <td className="py-3 pr-4 text-sm text-cream/85 font-medium">{row.criteria}</td>
                    <td className="py-3 px-4 text-center">
                      {row.human ? (
                        <Check className="w-5 h-5 text-emerald mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-cream/30 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.ai ? (
                        <Check className="w-5 h-5 text-emerald/70 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-crimson mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-orange hover:bg-orange-deep text-white shadow-glow-orange font-bold h-14 px-7">
              <Link href="#contact">
                Discuter avec un expert humain
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-cream/70">
              <Lock className="w-4 h-4 text-emerald" />
              Vos documents restent confidentiels, toujours.
            </div>
          </div>
        </motion.div>

        {/* Bandeau de réassurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 grid sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Globe2, title: "Ancrage local", text: "Compréhension fine du Burkina Faso et de l'Afrique de l'Ouest" },
            { icon: FileCheck, title: "Engagement écrit", text: "Contrat de confidentialité signé pour chaque mission" },
            { icon: Award, title: "Certifié & reconnu", text: "Traductions acceptées par les administrations et ambassades" },
          ].map((b) => {
            const Icon = b.icon
            return (
              <div key={b.title} className="flex items-start gap-3 glass rounded-xl p-4">
                <Icon className="w-6 h-6 text-orange shrink-0" />
                <div>
                  <div className="font-semibold text-cream text-sm">{b.title}</div>
                  <div className="text-xs text-cream/65 mt-0.5">{b.text}</div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
