'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, Clock, Shield, CheckCircle2, AlertTriangle, ArrowRight, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { SectionHeading } from "./services"

const STEPS = [
  {
    n: "01",
    icon: Upload,
    title: "Téléchargez vos documents",
    text: "Envoyez vos fichiers (PDF, Word, Excel, scannés) via le formulaire ci-dessous. Tout est chiffré et confidentiel.",
  },
  {
    n: "02",
    icon: FileText,
    title: "Recevez un devis gratuit",
    text: "Sous 2h ouvrées, nous analysons votre document et vous envoyons un devis précis : nombre de mots, délai, tarif.",
  },
  {
    n: "03",
    icon: CheckCircle2,
    title: "Recevez votre traduction",
    text: "Notre linguiste traduit, révise et livre votre document dans les délais convenus. Option express en 24-48h.",
  },
]

const GUARANTEES = [
  { icon: Shield, label: "Confidentialité garantie", desc: "Contrat NDA disponible sur demande" },
  { icon: Clock, label: "Respect strict des délais", desc: "98% de livraisons à l'heure" },
  { icon: CheckCircle2, label: "Révision incluse", desc: "Chaque traduction est relue par un second linguiste" },
  { icon: Zap, label: "Service Express 24h", desc: "Pour vos urgences, livraison prioritaire" },
]

export function Translation() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    // Simuler l'envoi du devis
    await new Promise((r) => setTimeout(r, 1200))

    toast({
      title: "Demande de devis envoyée !",
      description: `Merci ${data.name || ""}. Nous vous répondons sous 2h ouvrées au ${data.phone || "numéro fourni"}.`,
    })

    setSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="traduction" className="relative py-20 lg:py-28 bg-cream">
      <div className="absolute inset-0 pattern-dots opacity-50" />
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Traduction en ligne"
          title={<>Traduisez vos documents <span className="gradient-text-orange">en quelques clics</span></>}
          intro="Un service 100% en ligne, rapide, sécurisé et accessible partout dans le monde. Téléchargez vos documents, recevez un devis gratuit sous 2h, et obtenez une traduction professionnelle révisée par nos linguistes."
        />

        {/* Process en 3 étapes */}
        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <Card className="p-6 bg-white shadow-soft border-navy/8 h-full relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-7xl font-display font-extrabold text-orange/8 select-none">
                    {s.n}
                  </div>
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-orange/10 text-orange flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy mb-2">{s.title}</h3>
                    <p className="text-sm text-navy-soft/80 leading-relaxed">{s.text}</p>
                  </div>
                </Card>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-orange/40 -translate-y-1/2 z-10" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Garanties */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {GUARANTEES.map((g, i) => {
            const Icon = g.icon
            return (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-navy text-cream rounded-xl p-4 flex items-start gap-3"
              >
                <Icon className="w-6 h-6 text-emerald shrink-0" />
                <div>
                  <div className="font-semibold text-sm">{g.label}</div>
                  <div className="text-xs text-cream/65 mt-0.5">{g.desc}</div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Formulaire de devis */}
        <div className="mt-12 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <Badge className="bg-crimson/10 text-crimson border-crimson/20 hover:bg-crimson/10 mb-3">
                <AlertTriangle className="w-3 h-3 mr-1.5" /> Service Express
              </Badge>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-navy leading-tight mb-4">
                Besoin d'une traduction <span className="text-crimson">urgente</span> ?
              </h3>
              <p className="text-navy-soft/80 leading-relaxed mb-6">
                Notre service <strong>Express</strong> garantit une livraison prioritaire sous{" "}
                <strong className="text-crimson">24 à 48 heures</strong> selon le volume. Idéal pour vos dossiers de
                visa, appels d'offres, contrats à signer et communications de crise.
              </p>

              <div className="space-y-4">
                <ContactItem label="Email" value="contact@vision2000elc.com" href="mailto:contact@vision2000elc.com" />
                <ContactItem label="WhatsApp / Téléphone" value="+226 70 46 26 70" href="https://wa.me/22670462670" />
                <ContactItem label="Adresse" value="Koulouba, Ouagadougou, Burkina Faso" />
              </div>

              <div className="mt-6 p-4 bg-emerald/5 border-l-4 border-emerald rounded-r-lg">
                <p className="text-sm text-navy-soft">
                  <strong className="text-emerald">💡 Astuce :</strong> Pour un devis encore plus rapide, indiquez dans
                  votre message le nombre approximatif de mots et le type de document.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 sm:p-8 bg-white shadow-card border-navy/8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy">Obtenez votre devis gratuit</h3>
                    <p className="text-sm text-navy-soft/70">Réponse sous 2h ouvrées. Sans engagement.</p>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Nom et prénom" id="name" required placeholder="Ex : Aïcha Ouédraogo" />
                    <Field label="Email" id="email" type="email" required placeholder="vous@exemple.com" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Téléphone / WhatsApp" id="phone" required placeholder="+226 ..." />
                    <div>
                      <Label htmlFor="source" className="text-sm font-semibold text-navy mb-1.5">
                        Langue source
                      </Label>
                      <select
                        id="source"
                        name="source"
                        required
                        defaultValue=""
                        className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                      >
                        <option value="" disabled>Sélectionner</option>
                        <option>Français</option>
                        <option>Anglais</option>
                        <option>Autre (préciser dans le message)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="target" className="text-sm font-semibold text-navy mb-1.5">
                      Langue cible
                    </Label>
                    <select
                      id="target"
                      name="target"
                      required
                      defaultValue=""
                      className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                    >
                      <option value="" disabled>Sélectionner</option>
                      <option>Anglais</option>
                      <option>Français</option>
                      <option>Autre (préciser dans le message)</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="document" className="text-sm font-semibold text-navy mb-1.5">
                      Télécharger le document (optionnel)
                    </Label>
                    <label htmlFor="document" className="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-lg border-2 border-dashed border-navy/15 hover:border-orange hover:bg-orange/5 cursor-pointer transition-colors text-center">
                      <Upload className="w-6 h-6 text-navy-soft/60" />
                      <span className="text-sm text-navy-soft/70">
                        <strong className="text-orange">Cliquez pour télécharger</strong> ou glissez vos fichiers
                      </span>
                      <span className="text-xs text-navy-soft/50">PDF, DOCX, XLSX · 10 Mo max</span>
                    </label>
                    <input id="document" name="document" type="file" className="sr-only" />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-semibold text-navy mb-1.5">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Type de document, nombre de mots approximatif, délai souhaité, contexte…"
                      className="resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-navy-soft/70">
                    <Shield className="w-5 h-5 text-emerald shrink-0" />
                    <span>Vos données sont confidentielles et ne seront jamais partagées avec un tiers.</span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full bg-orange hover:bg-orange-deep text-white shadow-glow-orange font-bold h-14 text-base"
                  >
                    {submitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Obtenir mon devis gratuit
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, id, type = "text", required, placeholder }: { label: string; id: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-semibold text-navy mb-1.5">
        {label} {required && <span className="text-crimson">*</span>}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11"
      />
    </div>
  )
}

function ContactItem({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream-warm transition-colors">
      <div className="w-10 h-10 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0">
        <FileText className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-navy-soft/60 uppercase tracking-wide font-semibold">{label}</div>
        <div className="text-navy font-medium truncate">{value}</div>
      </div>
    </div>
  )
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{content}</a> : content
}
