'use client'

import { motion } from "framer-motion"
import { Download, FileText, GraduationCap, Mic } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const BROCHURES = [
  {
    title: "Catalogue Formations 2026",
    desc: "Programmes anglais général, professionnel et certifications (TOEIC, TOEFL, IELTS). Tarifs et formats.",
    file: "/brochure-formations.pdf",
    filename: "VISION2000-Formations-2026.pdf",
    icon: GraduationCap,
    color: "orange",
  },
  {
    title: "Tarifs Traduction",
    desc: "Grille tarifaire complète, processus en 6 étapes, garanties et domaine de spécialisation.",
    file: "/brochure-traduction.pdf",
    filename: "VISION2000-Traduction-2026.pdf",
    icon: FileText,
    color: "emerald",
  },
  {
    title: "Services Interprétation",
    desc: "Modes d'interprétation, domaines d'intervention, matériel inclus et conditions de réservation.",
    file: "/brochure-interpretation.pdf",
    filename: "VISION2000-Interpretation-2026.pdf",
    icon: Mic,
    color: "navy",
  },
]

const colorMap: Record<string, { bg: string; text: string }> = {
  orange: { bg: "bg-orange/10", text: "text-orange" },
  emerald: { bg: "bg-emerald/10", text: "text-emerald" },
  navy: { bg: "bg-navy/10", text: "text-navy" },
}

export function BrochureDownload() {
  return (
    <section className="py-16 bg-cream-warm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-bold uppercase tracking-widest mb-4">
            <Download className="w-3.5 h-3.5" />
            Documentation
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy mb-3">
            Téléchargez nos <span className="gradient-text-orange">brochures PDF</span>
          </h2>
          <p className="text-navy-soft/70 max-w-2xl mx-auto">
            Consultez nos catalogues détaillés à tout moment. Partagez-les avec votre équipe ou imprimez-les pour vos présentations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {BROCHURES.map((b, i) => {
            const Icon = b.icon
            const c = colorMap[b.color]
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="group h-full p-6 bg-white border-navy/8 shadow-soft hover:shadow-card transition-all flex flex-col">
                  <div className={`w-14 h-14 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy mb-2">{b.title}</h3>
                  <p className="text-sm text-navy-soft/75 leading-relaxed mb-5 flex-1">{b.desc}</p>
                  <Button asChild className={`${c.text} hover:text-white border-current hover:bg-current/90`} variant="outline">
                    <a href={b.file} download={b.filename} className="group/btn">
                      <Download className="w-4 h-4 mr-2 group-hover/btn:translate-y-0.5 transition-transform" />
                      Télécharger PDF
                    </a>
                  </Button>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
