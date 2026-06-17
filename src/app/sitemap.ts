import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vision2000elc.com"
  const lastModified = new Date()

  const staticPages = [
    "",
    "/services",
    "/formations",
    "/traduction",
    "/interpretation",
    "/pourquoi-humain",
    "/a-propos",
    "/temoignages",
    "/blog",
    "/contact",
  ]

  const blogArticles = [
    "/blog/pourquoi-anglais-2026",
    "/blog/avantages-toeic-carriere",
    "/blog/traduction-vs-interpretation",
    "/blog/presentation-professionnelle-anglais",
    "/blog/traduction-interpretation-21e-siecle",
  ]

  const allPages = [...staticPages, ...blogArticles]

  return allPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : path.startsWith("/blog/") ? 0.7 : 0.8,
  }))
}
