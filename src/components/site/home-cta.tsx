'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang } from "@/lib/lang-context"

export function HomeCTA() {
  const { t } = useLang()
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative gradient-orange rounded-3xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden"
        >
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
                {t("homecta.title")}
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                {t("homecta.text")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-white text-orange hover:bg-cream font-bold h-14 px-7 group">
                  <Link href="/contact">
                    {t("homecta.btn1")}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white font-semibold h-14 px-7">
                  <a href="tel:+22670462670">
                    <Phone className="w-5 h-5 mr-2" />
                    +226 70 46 26 70
                  </a>
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                {[
                  { v: "20+", l: t("homecta.stat1") },
                  { v: "1M+", l: t("homecta.stat2") },
                  { v: "24h", l: t("homecta.stat3") },
                  { v: "100%", l: t("homecta.stat4") },
                ].map((s) => (
                  <div key={s.l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/15">
                    <div className="font-display text-3xl font-extrabold">{s.v}</div>
                    <div className="text-xs text-white/80 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
