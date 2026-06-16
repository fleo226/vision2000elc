'use client'

import { useState, useEffect } from "react"
import { MessageCircle, X, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function FloatingActions() {
  const [open, setOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* Bouton retour en haut */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-navy text-cream shadow-lg flex items-center justify-center hover:bg-navy-soft transition-all",
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Retour en haut"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Bouton WhatsApp + panneau */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Panneau chat */}
        {open && (
          <div className="bg-white rounded-2xl shadow-2xl border border-navy/10 w-[320px] max-w-[calc(100vw-3rem)] overflow-hidden">
            <div className="bg-emerald text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  { }
                  <img src="/logo.jpeg" alt="VISION 2000 ELC" className="w-10 h-10 rounded-full object-cover ring-2 ring-white/40" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald border-2 border-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm">VISION 2000 ELC</div>
                  <div className="text-xs text-white/80">Répond en quelques minutes</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-cream-warm">
              <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-soft text-sm text-navy max-w-[85%]">
                👋 Bonjour ! Je suis l'équipe de VISION 2000 ELC.
                <br /><br />
                Comment pouvons-nous vous aider aujourd'hui ? Traduction, formation, interprétation ?
              </div>
              <div className="text-[10px] text-navy-soft/50 text-right mt-1">à l'instant</div>
            </div>
            <div className="p-3 bg-white border-t border-navy/5">
              <a
                href="https://wa.me/22670462670?text=Bonjour%20VISION%202000%20ELC,%20je%20souhaite%20des%20informations%20sur%20vos%20services."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-emerald hover:bg-emerald/90 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Ouvrir la conversation
              </a>
            </div>
          </div>
        )}

        {/* Bouton principal */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative w-14 h-14 rounded-full bg-emerald hover:bg-emerald/90 text-white shadow-2xl flex items-center justify-center transition-all hover:scale-105"
          aria-label="Ouvrir le chat WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-emerald animate-ping opacity-30" />
          {open ? <X className="w-6 h-6 relative" /> : <MessageCircle className="w-7 h-7 relative" />}
          {!open && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-crimson text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              1
            </span>
          )}
        </button>
      </div>
    </>
  )
}
