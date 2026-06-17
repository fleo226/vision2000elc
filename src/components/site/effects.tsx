'use client'

import { useEffect, useState, useRef, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// ============================================================
// 1. LOADER — Écran de chargement animé avec logo
// ============================================================
export function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Disparaît après 1.8s ou au load complet
    const timer = setTimeout(() => setLoading(false), 1800)
    const onLoad = () => setLoading(false)
    if (document.readyState === "complete") onLoad()
    else window.addEventListener("load", onLoad)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("load", onLoad)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-navy-deep flex flex-col items-center justify-center"
        >
          {/* Cercles décoratifs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          {/* Logo animé */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-orange/40 shadow-2xl">
              { }
              <img src="/logo.jpeg" alt="VISION 2000 ELC" className="w-full h-full object-cover" />
            </div>
            {/* Anneau orbital animé */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border-2 border-orange/30 border-t-orange"
            />
          </motion.div>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative z-10 mt-8 text-center"
          >
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-cream tracking-tight">
              VISION <span className="text-crimson">2000</span> ELC
            </div>
            <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cream/60 mt-2 font-semibold">
              Formation · Traduction · Interprétation
            </div>
          </motion.div>

          {/* Barre de chargement */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "180px", opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
            className="relative z-10 mt-8 h-1 bg-cream/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-orange to-crimson rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================================
// 2. CURSEUR PERSONNALISÉ — Rond orange qui grandit au survol
// ============================================================
export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Désactiver sur mobile/touch
    if (typeof window === "undefined") return
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    // Marquer visible après le premier render (évite le warning set-state-in-effect)
    const raf = requestAnimationFrame(() => setIsVisible(true))

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      // Détecter si on survole un élément cliquable
      const target = e.target as HTMLElement
      const isClickable =
        target.closest("a, button, [role=button], input, textarea, select, label, [data-cursor=hover]")
      setIsHovering(!!isClickable)
    }

    const enter = () => setIsVisible(true)
    const leave = () => setIsVisible(false)

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseenter", enter)
    document.addEventListener("mouseleave", leave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseenter", enter)
      document.removeEventListener("mouseleave", leave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Cercle extérieur (suit avec léger délai) */}
      <motion.div
        animate={{
          x: position.x - (isHovering ? 24 : 16),
          y: position.y - (isHovering ? 24 : 16),
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.5 }}
        className="fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border-2 border-orange pointer-events-none mix-blend-difference"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      {/* Point central (suit instantanément) */}
      <motion.div
        animate={{ x: position.x - 3, y: position.y - 3 }}
        transition={{ type: "spring", damping: 40, stiffness: 800 }}
        className="fixed top-0 left-0 z-[9998] w-1.5 h-1.5 rounded-full bg-orange pointer-events-none"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  )
}

// ============================================================
// 3. BARRE DE PROGRESSION DE SCROLL
// ============================================================
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      setProgress(total > 0 ? (current / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent"
      style={{ transformOrigin: "0%" }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-orange via-orange-deep to-crimson"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  )
}

// ============================================================
// 4. TRANSITION DE PAGE — Voile fluide entre routes
// ============================================================
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Voile orange qui se déploie lors du changement de page
export function RouteChangeOverlay() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname
      // Déclencher la transition de façon asynchrone (évite set-state-in-effect)
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true)
        setTimeout(() => setIsTransitioning(false), 400)
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ scaleY: 0, transformOrigin: "bottom" }}
          animate={{ scaleY: 1, transformOrigin: "bottom" }}
          exit={{ scaleY: 0, transformOrigin: "top" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9990] bg-gradient-to-br from-orange to-orange-deep pointer-events-none"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/40"
            >
              { }
              <img src="/logo.jpeg" alt="" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================================
// 5. TILT CARD — Effet 3D au survol
// ============================================================
export function TiltCard({ children, className, intensity = 8 }: { children: ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("")

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rotateX = -y * intensity
    const rotateY = x * intensity
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
  }

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={cn(className, "[transform-style:preserve-3d]")}
    >
      {children}
    </div>
  )
}

// ============================================================
// 6. REVEAL TEXT — Animation lettre par lettre
// ============================================================
export function RevealText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ")
  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <motion.span
              key={`${wi}-${ci}`}
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: delay + (wi * 0.05) + (ci * 0.02),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
              style={{ transformOrigin: "bottom" }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

// ============================================================
// 7. MAGNETIC BUTTON — Bouton aimanté au curseur
// ============================================================
export function MagneticButton({ children, className, as, href, onClick, type = "button" }: {
  children: ReactNode
  className?: string
  as?: "button" | "a"
  href?: string
  onClick?: () => void
  type?: "button" | "submit"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 })

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", damping: 15, stiffness: 200, mass: 0.3 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )

  if (as === "a" && href) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {content}
    </button>
  )
}

// ============================================================
// 8. PARALLAX — Effet parallax sur élément au scroll
// ============================================================
export function Parallax({ children, speed = 0.3, className }: { children: ReactNode; speed?: number; className?: string }) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      // Distance du centre de l'élément au centre de la fenêtre
      const distance = rect.top + rect.height / 2 - windowH / 2
      setOffset(distance * speed * -1)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [speed])

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div style={{ transform: `translateY(${offset}px)`, transition: "transform 0.1s ease-out" }}>
        {children}
      </div>
    </div>
  )
}

// ============================================================
// 9. REVEAL ON SCROLL — Révélation au scroll
// ============================================================
export function RevealOnScroll({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// 10. COMPTEUR ANIMÉ AVANCÉ
// ============================================================
export function AnimatedCounter({ value, suffix = "", format = "default", duration = 2000, className }: {
  value: number
  suffix?: string
  format?: "default" | "compact"
  duration?: number
  className?: string
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(value * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, value, duration])

  const formatted =
    format === "compact" && display >= 1000
      ? display >= 1000000
        ? `${(display / 1000000).toFixed(display % 1000000 === 0 ? 0 : 1)}M`
        : `${(display / 1000).toFixed(display % 1000 === 0 ? 0 : 0)}K`
      : display.toLocaleString("fr-FR")

  return (
    <span ref={ref} className={className}>
      {formatted}
      <span className="text-orange">{suffix}</span>
    </span>
  )
}
