'use client'

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Users, BookOpen, Trophy, Briefcase, GraduationCap, Star } from "lucide-react"
import { SectionHeading } from "./services"

const PROGRAMS = {
  general: {
    label: "Anglais Général",
    icon: BookOpen,
    levels: [
      {
        name: "Débutant (A1-A2)",
        duration: "3-6 mois",
        students: "Max. 12 / classe",
        objectives: ["Vocabulaire de survie", "Conversations basiques", "Grammaire fondamentale", "Compréhension orale et écrite"],
        outcome: "Tenir une conversation simple et comprendre des messages courants.",
      },
      {
        name: "Intermédiaire (B1-B2)",
        duration: "4-6 mois",
        students: "Max. 12 / classe",
        objectives: ["Expression courante", "Compréhension de textes complexes", "Discussion d'idées abstraites", "Préparation aux interactions professionnelles"],
        outcome: "Communiquer avec aisance en voyage et dans la vie quotidienne.",
      },
      {
        name: "Avancé (C1-C2)",
        duration: "3-6 mois",
        students: "Max. 10 / classe",
        objectives: ["Maîtrise stylistique", "Nuances idiomatiques", "Présentations académiques", "Débats et argumentation"],
        outcome: "S'exprimer comme un locuteur natif dans tous les contextes.",
      },
    ],
  },
  pro: {
    label: "Anglais Professionnel",
    icon: Briefcase,
    levels: [
      {
        name: "Administration & Secrétariat",
        duration: "2-4 mois",
        students: "Individuel ou groupe",
        objectives: ["Emails et courriers pro", "Vocabulaire administratif", "Communications téléphoniques", "Comptes-rendus de réunion"],
        outcome: "Gérer la communication courante d'un bureau international.",
      },
      {
        name: "Finance & Banque",
        duration: "3-5 mois",
        students: "Individuel ou groupe",
        objectives: ["Terminologie financière", "Rapports annuels", "Négociations bancaires", "Présentations aux actionnaires"],
        outcome: "Évoluer dans un environnement financier anglophone.",
      },
      {
        name: "Commerce International",
        duration: "3-5 mois",
        students: "Individuel ou groupe",
        objectives: ["Incoterms & contrats", "Négociation fournisseurs", "Lettres de crédit", "Prospection à l'international"],
        outcome: "Conduire des opérations commerciales transfrontalières.",
      },
      {
        name: "ONG & Développement",
        duration: "2-4 mois",
        students: "Individuel ou groupe",
        objectives: ["Vocabulaire du développement", "Rédaction de rapports bailleurs", "Logframe & indicateurs", "Présentations de projets"],
        outcome: "Travailler avec les partenaires internationaux (USAID, UE, PNUD…).",
      },
    ],
  },
  certifs: {
    label: "Certifications",
    icon: Trophy,
    levels: [
      {
        name: "Préparation TOEIC",
        duration: "2-3 mois",
        students: "Cours particuliers ou groupe",
        objectives: ["Compréhension orale & écrite", "Stratégies de test", "Entraînement intensif", "Objectif 750+ points"],
        outcome: "Obtenir un score reconnu par les entreprises internationales.",
      },
      {
        name: "Préparation TOEFL",
        duration: "3-4 mois",
        students: "Cours particuliers ou groupe",
        objectives: ["Reading, Listening, Speaking, Writing", "Méthodologie spécifique", "Essais académiques", "Objectif 90+ points"],
        outcome: "Accéder aux universités anglophones du monde entier.",
      },
      {
        name: "Préparation IELTS",
        duration: "3-4 mois",
        students: "Cours particuliers ou groupe",
        objectives: ["Academic & General Training", "Stratégies par section", "Production orale et écrite", "Objectif 6.5+ bandes"],
        outcome: "Satisfaire aux exigences d'immigration et d'universités.",
      },
    ],
  },
}

const FORMAT_OPTIONS = [
  { icon: Users, title: "Cours en groupe", desc: "Petits groupes de 8 à 12 apprenants. Idéal pour progresser en interaction.", price: "À partir de 75 000 FCFA / module" },
  { icon: Star, title: "Cours particuliers", desc: "Suivi individualisé, progression rapide, horaires flexibles.", price: "À partir de 15 000 FCFA / heure" },
  { icon: Briefcase, title: "Formation en entreprise", desc: "Nous venons dans vos locaux, formation adaptée à votre secteur.", price: "Sur devis personnalisé" },
  { icon: GraduationCap, title: "Formation en ligne", desc: "Cours à distance via Zoom/Teams, supports numériques inclus.", price: "À partir de 60 000 FCFA / module" },
]

export function Formations() {
  const [tab, setTab] = useState("general")

  return (
    <section id="formations" className="relative py-20 lg:py-28 bg-cream-warm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nos Formations"
          title={<>Des parcours <span className="gradient-text-orange">structurés</span> pour chaque objectif</>}
          intro="Que vous prépariez le TOEIC, visiez une promotion internationale ou souhaitiez simplement voyager, nos programmes progressifs vous mènent du niveau débutant au niveau avancé — avec un suivi pédagogique personnalisé et des formateurs expérimentés."
        />

        <Tabs value={tab} onValueChange={setTab} className="mt-14">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-white shadow-soft p-1.5 h-auto flex-wrap">
              {Object.entries(PROGRAMS).map(([key, p]) => {
                const Icon = p.icon
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-orange data-[state=active]:text-white data-[state=active]:shadow-glow-orange px-4 sm:px-6 py-2.5 text-sm font-semibold flex items-center gap-2 rounded-lg"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{p.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {Object.entries(PROGRAMS).map(([key, program]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {program.levels.map((level, i) => (
                    <Card key={level.name} className="group relative overflow-hidden p-6 border-navy/8 shadow-soft hover:shadow-card transition-all bg-white">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 rounded-bl-full" />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="bg-orange/5 text-orange border-orange/20 font-semibold">
                            Niveau {i + 1}
                          </Badge>
                          <program.icon className="w-5 h-5 text-navy/30 group-hover:text-orange transition-colors" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-navy mb-3">{level.name}</h3>

                        <div className="flex flex-col gap-2 mb-4 text-sm text-navy-soft">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-orange" />
                            <span>{level.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-orange" />
                            <span>{level.students}</span>
                          </div>
                        </div>

                        <ul className="space-y-1.5 mb-4">
                          {level.objectives.map((o) => (
                            <li key={o} className="text-sm text-navy-soft/80 flex items-start gap-2">
                              <span className="text-emerald mt-0.5">✓</span>
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="bg-cream-warm rounded-lg p-3 mb-4 border-l-2 border-orange">
                          <div className="text-xs font-bold uppercase tracking-wide text-orange mb-1">Objectif final</div>
                          <p className="text-sm text-navy font-medium">{level.outcome}</p>
                        </div>

                        <Button asChild variant="outline" className="w-full group/btn border-orange/30 text-orange hover:bg-orange hover:text-white hover:border-orange font-semibold">
                          <Link href="/contact">
                            S'inscrire
                            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        {/* Formats */}
        <div className="mt-16">
          <h3 className="text-center font-display text-xl sm:text-2xl font-bold text-navy mb-8">
            Choisissez le format qui vous convient
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FORMAT_OPTIONS.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-5 shadow-soft border border-navy/8 hover:border-orange/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-navy mb-1">{f.title}</h4>
                  <p className="text-sm text-navy-soft/75 mb-3 leading-relaxed">{f.desc}</p>
                  <p className="text-xs font-semibold text-emerald">{f.price}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
