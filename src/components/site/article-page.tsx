'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Calendar, User, Tag, ArrowRight, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHero } from "./page-hero"

interface ArticleData {
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  color: string
  author?: string
  content: {
    type: "p" | "h2" | "h3" | "ul" | "quote" | "cta"
    text?: string
    items?: string[]
  }[]
}

const colorMap: Record<string, string> = {
  orange: "bg-orange/10 text-orange",
  emerald: "bg-emerald/10 text-emerald",
  navy: "bg-navy/10 text-navy",
  crimson: "bg-crimson/10 text-crimson",
  gold: "bg-gold/10 text-gold",
}

export function ArticlePage({ article }: { article: ArticleData }) {
  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: article.category }]}
      />

      {/* Méta + image */}
      <section className="py-8 bg-white border-b border-navy/5">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy-soft/70 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange" />
              {article.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange" />
              {article.readTime} de lecture
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-orange" />
              {article.author || "VISION 2000 ELC"}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange" />
              <Badge className={`${colorMap[article.color]} border-0`}>{article.category}</Badge>
            </div>
          </div>

          {/* Image à la une */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-card border border-navy/8"
          >
            { }
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/30 to-transparent" />
          </motion.div>

          {/* Extrait */}
          <div className="mt-8 p-6 bg-cream-warm/50 rounded-xl border-l-4 border-orange">
            <p className="font-display text-lg text-navy leading-relaxed font-medium italic">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Contenu de l'article */}
      <article className="py-12 bg-white">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose-custom">
            {article.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <motion.h2
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-2xl sm:text-3xl font-bold text-navy mt-10 mb-4 leading-tight"
                  >
                    {block.text}
                  </motion.h2>
                )
              }
              if (block.type === "h3") {
                return (
                  <h3 key={i} className="font-display text-xl font-bold text-navy mt-6 mb-3">
                    {block.text}
                  </h3>
                )
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="space-y-2 my-5">
                    {block.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-navy-soft/85 leading-relaxed">
                        <span className="text-orange mt-1 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={i} className="my-6 p-5 bg-orange/5 border-l-4 border-orange rounded-r-xl">
                    <p className="font-display text-lg italic text-navy leading-relaxed">
                      « {block.text} »
                    </p>
                  </blockquote>
                )
              }
              if (block.type === "cta") {
                return (
                  <Card key={i} className="my-8 p-6 bg-gradient-orange-soft border-orange/20">
                    <p className="text-navy font-display text-lg font-bold mb-3">{block.text}</p>
                    <Button asChild className="bg-orange hover:bg-orange-deep text-white font-bold">
                      <Link href="/contact">
                        Contactez-nous
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </Card>
                )
              }
              // Paragraphe par défaut
              return (
                <p key={i} className="text-navy-soft/85 leading-relaxed mb-5 text-base sm:text-lg">
                  {block.text}
                </p>
              )
            })}
          </div>

          {/* Partage social */}
          <div className="mt-12 pt-8 border-t border-navy/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-navy-soft flex items-center gap-1.5">
                <Share2 className="w-4 h-4" /> Partager :
              </span>
              <div className="flex gap-2">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Linkedin, label: "LinkedIn" },
                ].map(s => {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.label}
                      href="#"
                      aria-label={s.label}
                      className="w-9 h-9 rounded-lg bg-navy/5 text-navy-soft hover:bg-navy hover:text-cream flex items-center justify-center transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            </div>
            <Button asChild variant="outline" className="border-navy/15 text-navy hover:bg-navy hover:text-cream">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tous les articles
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* CTA bas */}
      <section className="py-12 bg-cream-warm">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-3">
            Besoin d'un coup de main pour votre anglais ?
          </h3>
          <p className="text-navy-soft/80 mb-6 max-w-2xl mx-auto">
            Nos formateurs et linguistes sont à votre disposition. Première consultation gratuite.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-orange hover:bg-orange-deep text-white shadow-glow-orange font-bold">
              <Link href="/contact">Demander un devis</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-navy/20 text-navy hover:bg-navy hover:text-cream">
              <Link href="/formations">Voir les formations</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
