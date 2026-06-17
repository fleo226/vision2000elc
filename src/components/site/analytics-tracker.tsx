'use client'

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

// Tracker analytics : enregistre les visites de pages et les clics
// Léger, asynchrone, non bloquant
export function AnalyticsTracker() {
  const pathname = usePathname()
  const sessionIdRef = useRef<string>("")
  const visitIdRef = useRef<string | null>(null)
  const enterTimeRef = useRef<number>(Date.now())

  // Génère ou récupère un sessionId persistant
  useEffect(() => {
    if (typeof window === "undefined") return

    let sid = sessionStorage.getItem("v2k_sid")
    if (!sid) {
      sid = `sid_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
      sessionStorage.setItem("v2k_sid", sid)
    }
    sessionIdRef.current = sid
  }, [])

  // Enregistre une visite à chaque changement de page
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!sessionIdRef.current || !pathname) return

    // Mettre à jour la durée de la visite précédente
    const updatePreviousVisit = async () => {
      if (visitIdRef.current) {
        const duration = Math.round((Date.now() - enterTimeRef.current) / 1000)
        try {
          await fetch("/api/track/visit", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: visitIdRef.current, duration }),
            keepalive: true,
          })
        } catch (e) {
          // silent fail
        }
      }
    }

    // Enregistrer la nouvelle visite
    const recordVisit = async () => {
      try {
        const res = await fetch("/api/track/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            path: pathname,
            referrer: document.referrer || null,
            userAgent: navigator.userAgent.slice(0, 200),
            language: navigator.language,
          }),
        })
        const data = await res.json()
        if (data.id) {
          visitIdRef.current = data.id
          enterTimeRef.current = Date.now()
        }
      } catch (e) {
        // silent fail
      }
    }

    updatePreviousVisit().then(recordVisit)

    // Enregistrer la durée au unload
    const handleUnload = () => {
      if (visitIdRef.current) {
        const duration = Math.round((Date.now() - enterTimeRef.current) / 1000)
        const blob = new Blob(
          [JSON.stringify({ id: visitIdRef.current, duration })],
          { type: "application/json" }
        )
        // sendBeacon pour fonctionner même si la page se ferme
        navigator.sendBeacon(
          "/api/track/visit?method=PATCH",
          blob
        )
      }
    }

    window.addEventListener("beforeunload", handleUnload)
    return () => {
      window.removeEventListener("beforeunload", handleUnload)
    }
  }, [pathname])

  // Tracker les clics sur les éléments importants
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleClick = async (e: MouseEvent) => {
      if (!sessionIdRef.current) return

      const target = e.target as HTMLElement
      if (!target) return

      // Remonter jusqu'à trouver un élément cliquable pertinent
      const clickable = target.closest(
        "a, button, [role=button], [data-track]"
      ) as HTMLElement | null
      if (!clickable) return

      // Identifier l'élément cliqué
      let element = "other"
      let label: string | null = null
      let href: string | null = null

      const tagName = clickable.tagName.toLowerCase()
      if (tagName === "a") {
        href = (clickable as HTMLAnchorElement).getAttribute("href")
        label = clickable.textContent?.trim().slice(0, 60) || null
        // Catégoriser
        if (href?.startsWith("tel:")) element = "phone"
        else if (href?.startsWith("mailto:")) element = "email"
        else if (href?.startsWith("https://wa.me")) element = "whatsapp"
        else if (href?.startsWith("http") && !href.includes(window.location.hostname))
          element = "external"
        else if (href?.startsWith("/contact") || href?.startsWith("#contact"))
          element = "cta-contact"
        else if (href?.startsWith("/formations")) element = "nav-formations"
        else if (href?.startsWith("/traduction")) element = "nav-traduction"
        else if (href?.startsWith("/interpretation")) element = "nav-interpretation"
        else if (href?.startsWith("/services")) element = "nav-services"
        else if (href?.startsWith("/a-propos")) element = "nav-about"
        else if (href?.startsWith("/blog")) element = "nav-blog"
        else if (href?.startsWith("/galerie")) element = "nav-gallery"
        else if (href?.startsWith("/pourquoi-humain")) element = "nav-why-human"
        else if (href?.startsWith("/temoignages")) element = "nav-testimonials"
        else if (href === "/" || href?.startsWith("/#")) element = "nav-home"
        else element = "link"
      } else if (tagName === "button") {
        label = clickable.textContent?.trim().slice(0, 60) || null
        const ariaLabel = clickable.getAttribute("aria-label") || ""
        if (ariaLabel === "Switch language") element = "toggle-lang"
        else if (ariaLabel === "Partager") element = "share"
        else if (label?.toLowerCase().includes("devis") || label?.toLowerCase().includes("quote"))
          element = "cta-devis"
        else if (label?.toLowerCase().includes("inscri") || label?.toLowerCase().includes("register"))
          element = "cta-formation"
        else if (label?.toLowerCase().includes("réserver") || label?.toLowerCase().includes("book"))
          element = "cta-book"
        else if (label?.toLowerCase().includes("envoyer") || label?.toLowerCase().includes("send"))
          element = "form-submit"
        else if (label?.toLowerCase().includes("télécharger") || label?.toLowerCase().includes("download"))
          element = "download"
        else element = "button"
      }

      // Envoyer le clic (non bloquant)
      try {
        fetch("/api/track/click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            path: window.location.pathname,
            element,
            label,
            href,
          }),
          keepalive: true,
        })
      } catch (e) {
        // silent fail
      }
    }

    document.addEventListener("click", handleClick, { capture: true })
    return () => document.removeEventListener("click", handleClick, { capture: true } as any)
  }, [])

  // Tracker la durée toutes les 30s (heartbeat pour les sessions longues)
  useEffect(() => {
    const heartbeat = setInterval(() => {
      if (visitIdRef.current && typeof window !== "undefined") {
        const duration = Math.round((Date.now() - enterTimeRef.current) / 1000)
        fetch("/api/track/visit", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: visitIdRef.current, duration }),
          keepalive: true,
        }).catch(() => {})
      }
    }, 30000) // 30 secondes

    return () => clearInterval(heartbeat)
  }, [])

  return null
}
