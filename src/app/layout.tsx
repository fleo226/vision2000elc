import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
      "en": "https://vision2000elc.com/en",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${inter.variable} font-sans antialiased bg-cream text-navy`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
