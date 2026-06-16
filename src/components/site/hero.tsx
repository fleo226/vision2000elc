'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Star, ShieldCheck, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden gradient-hero text-cream"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pattern-grid opacity-40" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-orange/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-crimson/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Colonne gauche */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cream text-xs sm:text-sm font-medium mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
              </span>
              Plus de 20 ans d'expertise humaine à Ouagadougou
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
            >
              Maîtrisez l'anglais.
              <br />
              <span className="gradient-text-orange">Communiquez</span> avec le monde.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-cream/80 max-w-2xl leading-relaxed"
            >
              Depuis plus de 20 ans, <strong className="text-cream">VISION 2000 ELC</strong> accompagne particuliers,
              entreprises, ONG, banques et institutions au Burkina Faso dans la{" "}
              <strong className="text-cream">formation en anglais</strong>, la{" "}
              <strong className="text-cream">traduction professionnelle</strong> et l'
              <strong className="text-cream">interprétation de conférences</strong> — par des humains, pour des humains.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="bg-orange hover:bg-orange-deep text-white shadow-glow-orange font-bold text-base h-14 px-7 group"
              >
                <Link href="#contact">
                  Demander un devis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-cream/30 text-cream hover:bg-cream/10 hover:text-cream font-semibold text-base h-14 px-7"
              >
                <Link href="#formations">
                  S'inscrire à une formation
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-cream hover:bg-cream/10 hover:text-cream font-semibold text-base h-14 px-7"
              >
                <a href="tel:+22670462670">
                  <Phone className="w-5 h-5 mr-2" />
                  +226 70 46 26 70
                </a>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            >
              <div className="flex items-center gap-2 text-cream/85">
                <ShieldCheck className="w-5 h-5 text-emerald" />
                <span>Confidentialité garantie</span>
              </div>
              <div className="flex items-center gap-2 text-cream/85">
                <Clock className="w-5 h-5 text-orange" />
                <span>Livraison express 24-48h</span>
              </div>
              <div className="flex items-center gap-2 text-cream/85">
                <Sparkles className="w-5 h-5 text-gold" />
                <span>100% humain & certifié</span>
              </div>
              <div className="flex items-center gap-1.5 text-cream/85">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <span>Clients satisfaits depuis 2003</span>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite - Carte de preuve */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              {/* Carte principale */}
              <div className="relative glass rounded-3xl p-7 shadow-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-cream/60 font-semibold mb-1">
                      Notoriété
                    </div>
                    <div className="text-3xl font-display font-extrabold text-cream">20+ ans</div>
                    <div className="text-sm text-cream/70">d'expertise linguistique</div>
                  </div>
                  { }
                  <img src="/logo.jpeg" alt="VISION 2000 ELC" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-orange/40" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Mots traduits" value="1M+" tone="orange" />
                  <Stat label="Pros formés" value="Centaines" tone="emerald" />
                  <Stat label="Conférences" value="Internat." tone="gold" />
                  <Stat label="Clients" value="ONG · États" tone="cream" />
                </div>

                <div className="mt-6 pt-6 border-t border-cream/15">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[
                        "bg-orange",
                        "bg-emerald",
                        "bg-crimson",
                        "bg-gold",
                      ].map((c, i) => (
                        <div key={i} className={`w-9 h-9 rounded-full ${c} ring-2 ring-navy-deep/60 flex items-center justify-center text-white font-bold text-xs`}>
                          {["ON", "BN", "M", "I"][i]}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-cream">Ils nous font confiance</div>
                      <div className="text-cream/60 text-xs">ONG, banques, ministères, entreprises</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge flottant */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-3 sm:-right-5 bg-emerald text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Humain
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-3 sm:-left-5 bg-crimson text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" />
                Express 24h
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-cream" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)" }} />
    </section>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "orange" | "emerald" | "gold" | "cream" }) {
  const toneClasses = {
    orange: "text-orange",
    emerald: "text-emerald",
    gold: "text-gold",
    cream: "text-cream",
  }
  return (
    <div className="rounded-xl bg-cream/5 border border-cream/10 p-3">
      <div className={`text-lg font-display font-bold ${toneClasses[tone]}`}>{value}</div>
      <div className="text-[11px] text-cream/60 leading-tight">{label}</div>
    </div>
  )
}
