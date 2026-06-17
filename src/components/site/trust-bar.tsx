'use client'

import { motion } from "framer-motion"
import { Building2, Landmark, HeartHandshake, GraduationCap, Banknote, Users } from "lucide-react"
import { useLang } from "@/lib/lang-context"

const CLIENTS = [
  { icon: Landmark, labelKey: "trustbar.ministries", shortKey: "trustbar.ministries" },
  { icon: Building2, labelKey: "trustbar.companies", shortKey: "trustbar.companies" },
  { icon: HeartHandshake, labelKey: "trustbar.ngo", shortKey: "trustbar.ngo" },
  { icon: Banknote, labelKey: "trustbar.banks", shortKey: "trustbar.banks" },
  { icon: GraduationCap, labelKey: "trustbar.universities", shortKey: "trustbar.universities" },
  { icon: Users, labelKey: "trustbar.individuals", shortKey: "trustbar.individuals" },
]

export function TrustBar() {
  const { t } = useLang()
  return (
    <section className="relative -mt-2 py-12 bg-cream border-b border-navy/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-navy-soft/60 mb-8"
        >
          {t("trustbar.label")}
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CLIENTS.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.shortKey}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-navy/8 shadow-soft flex items-center justify-center text-navy group-hover:text-orange group-hover:border-orange/30 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-navy-soft leading-tight max-w-[110px]">
                  {t(c.shortKey)}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
