'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Globe, MessageCircle, Clock, Send, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { SectionHeading } from "./services"

const CONTACT_INFOS = [
  { icon: MapPin, label: "Adresse", value: "Koulouba, Ouagadougou", sub: "Burkina Faso", href: "https://maps.google.com/?q=Koulouba+Ouagadougou+Burkina+Faso" },
  { icon: Phone, label: "Téléphone", value: "+226 70 46 26 70", sub: "Lun-Sam : 8h - 18h", href: "tel:+22670462670" },
  { icon: Mail, label: "Email", value: "contact@vision2000elc.com", sub: "Réponse sous 2h ouvrées", href: "mailto:contact@vision2000elc.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "+226 70 46 26 70", sub: "Discussion instantanée", href: "https://wa.me/22670462670" },
]

const SUBJECTS = [
  "Demande de devis - Traduction",
  "Inscription à une formation",
  "Réservation interprétation",
  "Coaching linguistique",
  "Partenariat / Collaboration",
  "Autre demande",
]

export function Contact() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    await new Promise((r) => setTimeout(r, 1200))

    toast({
      title: "Message envoyé !",
      description: `Merci ${data.name || ""}. Nous vous recontactons très rapidement.`,
    })

    setSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="relative py-20 lg:py-28 gradient-navy text-cream overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-30" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow="Contact"
          title={<>Parlons de votre <span className="gradient-text-orange">projet linguistique</span></>}
          intro="Une traduction à faire ? Une formation à organiser ? Un événement à interpréter ? Écrivez-nous, appelez-nous ou passez nous voir à Koulouba. La première consultation est toujours gratuite."
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-8">
          {/* Coordonnées */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {CONTACT_INFOS.map((c, i) => {
                const Icon = c.icon
                const content = (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="glass rounded-2xl p-5 hover:bg-cream/10 transition-colors h-full"
                  >
                    <div className="w-11 h-11 rounded-xl bg-orange/15 text-orange flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs uppercase tracking-widest text-cream/55 font-semibold mb-1">{c.label}</div>
                    <div className="font-display font-bold text-cream text-sm sm:text-base break-words">{c.value}</div>
                    <div className="text-xs text-cream/60 mt-1">{c.sub}</div>
                  </motion.div>
                )
                return c.href ? (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
                    {content}
                  </a>
                ) : (
                  <div key={c.label}>{content}</div>
                )
              })}
            </div>

            {/* Carte / CTA WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald flex items-center justify-center animate-pulse-ring">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-cream">Discutons sur WhatsApp</h3>
                  <p className="text-xs text-cream/65">Réponse en quelques minutes pendant les heures ouvrables</p>
                </div>
              </div>
              <Button asChild className="w-full bg-emerald hover:bg-emerald/90 text-white font-bold h-12 shadow-lg">
                <a href="https://wa.me/22670462670" target="_blank" rel="noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ouvrir WhatsApp
                </a>
              </Button>
            </motion.div>

            {/* Horaires */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-orange" />
                <h3 className="font-display font-bold text-cream">Horaires d'ouverture</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-cream/80">
                  <span>Lundi - Vendredi</span>
                  <span className="font-semibold">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between text-cream/80">
                  <span>Samedi</span>
                  <span className="font-semibold">9h00 - 13h00</span>
                </div>
                <div className="flex justify-between text-cream/60">
                  <span>Dimanche</span>
                  <span className="font-semibold">Fermé</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white p-6 sm:p-8 shadow-card border-navy/8">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center shrink-0">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-navy">Envoyez-nous un message</h3>
                    <p className="text-sm text-navy-soft/70 mt-1">
                      Tous les champs sont obligatoires. Réponse garantie sous 2h ouvrées.
                    </p>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="c-name" className="text-sm font-semibold text-navy mb-1.5">
                        Nom et prénom <span className="text-crimson">*</span>
                      </Label>
                      <Input id="c-name" name="name" required placeholder="Ex : Aïcha Ouédraogo" className="h-11" />
                    </div>
                    <div>
                      <Label htmlFor="c-email" className="text-sm font-semibold text-navy mb-1.5">
                        Email <span className="text-crimson">*</span>
                      </Label>
                      <Input id="c-email" name="email" type="email" required placeholder="vous@exemple.com" className="h-11" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="c-phone" className="text-sm font-semibold text-navy mb-1.5">
                        Téléphone / WhatsApp <span className="text-crimson">*</span>
                      </Label>
                      <Input id="c-phone" name="phone" required placeholder="+226 ..." className="h-11" />
                    </div>
                    <div>
                      <Label htmlFor="c-subject" className="text-sm font-semibold text-navy mb-1.5">
                        Sujet <span className="text-crimson">*</span>
                      </Label>
                      <select
                        id="c-subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                      >
                        <option value="" disabled>Sélectionner</option>
                        {SUBJECTS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="c-message" className="text-sm font-semibold text-navy mb-1.5">
                      Votre message <span className="text-crimson">*</span>
                    </Label>
                    <Textarea
                      id="c-message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Décrivez votre projet, vos besoins, votre contexte, vos délais souhaités…"
                      className="resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2 text-xs text-navy-soft/70">
                    <input type="checkbox" id="c-consent" required className="mt-0.5 accent-orange" />
                    <label htmlFor="c-consent">
                      J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la politique de confidentialité de VISION 2000 ELC.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full bg-orange hover:bg-orange-deep text-white shadow-glow-orange font-bold h-14 text-base"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="w-5 h-5 ml-2" />
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
