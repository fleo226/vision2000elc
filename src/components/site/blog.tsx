'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "./services"

const ARTICLES = [
  {
    category: "Carrière",
    title: "Pourquoi apprendre l'anglais en 2026 ?",
    excerpt: "L'anglais n'est plus une option mais une compétence stratégique. Tour d'horizon des opportunités professionnelles qu'il débloque au Burkina Faso et en Afrique de l'Ouest.",
    date: "12 juin 2026",
    readTime: "5 min",
    color: "orange",
  },
  {
    category: "Certifications",
    title: "Les avantages du TOEIC pour votre carrière",
    excerpt: "Le TOEIC est la certification d'anglais la plus reconnue par les entreprises. Comment se préparer efficacement et quel score viser selon votre objectif professionnel.",
    date: "5 juin 2026",
    readTime: "7 min",
    color: "emerald",
  },
  {
    category: "Conseils",
    title: "Traduction ou interprétation : quelle différence ?",
    excerpt: "Ces deux métiers voisins ne s'appliquent pas aux mêmes situations. Guide pratique pour choisir la prestation adaptée à votre besoin de communication internationale.",
    date: "28 mai 2026",
    readTime: "4 min",
    color: "navy",
  },
  {
    category: "Professionnel",
    title: "Réussir une présentation professionnelle en anglais",
    excerpt: "Structure, vocabulaire, gestion du stress, supports visuels : la méthode complète pour livrer un pitch impactant devant un public anglophone.",
    date: "20 mai 2026",
    readTime: "8 min",
    color: "crimson",
  },
  {
    category: "Métiers",
    title: "Traduction & interprétation au XXIe siècle",
    excerpt: "Comment la profession évolue à l'ère de l'IA, et pourquoi l'expertise humaine reste irremplaçable pour les missions critiques. Le métier de linguiste de demain.",
    date: "10 mai 2026",
    readTime: "6 min",
    color: "gold",
  },
]

const colorMap: Record<string, string> = {
  orange: "bg-orange/10 text-orange",
  emerald: "bg-emerald/10 text-emerald",
  navy: "bg-navy/10 text-navy",
  crimson: "bg-crimson/10 text-crimson",
  gold: "bg-gold/10 text-gold",
}

export function Blog() {
  const [featured, ...rest] = ARTICLES

  return (
    <section id="blog" className="relative py-20 lg:py-28 bg-cream-warm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Blog & Conseils"
          title={<>Nos conseils pour <span className="gradient-text-orange">communiquer en anglais</span> avec aisance</>}
          intro="Articles, guides pratiques et retours d'expérience pour développer votre maîtrise de l'anglais professionnel, réussir vos certifications et comprendre les enjeux de la traduction."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {/* Article à la une */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <Card className="group h-full overflow-hidden bg-white shadow-soft hover:shadow-card transition-all border-navy/8">
              <div className={`h-56 sm:h-72 relative ${colorMap[featured.color].split(" ")[0]} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 pattern-grid opacity-30" />
                <BookOpen className={`w-24 h-24 ${colorMap[featured.color].split(" ")[1]} opacity-30`} />
                <Badge className={`absolute top-4 left-4 ${colorMap[featured.color]} border-0 font-semibold`}>
                  À la une
                </Badge>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 text-xs text-navy-soft/60 mb-3">
                  <Badge variant="outline" className="border-navy/15 text-navy-soft font-medium">{featured.category}</Badge>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime} de lecture</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-3 group-hover:text-orange transition-colors">
                  {featured.title}
                </h3>
                <p className="text-navy-soft/80 leading-relaxed mb-5">{featured.excerpt}</p>
                <Button asChild variant="ghost" className="px-0 hover:bg-transparent text-orange hover:text-orange font-semibold">
                  <Link href="#blog">
                    Lire l'article
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Autres articles */}
          {rest.slice(0, 3).map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="group h-full bg-white shadow-soft hover:shadow-card transition-all border-navy/8 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${colorMap[article.color]} border-0 font-semibold`}>{article.category}</Badge>
                    <span className="text-xs text-navy-soft/60 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy mb-2 group-hover:text-orange transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-navy-soft/75 leading-relaxed mb-3 line-clamp-3">{article.excerpt}</p>
                  <div className="text-xs text-navy-soft/55">{article.date}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="border-navy/15 text-navy hover:bg-navy hover:text-cream font-semibold h-12 px-7">
            <Link href="#blog">
              Voir tous les articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
