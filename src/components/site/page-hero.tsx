'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, ArrowLeft } from "lucide-react"

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  intro?: string
  breadcrumbs?: Breadcrumb[]
}

export function PageHero({ eyebrow, title, intro, breadcrumbs = [] }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden gradient-hero text-navy">
      <div className="absolute top-10 -left-20 w-72 h-72 bg-orange/12 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-emerald/8 rounded-full blur-3xl animate-blob animation-delay-2000" />

      <div className="relative container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs sm:text-sm text-navy-soft/70 mb-6"
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="hover:text-orange flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Accueil
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-navy-soft/40" />
                {b.href ? (
                  <Link href={b.href} className="hover:text-orange">{b.label}</Link>
                ) : (
                  <span className="text-navy font-medium">{b.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" />
            {eyebrow}
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-navy">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-navy-soft/80 leading-relaxed max-w-3xl">
              {intro}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
