'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site/header"
import { PageHero } from "@/components/site/page-hero"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"
import { TiltCard } from "@/components/site/effects"

const PHOTOS = [
  {
    src: "/formateur.jpg",
    title: "Session de formation Business English",
    desc: "Le formateur principal anime une session interactive avec apprenants.",
    category: "Formation",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/groupe-formation.jpg",
    title: "Groupe d'apprenants",
    desc: "Une promotion de professionnels en formation continue.",
    category: "Formation",
    span: "",
  },
  {
    src: "/salle-formation.jpg",
    title: "Salle de formation",
    desc: "Notre salle équipée à Koulouba, Ouagadougou.",
    category: "Locaux",
    span: "",
  },
  {
    src: "/traduction-bureau.jpg",
    title: "Service de traduction",
    desc: "Une linguiste au travail sur des documents professionnels.",
    category: "Traduction",
    span: "",
  },
  {
    src: "/traduction-documents.jpg",
    title: "Documents et matériel",
    desc: "Le matériel de traduction professionnelle : contrats, dictionnaires, loupe.",
    category: "Traduction",
    span: "",
  },
  {
    src: "/interpretation-materiel.jpg",
    title: "Matériel d'interprétation",
    desc: "Casque et micro de conférence pour l'interprétation simultanée.",
    category: "Interprétation",
    span: "lg:col-span-2",
  },
  {
    src: "/service-coaching.jpg",
    title: "Coaching linguistique",
    desc: "Bureau de travail pour séances de coaching individuel.",
    category: "Coaching",
    span: "",
  },
  {
    src: "/infographie-clients.png",
    title: "Nos secteurs clients",
    desc: "Infographie : ONG, banques, ministères, universités, entreprises, particuliers.",
    category: "Infographie",
    span: "",
  },
]

const CATEGORIES = ["Toutes", "Formation", "Traduction", "Interprétation", "Coaching", "Locaux", "Infographie"]

const colorMap: Record<string, string> = {
  Formation: "bg-orange/10 text-orange",
  Traduction: "bg-emerald/10 text-emerald",
  "Interprétation": "bg-crimson/10 text-crimson",
  Coaching: "bg-gold/10 text-gold",
  Locaux: "bg-navy/10 text-navy",
  Infographie: "bg-purple/10 text-purple",
}

export default function GaleriePage() {
  const [filter, setFilter] = useState("Toutes")
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = filter === "Toutes" ? PHOTOS : PHOTOS.filter(p => p.category === filter)

  const openLightbox = (i: number) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const next = () => setLightbox(prev => prev === null ? null : (prev + 1) % filtered.length)
  const prev = () => setLightbox(prev => prev === null ? null : (prev - 1 + filtered.length) % filtered.length)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Galerie"
          title={<>VISION 2000 ELC en <span className="gradient-text-orange">images</span></>}
          intro="Découvrez nos salles de formation, nos équipes en action, nos outils de travail et l'ambiance de notre centre à Koulouba, Ouagadougou."
          breadcrumbs={[{ label: "Galerie" }]}
        />

        {/* Filtres */}
        <section className="py-8 bg-cream-warm border-b border-navy/5">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    filter === cat
                      ? "bg-navy text-cream shadow-soft"
                      : "bg-white text-navy-soft hover:bg-navy/5 border border-navy/8"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grille galerie */}
        <section className="py-12 bg-cream">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[240px] gap-4">
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.src + i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-soft hover:shadow-card transition-all ${photo.span}`}
                  onClick={() => openLightbox(i)}
                  data-cursor="hover"
                >
                  <TiltCard intensity={5} className="h-full">
                    { }
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                    {/* Badge catégorie */}
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${colorMap[photo.category] || "bg-white/20 text-white"}`}>
                      {photo.category}
                    </div>

                    {/* Icône zoom */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>

                    {/* Titre + desc en bas */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-display font-bold text-base sm:text-lg leading-tight mb-1">{photo.title}</h3>
                      <p className="text-xs text-white/80 line-clamp-2">{photo.desc}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <Camera className="w-12 h-12 mx-auto text-navy-soft/30 mb-3" />
                <p className="text-navy-soft/70">Aucune photo dans cette catégorie pour le moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-cream-warm">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-3">
              Envie de visiter notre centre ?
            </h3>
            <p className="text-navy-soft/80 mb-6 max-w-2xl mx-auto">
              Passez nous voir à Koulouba, Ouagadougou. Nous vous accueillons du lundi au samedi pour découvrir nos formations et discuter de votre projet.
            </p>
            <Button asChild size="lg" className="bg-orange hover:bg-orange-deep text-white shadow-glow-orange font-bold">
              <a href="/contact">Prendre rendez-vous</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9995] bg-navy-deep/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Bouton fermer */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Précédent */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Suivant */}
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              aria-label="Suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              { }
              <img
                src={filtered[lightbox].src}
                alt={filtered[lightbox].title}
                className="w-full max-h-[75vh] object-contain rounded-2xl"
              />
              <div className="text-center mt-4 text-white">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${colorMap[filtered[lightbox].category] || "bg-white/20 text-white"}`}>
                  {filtered[lightbox].category}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold mb-1">{filtered[lightbox].title}</h3>
                <p className="text-sm text-white/70 max-w-2xl mx-auto">{filtered[lightbox].desc}</p>
                <p className="text-xs text-white/40 mt-2">{lightbox + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
