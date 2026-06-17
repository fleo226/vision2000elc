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

// ============================================================
// 11. TYPEWRITER — Texte qui tape tout seul
// ============================================================
export function Typewriter({ text, speed = 40, delay = 0, className, cursor = true }: {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursor?: boolean
}) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let i = 0
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(startTimer)
  }, [started, text, speed, delay])

  return (
    <span ref={ref} className={className}>
      {displayed}
      {cursor && started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-orange ml-0.5 align-middle"
        />
      )}
    </span>
  )
}

// ============================================================
// 12. SPOTLIGHT TEXT — Couleur qui suit le curseur
// ============================================================
export function SpotlightText({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [pos, setPos] = useState({ x: -200, y: -200 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      className={cn("relative inline-block", className)}
      style={{
        backgroundImage: `radial-gradient(circle 100px at ${pos.x}px ${pos.y}px, #F97316, transparent)`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
    >
      <span className="relative z-0" style={{ color: "#0B1F3A" }}>{children}</span>
      <span
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `radial-gradient(circle 100px at ${pos.x}px ${pos.y}px, #F97316, transparent 70%)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        {children}
      </span>
    </span>
  )
}

// ============================================================
// 13. FLIP CARD — Carte qui se retourne au survol
// ============================================================
export function FlipCard({ front, back, className }: {
  front: ReactNode
  back: ReactNode
  className?: string
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={cn("group relative h-full [perspective:1200px] cursor-pointer", className)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
      data-cursor="hover"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* Recto */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {front}
        </div>
        {/* Verso */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================
// 14. PARTICULES — Particules flottantes en arrière-plan
// ============================================================
export function Particles({ count = 30, className }: { count?: number; className?: string }) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      color: ["#F97316", "#10B981", "#F59E0B", "#DC2626"][Math.floor(Math.random() * 4)],
    }))
  )

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ============================================================
// 15. SHARE BUTTON — Bouton partager flottant
// ============================================================
export function ShareButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [pathname, setPathname] = useState(() => {
    if (typeof window !== "undefined") return window.location.href
    return ""
  })

  // Mettre à jour le pathname quand on change de page
  useEffect(() => {
    const handler = () => setPathname(window.location.href)
    window.addEventListener("popstate", handler)
    return () => window.removeEventListener("popstate", handler)
  }, [])

  const shareLinks = [
    {
      label: "WhatsApp",
      icon: "💬",
      href: `https://wa.me/?text=${encodeURIComponent("Découvrez VISION 2000 ELC : " + pathname)}`,
      color: "bg-emerald hover:bg-emerald/90",
    },
    {
      label: "Facebook",
      icon: "📘",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pathname)}`,
      color: "bg-[#1877F2] hover:bg-[#1877F2]/90",
    },
    {
      label: "LinkedIn",
      icon: "💼",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pathname)}`,
      color: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
    },
    {
      label: "Twitter",
      icon: "🐦",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent("VISION 2000 ELC — Centre de formation en anglais à Ouagadougou")}&url=${encodeURIComponent(pathname)}`,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
    },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pathname)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Copie impossible:", err)
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-card border border-navy/8 p-3 flex flex-col gap-1.5 min-w-[200px]"
          >
            <div className="text-xs font-bold uppercase tracking-wide text-navy-soft/60 px-2 pb-1.5 border-b border-navy/8">
              Partager cette page
            </div>
            {shareLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-semibold transition-colors ${link.color}`}
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-navy/5 hover:bg-navy/10 text-navy text-sm font-semibold transition-colors mt-1"
            >
              <span className="text-base">{copied ? "✓" : "🔗"}</span>
              {copied ? "Lien copié !" : "Copier le lien"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-navy text-cream shadow-card flex items-center justify-center hover:bg-navy-soft transition-colors"
        aria-label="Partager"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </motion.button>
    </div>
  )
}

// ============================================================
// 16. SECTION REVEAL — Révélation cinématographique au scroll
// ============================================================
export function SectionReveal({ children, className, bg }: { children: ReactNode; className?: string; bg?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      {children}
    </motion.section>
  )
}

// ============================================================
// 17. AUTO CAROUSEL — Carousel automatique avec pause au survol
// ============================================================
export function useAutoCarousel(length: number, interval = 5000) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (paused || length <= 1) return
    const timer = setInterval(() => {
      setDirection(1)
      setIdx(prev => (prev + 1) % length)
    }, interval)
    return () => clearInterval(timer)
  }, [paused, length, interval])

  const go = (dir: number) => {
    setDirection(dir)
    setIdx(prev => (prev + dir + length) % length)
  }

  const goTo = (i: number) => {
    setDirection(i > idx ? 1 : -1)
    setIdx(i)
  }

  return { idx, direction, paused, setPaused, go, goTo }
}
