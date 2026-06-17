'use client'

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calculator, FileText, Clock, ArrowRight, Sparkles, Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Grille tarifaire (en FCFA par mot)
const BASE_RATE = 80 // FCFA / mot (standard)
const DOC_TYPES = [
  { value: "general", label: "Document général", multiplier: 1.0 },
  { value: "administratif", label: "Document administratif", multiplier: 1.1 },
  { value: "technique", label: "Document technique", multiplier: 1.15 },
  { value: "juridique", label: "Document juridique", multiplier: 1.2 },
  { value: "financier", label: "Document financier", multiplier: 1.1 },
  { value: "website", label: "Site web / marketing", multiplier: 1.05 },
]
const DELIVERIES = [
  { value: "normal", label: "Normal (3-5 jours)", multiplier: 1.0, days: "3-5 jours" },
  { value: "express48", label: "Express 48h", multiplier: 1.25, days: "48 heures" },
  { value: "express24", label: "Express 24h", multiplier: 1.5, days: "24 heures" },
]

export function QuoteCalculator() {
  const [wordCount, setWordCount] = useState<number>(1000)
  const [docType, setDocType] = useState<string>("general")
  const [delivery, setDelivery] = useState<string>("normal")

  const calculation = useMemo(() => {
    const doc = DOC_TYPES.find(d => d.value === docType)!
    const del = DELIVERIES.find(d => d.value === delivery)!
    const basePrice = wordCount * BASE_RATE
    const finalPrice = Math.round(basePrice * doc.multiplier * del.multiplier)
    const deliveryDate = new Date()
    const addDays = delivery === "normal" ? 4 : delivery === "express48" ? 2 : 1
    deliveryDate.setDate(deliveryDate.getDate() + addDays)
    return {
      basePrice,
      finalPrice,
      docMultiplier: doc.multiplier,
      delMultiplier: del.multiplier,
      deliveryLabel: del.days,
      deliveryDate: deliveryDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }),
    }
  }, [wordCount, docType, delivery])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 text-orange text-xs font-bold uppercase tracking-widest mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Estimation instantanée
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy mb-3">
            Calculez votre devis en <span className="gradient-text-orange">2 secondes</span>
          </h2>
          <p className="text-navy-soft/70 max-w-2xl mx-auto">
            Estimez immédiatement le coût de votre traduction. Prix indicatifs — le devis définitif sera confirmé sous 2h ouvrées.
          </p>
        </div>

        <Card className="bg-white border-navy/8 shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Formulaire */}
            <div className="lg:col-span-3 p-6 sm:p-8 space-y-6">
              {/* Nombre de mots */}
              <div>
                <Label htmlFor="words" className="text-sm font-semibold text-navy mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange" />
                  Nombre de mots à traduire
                </Label>
                <Input
                  id="words"
                  type="number"
                  min="1"
                  max="100000"
                  value={wordCount}
                  onChange={(e) => setWordCount(Math.max(1, Math.min(100000, parseInt(e.target.value) || 1)))}
                  className="h-12 text-lg font-display font-bold"
                />
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={Math.min(wordCount, 10000)}
                  onChange={(e) => setWordCount(parseInt(e.target.value))}
                  className="w-full mt-3 accent-orange"
                />
                <div className="flex justify-between text-xs text-navy-soft/60 mt-1">
                  <span>100 mots</span>
                  <span>10 000+ mots</span>
                </div>
              </div>

              {/* Type de document */}
              <div>
                <Label className="text-sm font-semibold text-navy mb-2 block">Type de document</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DOC_TYPES.map(d => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setDocType(d.value)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all border ${
                        docType === d.value
                          ? "bg-orange text-white border-orange shadow-glow-orange"
                          : "bg-white text-navy-soft border-navy/10 hover:border-orange/30"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Délai */}
              <div>
                <Label className="text-sm font-semibold text-navy mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange" />
                  Délai souhaité
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {DELIVERIES.map(d => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setDelivery(d.value)}
                      className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all border ${
                        delivery === d.value
                          ? "bg-navy text-cream border-navy"
                          : "bg-white text-navy-soft border-navy/10 hover:border-navy/30"
                      }`}
                    >
                      <div>{d.label.split(" (")[0]}</div>
                      <div className="text-[10px] opacity-70 mt-0.5">
                        {d.value === "normal" ? "+0%" : d.value === "express48" ? "+25%" : "+50%"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Résultat */}
            <div className="lg:col-span-2 bg-gradient-to-br from-navy to-navy-soft p-6 sm:p-8 text-cream relative overflow-hidden">
              <div className="absolute inset-0 pattern-grid opacity-20" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange/15 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-orange" />
                  <span className="text-xs uppercase tracking-widest font-bold text-orange">Devis estimé</span>
                </div>

                <motion.div
                  key={calculation.finalPrice}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <div className="font-display text-4xl sm:text-5xl font-extrabold text-cream">
                    {calculation.finalPrice.toLocaleString("fr-FR")}
                    <span className="text-xl ml-1 text-cream/70">FCFA</span>
                  </div>
                  <div className="text-sm text-cream/70 mt-1">
                    soit environ <strong className="text-cream">{Math.round(calculation.finalPrice / wordCount)} FCFA/mot</strong>
                  </div>
                </motion.div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cream/70">Prix de base</span>
                    <span className="font-semibold">{calculation.basePrice.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/70">Type ({DOC_TYPES.find(d=>d.value===docType)?.label})</span>
                    <span className="font-semibold">×{calculation.docMultiplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/70">Délai ({DELIVERIES.find(d=>d.value===delivery)?.label.split(" (")[0]})</span>
                    <span className="font-semibold">×{calculation.delMultiplier}</span>
                  </div>
                  <div className="pt-3 border-t border-cream/15 flex justify-between">
                    <span className="text-cream/70 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Livraison
                    </span>
                    <span className="font-semibold text-cream capitalize">{calculation.deliveryDate}</span>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full bg-orange hover:bg-orange-deep text-white font-bold h-12 shadow-glow-orange">
                  <a href="#devis-form">
                    Demander ce devis
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>

                <div className="mt-4 flex items-start gap-2 text-xs text-cream/60">
                  <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>
                    Estimation indicative. Le devis définitif sera confirmé sous 2h ouvrées après examen du document.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
