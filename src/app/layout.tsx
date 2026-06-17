import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { LangProvider } from "@/lib/lang-context"
import { Loader, CustomCursor, ScrollProgress, RouteChangeOverlay, ShareButton } from "@/components/site/effects"

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://vision2000elc.com"),
  title: {
    default: "VISION 2000 ELC | Formation Anglais, Traduction & Interprétation à Ouagadougou",
    template: "%s | VISION 2000 ELC",
  },
  description:
    "Centre de référence à Ouagadougou depuis +20 ans. Formation en anglais, traduction professionnelle FR↔EN et interprétation de conférence. 100% humain, confidentiel et certifié. Demandez votre devis gratuit.",
  keywords: [
    "formation anglais Ouagadougou",
    "traduction français anglais Burkina Faso",
    "interprétation simultanée Ouagadougou",
    "cours anglais professionnel",
    "TOEIC TOEFL IELTS Burkina",
    "coaching linguistique",
    "VISION 2000 ELC",
    "traduction conférence",
    "business English Afrique",
  ],
  authors: [{ name: "VISION 2000 ELC" }],
  creator: "VISION 2000 ELC",
  publisher: "VISION 2000 ELC",
  alternates: {
    canonical: "https://vision2000elc.com",
    languages: {
      "fr-BF": "https://vision2000elc.com",
      "fr": "https://vision2000elc.com",
      "en": "https://vision2000elc.com",
    },
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "VISION 2000 ELC — Votre partenaire linguistique pour un monde sans frontières",
    description:
      "20+ ans d'expertise humaine en formation, traduction et interprétation à Ouagadougou. Confidentialité garantie, livraison express 24h.",
    url: "https://vision2000elc.com",
    siteName: "VISION 2000 ELC",
    locale: "fr_BF",
    type: "website",
    images: [{ url: "/og-banner.jpg", width: 1200, height: 630, alt: "VISION 2000 ELC — Formation Anglais, Traduction & Interprétation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VISION 2000 ELC — Formation Anglais, Traduction & Interprétation",
    description: "20+ ans d'expertise humaine à Ouagadougou. Confidentialité garantie.",
    images: ["/og-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "education",
}

// Schema.org LocalBusiness JSON-LD (SEO local pour Google Maps & recherche locale)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://vision2000elc.com/#organization",
  name: "VISION 2000 ELC",
  alternateName: "VISION 2000 English Language Center",
  description: "Centre de référence à Ouagadougou depuis +20 ans. Formation en anglais, traduction professionnelle FR↔EN et interprétation de conférence.",
  url: "https://vision2000elc.com",
  logo: "https://vision2000elc.com/logo.jpeg",
  image: "https://vision2000elc.com/og-banner.jpg",
  telephone: "+22670462670",
  email: "contact@vision2000elc.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Koulouba",
    addressLocality: "Ouagadougou",
    addressRegion: "Centre",
    postalCode: "01 BP 1234",
    addressCountry: "BF",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "12.3714",
    longitude: "-1.5197",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  sameAs: [
    "https://wa.me/22670462670",
  ],
  areaServed: [
    { "@type": "Country", name: "Burkina Faso" },
    { "@type": "Place", name: "Afrique de l'Ouest" },
  ],
  knowsAbout: [
    "Formation en anglais",
    "Traduction française-anglaise",
    "Interprétation de conférence",
    "Préparation TOEIC",
    "Préparation TOEFL",
    "Préparation IELTS",
    "Business English",
    "Coaching linguistique",
  ],
}

// Schema.org WebSite (pour la recherche Sitelinks)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://vision2000elc.com/#website",
  url: "https://vision2000elc.com",
  name: "VISION 2000 ELC",
  description: "Centre de formation en anglais, traduction et interprétation à Ouagadougou",
  publisher: { "@id": "https://vision2000elc.com/#organization" },
  inLanguage: ["fr", "en"],
}

// Schema.org Service (pour les services proposés)
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "Formation en anglais",
      description: "Anglais général, professionnel, Business English, préparation TOEIC/TOEFL/IELTS",
      provider: { "@id": "https://vision2000elc.com/#organization" },
      areaServed: "Burkina Faso",
    },
    {
      "@type": "Service",
      position: 2,
      name: "Traduction professionnelle",
      description: "Traduction spécialisée français-anglais : documents administratifs, juridiques, techniques, financiers",
      provider: { "@id": "https://vision2000elc.com/#organization" },
      areaServed: "Monde entier",
    },
    {
      "@type": "Service",
      position: 3,
      name: "Interprétation de conférence",
      description: "Interprétation simultanée et consécutive pour conférences, réunions ministérielles, missions diplomatiques",
      provider: { "@id": "https://vision2000elc.com/#organization" },
      areaServed: "Burkina Faso",
    },
    {
      "@type": "Service",
      position: 4,
      name: "Coaching linguistique",
      description: "Préparation d'entretiens, communication professionnelle, présentations en anglais, coaching exécutif",
      provider: { "@id": "https://vision2000elc.com/#organization" },
      areaServed: "Burkina Faso",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Schema.org structured data pour SEO local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
        {/* Google Analytics (placeholder - remplacez G-XXXXXXXXXX par votre ID) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${jakarta.variable} ${inter.variable} font-sans antialiased bg-cream text-navy`}
      >
        <LangProvider>
          <Loader />
          <CustomCursor />
          <ScrollProgress />
          <RouteChangeOverlay />
          <ShareButton />
          {children}
          <Toaster />
        </LangProvider>
      </body>
    </html>
  )
}
