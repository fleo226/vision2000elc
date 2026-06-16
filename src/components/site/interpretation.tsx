'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Mic, Headphones, Globe2, Building, Users, Gavel, Landmark, Flag, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "./services"

const DOMAINS = [
  { icon: Gavel, title: "Conférences internationales", text: "Sommet, congrès, conventions avec participants multilingues." },
  { icon: Landmark, title: "Réunions ministérielles", text: "Accompagnement de délégations officielles et gouvernementales." },
  { icon: Users, title: "Ateliers de formation", text: "Séminaires, workshops et formations professionnelles." },
  { icon: Flag, title: "Forums & missions diplomatiques", text: "Forums économiques, sommets régionaux, missions bilatérales." },
  { icon: Building, title: "Événements d'entreprise", text: "Lancements de produits, conventions internes, assemblées." },
  { icon: Headphones, title: "Missions de terrain", text: "Accompagnement d'experts, ONG et bailleurs sur le terrain." },
]

const LANGUAGES = [
  { source: "Français", target: "Anglais", flag: "🇫🇷 → 🇬🇧" },
  { source: "Anglais", target: "Français", flag: "🇬🇧 → 🇫🇷" },
]

const MODES = [
  {
    name: "Interprétation simultanée",
    desc: "Traduction en temps réel via cabine insonorisée et équipement audio. Le débit n'est pas ralenti. Idéale pour les conférences plénières, sommets et grands événements.",
    badge: "Le standard international",
    color: "orange",
  },
  {
    name: "Interprétation consécutive",
    desc: "L'orateur parle, puis s'interrompt pour que l'interprète traduise par segments. Idéale pour les réunions restreintes, entretiens, négociations et discours officiels.",
    badge: "Précision & flexibilité",
    color: "emerald",
  },
]

const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  orange: { bg: "bg-orange/10", text: "text-orange", badge: "bg-orange/10 text-orange" },
  emerald: { bg: "bg-emerald/10", text: "text-emerald", badge: "bg-emerald/10 text-emerald" },
}

export function Interpretation() {
  return (
    <section id="interpretation" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-orange/8 rounded-full blur-3xl animate-blob" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Interprétation"
          title={<>Vos événements <span className="gradient-text-orange">sans frontières linguistiques</span></>}
          intro="L'interprétation de conférence est un art qui exige des professionnels certifiés, une concentration extrême et une maîtrise parfaite des deux langues. Nos interprètes ont accompagné des sommets ministériels, des conférences internationales et des missions diplomatiques au Burkina Faso et dans la sous-région."
        />

        {/* Photo du matériel d'interprétation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 relative rounded-2xl overflow-hidden shadow-card border border-navy/8"
        >
          { }
          <img
            src="/interpretation-materiel.jpg"
            alt="Matériel d'interprétation de conférence professionnel VISION 2000 ELC"
            className="w-full h-56 sm:h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="p-6 sm:p-10 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange text-white text-xs font-bold uppercase tracking-widest mb-3">
                <Mic className="w-3 h-3" /> Matériel professionnel inclus
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-cream mb-2">
                Cabines, casques et coordination
              </h3>
              <p className="text-cream/85 text-sm sm:text-base">
                Nous fournissons le matériel technique complet et la logistique pour vos événements.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Modes */}
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {MODES.map((m, i) => {
            const c = colorMap[m.color]
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-navy/8 shadow-soft hover:shadow-card transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center`}>
                    <Mic className="w-7 h-7" />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${c.badge}`}>
                    {m.badge}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-navy mb-3">{m.name}</h3>
                <p className="text-navy-soft/80 leading-relaxed">{m.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Domaines d'intervention */}
        <div className="mt-16">
          <h3 className="text-center font-display text-2xl font-bold text-navy mb-8">
            Nos domaines d'intervention
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOMAINS.map((d, i) => {
              const Icon = d.icon
              return (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group bg-white rounded-xl p-5 border border-navy/8 shadow-soft hover:shadow-card hover:border-orange/30 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center shrink-0 group-hover:bg-orange group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-navy text-base mb-1">{d.title}</h4>
                      <p className="text-sm text-navy-soft/70 leading-relaxed">{d.text}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Langues + CTA */}
        <div className="mt-14 grid lg:grid-cols-2 gap-8 items-center">
          <div className="bg-cream rounded-2xl p-7 border border-navy/8">
            <div className="flex items-center gap-2 mb-5">
              <Globe2 className="w-5 h-5 text-orange" />
              <span className="text-xs uppercase tracking-widest font-bold text-orange">Langues couvertes</span>
            </div>
            <div className="space-y-3">
              {LANGUAGES.map((l) => (
                <div key={`${l.source}-${l.target}`} className="flex items-center justify-between bg-white rounded-lg p-4 border border-navy/5">
                  <div>
                    <div className="font-display font-bold text-navy text-lg">
                      {l.source} <span className="text-orange mx-1">↔</span> {l.target}
                    </div>
                    <div className="text-xs text-navy-soft/70">Bidirectionnel</div>
                  </div>
                  <div className="text-3xl">{l.flag}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-navy-soft/60 mt-4 italic">
              Autres combinaisons linguistiques sur demande ( Mooré, Dioula, etc.).
            </p>
          </div>

          <div className="bg-gradient-orange-soft rounded-2xl p-7 border border-orange/15">
            <h3 className="font-display text-2xl font-bold text-navy mb-3">
              Planifiez votre événement sereinement
            </h3>
            <p className="text-navy-soft/80 mb-6 leading-relaxed">
              Réservez vos interprètes dès maintenant. Nous fournissons également le matériel technique
              (cabines, casques, micros) et la coordination logistique complète.
            </p>
            <div className="space-y-3 mb-6">
              {[
                "Interprètes certifiés expérimentés",
                "Matériel technique inclus (cabines, casques)",
                "Coordination logistique complète",
                "Briefing pré-événement avec vos intervenants",
              ].map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald/20 text-emerald flex items-center justify-center shrink-0 font-bold">✓</div>
                  <span className="text-navy-soft">{p}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="w-full bg-orange hover:bg-orange-deep text-white shadow-glow-orange font-bold h-14">
              <Link href="/contact">
                Réserver un interprète
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
