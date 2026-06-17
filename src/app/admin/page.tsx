'use client'

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Lock, LogOut, Mail, Phone, Clock, Trash2, CheckCircle2, Inbox, FileText,
  GraduationCap, Loader2, Eye, EyeOff, Download, Users, MousePointerClick,
  TrendingUp, Activity, Globe, MapPin, Star, ChevronRight, RefreshCw,
} from "lucide-react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site/header"
import { Footer } from "@/components/site/footer"

const ADMIN_PASSWORD = "vision2000admin"

type Submission = {
  id: string
  type: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string | null
  sourceLang: string | null
  targetLang: string | null
  wordCount: number | null
  docType: string | null
  delivery: string | null
  estimatedPrice: number | null
  formation: string | null
  status: string
  createdAt: string
}

type Analytics = {
  visits: { today: number; week: number; month: number; total: number }
  visitors: { today: number; week: number; month: number; total: number }
  onlineNow: number
  avgDuration: number
  topPages: { path: string; count: number }[]
  topClicks: { element: string; label: string | null; count: number }[]
  visitsByDay: { date: string; count: number }[]
  clicksByDay: { date: string; count: number }[]
  referrers: { source: string; count: number }[]
  submissions: { new: number; total: number }
}

const COLORS = ["#F97316", "#10B981", "#0B1F3A", "#DC2626", "#F59E0B", "#8B5CF6", "#06B6D4"]

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(false)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  const [tab, setTab] = useState<"submissions" | "analytics">("submissions")
  const [selected, setSelected] = useState<Submission | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_authed")
    if (stored === "true") setAuthed(true)
  }, [])

  const fetchAnalytics = useCallback(async () => {
    setAnalyticsLoading(true)
    try {
      const res = await fetch("/api/analytics", {
        headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
      })
      const data = await res.json()
      if (data.visits) setAnalytics(data)
    } catch (err) {
      console.error("Erreur analytics:", err)
    } finally {
      setAnalyticsLoading(false)
    }
  }, [])

  const fetchSubmissions = useCallback(async () => {
    setLoading(true)
    try {
      const url = filter !== "all" ? `/api/submissions?type=${filter}` : "/api/submissions"
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
      })
      const data = await res.json()
      if (data.submissions) setSubmissions(data.submissions)
    } catch (err) {
      console.error("Erreur fetch:", err)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    if (authed) {
      fetchSubmissions()
      fetchAnalytics()
    }
  }, [authed, fetchSubmissions, fetchAnalytics])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      sessionStorage.setItem("admin_authed", "true")
      setError("")
    } else {
      setError("Mot de passe incorrect")
    }
  }

  const handleLogout = () => {
    setAuthed(false)
    sessionStorage.removeItem("admin_authed")
    setPassword("")
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/submissions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ADMIN_PASSWORD}`,
        },
        body: JSON.stringify({ id, status }),
      })
      fetchSubmissions()
      fetchAnalytics()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm("Supprimer définitivement cette soumission ?")) return
    try {
      await fetch(`/api/submissions?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${ADMIN_PASSWORD}` },
      })
      fetchSubmissions()
      fetchAnalytics()
      setSelected(null)
    } catch (err) {
      console.error(err)
    }
  }

  const exportCSV = () => {
    const headers = ["Type", "Nom", "Email", "Téléphone", "Sujet", "Message", "Langue source", "Langue cible", "Nb mots", "Type doc", "Délai", "Prix estimé (FCFA)", "Formation", "Statut", "Date"]
    const rows = submissions.map(s => [
      s.type, s.name, s.email, s.phone || "", s.subject || "", (s.message || "").replace(/"/g, '""'),
      s.sourceLang || "", s.targetLang || "", s.wordCount || "", s.docType || "", s.delivery || "",
      s.estimatedPrice || "", s.formation || "", s.status, new Date(s.createdAt).toLocaleString("fr-FR")
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n")
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vision2000-submissions-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ============= ÉCRAN DE CONNEXION =============
  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
          <Card className="w-full max-w-md p-8 bg-white shadow-card border-navy/8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-navy/10 text-navy flex items-center justify-center mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="font-display text-2xl font-bold text-navy mb-2">Espace Administration</h1>
              <p className="text-sm text-navy-soft/70">
                Accès réservé. Entrez le mot de passe pour consulter les statistiques et demandes.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-navy mb-1.5 block">Mot de passe</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-soft/60 hover:text-navy"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="bg-crimson/10 text-crimson text-sm p-3 rounded-lg border border-crimson/20">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full bg-orange hover:bg-orange-deep text-white font-bold h-12 shadow-glow-orange">
                Se connecter
              </Button>
            </form>
            <div className="mt-6 pt-6 border-t border-navy/8 text-center">
              <p className="text-xs text-navy-soft/60">
                Mot de passe par défaut : <code className="bg-cream-warm px-1.5 py-0.5 rounded font-mono">vision2000admin</code>
              </p>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  // ============= DASHBOARD =============
  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === "new").length,
    contact: submissions.filter(s => s.type === "contact").length,
    quote: submissions.filter(s => s.type === "quote").length,
    formation: submissions.filter(s => s.type === "formation").length,
  }

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}m ${s}s`
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <SiteHeader />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-navy">Dashboard</h1>
              <p className="text-navy-soft/70 mt-1">
                Vue d'ensemble du site — visites, clics et demandes
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={() => { fetchSubmissions(); fetchAnalytics() }}
                variant="outline"
                className="border-navy/15 text-navy hover:bg-navy hover:text-cream"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading || analyticsLoading ? "animate-spin" : ""}`} />
                Actualiser
              </Button>
              <Button onClick={exportCSV} variant="outline" className="border-navy/15 text-navy hover:bg-navy hover:text-cream">
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </Button>
              <Button onClick={handleLogout} variant="outline" className="border-crimson/20 text-crimson hover:bg-crimson hover:text-white">
                <LogOut className="w-4 h-4 mr-2" /> Déconnexion
              </Button>
            </div>
          </div>

          {/* Bandeau "en ligne maintenant" */}
          {analytics && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-emerald/10 to-emerald/5 border border-emerald/20 rounded-xl flex items-center gap-3"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald" />
              </div>
              <span className="font-display font-bold text-emerald">
                {analytics.onlineNow} visiteur{analytics.onlineNow !== 1 ? "s" : ""} en ligne maintenant
              </span>
              <span className="text-emerald/60 text-sm">· Mise à jour en temps réel</span>
            </motion.div>
          )}

          {/* Onglets */}
          <div className="flex gap-2 mb-6 border-b border-navy/10">
            <button
              onClick={() => setTab("submissions")}
              className={`px-5 py-3 font-semibold text-sm border-b-2 transition-colors ${
                tab === "submissions"
                  ? "border-orange text-orange"
                  : "border-transparent text-navy-soft hover:text-navy"
              }`}
            >
              <Inbox className="w-4 h-4 inline mr-2" />
              Demandes ({stats.total})
              {stats.new > 0 && (
                <Badge className="ml-2 bg-crimson text-white border-0">{stats.new} nouvelle{stats.new !== 1 ? "s" : ""}</Badge>
              )}
            </button>
            <button
              onClick={() => setTab("analytics")}
              className={`px-5 py-3 font-semibold text-sm border-b-2 transition-colors ${
                tab === "analytics"
                  ? "border-orange text-orange"
                  : "border-transparent text-navy-soft hover:text-navy"
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Statistiques visiteurs
            </button>
          </div>

          {/* ============ ONGLET DEMANDES ============ */}
          {tab === "submissions" && (
            <>
              {/* Stats rapides */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <StatCard icon={Inbox} label="Total" value={stats.total} color="navy" />
                <StatCard icon={Clock} label="Nouvelles" value={stats.new} color="orange" />
                <StatCard icon={Mail} label="Contacts" value={stats.contact} color="emerald" />
                <StatCard icon={FileText} label="Devis" value={stats.quote} color="crimson" />
                <StatCard icon={GraduationCap} label="Formations" value={stats.formation} color="gold" />
              </div>

              {/* Filtres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { key: "all", label: "Toutes" },
                  { key: "contact", label: "Contacts" },
                  { key: "quote", label: "Devis traduction" },
                  { key: "formation", label: "Inscriptions" },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      filter === f.key
                        ? "bg-navy text-cream"
                        : "bg-white text-navy-soft hover:bg-cream-warm border border-navy/8"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Liste des soumissions */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-orange" />
                </div>
              ) : submissions.length === 0 ? (
                <Card className="p-12 bg-white border-navy/8 text-center">
                  <Inbox className="w-12 h-12 mx-auto text-navy-soft/30 mb-3" />
                  <p className="text-navy-soft/70">Aucune soumission pour le moment.</p>
                  <p className="text-xs text-navy-soft/50 mt-1">Les demandes reçues via les formulaires apparaîtront ici.</p>
                </Card>
              ) : (
                <div className="grid gap-3">
                  {submissions.map((s) => (
                    <Card
                      key={s.id}
                      className={`p-5 bg-white border-navy/8 shadow-soft hover:shadow-card transition-all cursor-pointer ${
                        s.status === "new" ? "border-l-4 border-l-orange" : ""
                      }`}
                      onClick={() => {
                        setSelected(s)
                        if (s.status === "new") updateStatus(s.id, "read")
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <TypeBadge type={s.type} />
                            {s.status === "new" && <Badge className="bg-orange text-white border-0">Nouveau</Badge>}
                            {s.status === "read" && <Badge variant="outline" className="text-navy-soft">Lu</Badge>}
                            {s.status === "replied" && <Badge className="bg-emerald text-white border-0">Répondu</Badge>}
                          </div>
                          <h3 className="font-display font-bold text-navy text-lg">{s.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-navy-soft">
                            <a href={`mailto:${s.email}`} className="flex items-center gap-1 hover:text-orange" onClick={e => e.stopPropagation()}>
                              <Mail className="w-3.5 h-3.5" /> {s.email}
                            </a>
                            {s.phone && (
                              <a href={`tel:${s.phone}`} className="flex items-center gap-1 hover:text-orange" onClick={e => e.stopPropagation()}>
                                <Phone className="w-3.5 h-3.5" /> {s.phone}
                              </a>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {new Date(s.createdAt).toLocaleString("fr-FR")}
                            </span>
                          </div>
                          {s.subject && <p className="mt-2 text-sm text-navy font-medium">Sujet : {s.subject}</p>}
                          {s.message && <p className="mt-1 text-sm text-navy-soft/80 line-clamp-2">{s.message}</p>}
                          {s.wordCount && (
                            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                              <Badge variant="outline" className="border-navy/15">{s.sourceLang} → {s.targetLang}</Badge>
                              <Badge variant="outline" className="border-navy/15">{s.wordCount} mots</Badge>
                              <Badge variant="outline" className="border-navy/15">{s.docType}</Badge>
                              <Badge variant="outline" className="border-navy/15">{s.delivery}</Badge>
                              {s.estimatedPrice && (
                                <Badge className="bg-emerald text-white border-0">{s.estimatedPrice.toLocaleString("fr-FR")} FCFA</Badge>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex sm:flex-col gap-2" onClick={e => e.stopPropagation()}>
                          {s.status !== "replied" && (
                            <Button size="sm" onClick={() => updateStatus(s.id, "replied")} className="bg-emerald hover:bg-emerald/90 text-white">
                              <CheckCircle2 className="w-4 h-4 mr-1" /> Répondu
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => deleteSubmission(s.id)} className="border-crimson/20 text-crimson hover:bg-crimson hover:text-white">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ============ ONGLET ANALYTICS ============ */}
          {tab === "analytics" && (
            <>
              {analyticsLoading && !analytics ? (
                <div className="flex justify-center py-24">
                  <Loader2 className="w-8 h-8 animate-spin text-orange" />
                </div>
              ) : analytics ? (
                <div className="space-y-6">
                  {/* Stats principales visites */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={Activity} label="Visites aujourd'hui" value={analytics.visits.today} color="orange" />
                    <StatCard icon={Users} label="Visiteurs (semaine)" value={analytics.visitors.week} color="emerald" />
                    <StatCard icon={Clock} label="Durée moyenne" value={formatDuration(analytics.avgDuration)} color="navy" />
                    <StatCard icon={TrendingUp} label="Visites totales" value={analytics.visits.total} color="gold" />
                  </div>

                  {/* Graphique visites 7 jours */}
                  <Card className="p-6 bg-white border-navy/8 shadow-soft">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                          <Activity className="w-5 h-5 text-orange" />
                          Visites des 7 derniers jours
                        </h3>
                        <p className="text-xs text-navy-soft/60 mt-1">Nombre de pages vues par jour</p>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={analytics.visitsByDay}>
                        <defs>
                          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5DDD0" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={formatDate}
                          tick={{ fontSize: 12, fill: "#4B5B73" }}
                        />
                        <YAxis tick={{ fontSize: 12, fill: "#4B5B73" }} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0B1F3A",
                            border: "none",
                            borderRadius: "8px",
                            color: "#FAF7F2",
                          }}
                          labelFormatter={(d) => `Date : ${formatDate(d as string)}`}
                        />
                        <Area
                          type="monotone"
                          dataKey="count"
                          stroke="#F97316"
                          strokeWidth={3}
                          fill="url(#colorVisits)"
                          name="Visites"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Graphique clics 7 jours */}
                  <Card className="p-6 bg-white border-navy/8 shadow-soft">
                    <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2 mb-4">
                      <MousePointerClick className="w-5 h-5 text-emerald" />
                      Clics des 7 derniers jours
                    </h3>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={analytics.clicksByDay}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5DDD0" />
                        <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12, fill: "#4B5B73" }} />
                        <YAxis tick={{ fontSize: 12, fill: "#4B5B73" }} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#0B1F3A", border: "none", borderRadius: "8px", color: "#FAF7F2" }}
                          labelFormatter={(d) => `Date : ${formatDate(d as string)}`}
                        />
                        <Bar dataKey="count" fill="#10B981" radius={[8, 8, 0, 0]} name="Clics" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Top pages + Top clics */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Top pages */}
                    <Card className="p-6 bg-white border-navy/8 shadow-soft">
                      <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2 mb-4">
                        <Globe className="w-5 h-5 text-navy" />
                        Pages les plus visitées
                      </h3>
                      <div className="space-y-2">
                        {analytics.topPages.length === 0 ? (
                          <p className="text-sm text-navy-soft/60 text-center py-6">Aucune donnée</p>
                        ) : (
                          analytics.topPages.map((p, i) => {
                            const maxCount = analytics.topPages[0]?.count || 1
                            const pct = (p.count / maxCount) * 100
                            return (
                              <div key={p.path} className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-navy/5 text-navy flex items-center justify-center text-xs font-bold shrink-0">
                                  {i + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-sm font-mono text-navy truncate">{p.path}</span>
                                    <span className="text-sm font-bold text-orange ml-2">{p.count}</span>
                                  </div>
                                  <div className="h-1.5 bg-navy/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-orange to-orange-deep rounded-full" style={{ width: `${pct}%` }} />
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        )}
                      </div>
                    </Card>

                    {/* Top clics */}
                    <Card className="p-6 bg-white border-navy/8 shadow-soft">
                      <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2 mb-4">
                        <MousePointerClick className="w-5 h-5 text-orange" />
                        Éléments les plus cliqués
                      </h3>
                      <div className="space-y-2">
                        {analytics.topClicks.length === 0 ? (
                          <p className="text-sm text-navy-soft/60 text-center py-6">Aucun clic enregistré</p>
                        ) : (
                          analytics.topClicks.map((c, i) => {
                            const maxCount = analytics.topClicks[0]?.count || 1
                            const pct = (c.count / maxCount) * 100
                            return (
                              <div key={`${c.element}-${i}`} className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-orange/10 text-orange flex items-center justify-center text-xs font-bold shrink-0">
                                  {i + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-sm text-navy truncate">
                                      {c.label || c.element}
                                      <span className="text-xs text-navy-soft/50 ml-1">({c.element})</span>
                                    </span>
                                    <span className="text-sm font-bold text-emerald ml-2">{c.count}</span>
                                  </div>
                                  <div className="h-1.5 bg-navy/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-emerald to-emerald/70 rounded-full" style={{ width: `${pct}%` }} />
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Sources + stats détaillées */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Sources de trafic */}
                    <Card className="p-6 bg-white border-navy/8 shadow-soft">
                      <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-crimson" />
                        Sources de trafic
                      </h3>
                      <div className="space-y-2">
                        {analytics.referrers.length === 0 ? (
                          <p className="text-sm text-navy-soft/60 text-center py-6">Aucune donnée</p>
                        ) : (
                          analytics.referrers.map((r, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-navy/5 last:border-0">
                              <div className="flex items-center gap-2 min-w-0">
                                <Globe className="w-4 h-4 text-navy-soft/60 shrink-0" />
                                <span className="text-sm text-navy truncate">{r.source}</span>
                              </div>
                              <span className="text-sm font-bold text-navy">{r.count}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </Card>

                    {/* Résumé global */}
                    <Card className="p-6 bg-gradient-to-br from-navy to-navy-soft border-navy/8 shadow-soft text-cream">
                      <h3 className="font-display font-bold text-cream text-lg flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-orange" />
                        Résumé global
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-cream/70 text-sm">Visites aujourd'hui</span>
                          <span className="font-bold text-orange">{analytics.visits.today}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cream/70 text-sm">Visites cette semaine</span>
                          <span className="font-bold text-cream">{analytics.visits.week}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cream/70 text-sm">Visites ce mois</span>
                          <span className="font-bold text-cream">{analytics.visits.month}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cream/70 text-sm">Visiteurs uniques (total)</span>
                          <span className="font-bold text-emerald">{analytics.visitors.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-cream/70 text-sm">Durée moyenne / page</span>
                          <span className="font-bold text-cream">{formatDuration(analytics.avgDuration)}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-cream/10">
                          <span className="text-cream/70 text-sm">Demandes en attente</span>
                          <span className="font-bold text-crimson">{analytics.submissions.new}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card className="p-12 bg-white border-navy/8 text-center">
                  <p className="text-navy-soft/70">Impossible de charger les statistiques.</p>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: number | string; color: string }) {
  const colorMap: Record<string, string> = {
    navy: "bg-navy/10 text-navy",
    orange: "bg-orange/10 text-orange",
    emerald: "bg-emerald/10 text-emerald",
    crimson: "bg-crimson/10 text-crimson",
    gold: "bg-gold/10 text-gold",
  }
  return (
    <Card className="p-4 bg-white border-navy/8 shadow-soft">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="font-display text-2xl font-extrabold text-navy">{value}</div>
      <div className="text-xs text-navy-soft/70 uppercase tracking-wide">{label}</div>
    </Card>
  )
}

function TypeBadge({ type }: { type: string }) {
  const map: Record<string, { label: string; className: string; icon: any }> = {
    contact: { label: "Contact", className: "bg-emerald/10 text-emerald", icon: Mail },
    quote: { label: "Devis", className: "bg-crimson/10 text-crimson", icon: FileText },
    formation: { label: "Formation", className: "bg-gold/10 text-gold", icon: GraduationCap },
  }
  const item = map[type] || { label: type, className: "bg-navy/10 text-navy", icon: Inbox }
  const Icon = item.icon
  return (
    <Badge className={`${item.className} border-0`}>
      <Icon className="w-3 h-3 mr-1" /> {item.label}
    </Badge>
  )
}
