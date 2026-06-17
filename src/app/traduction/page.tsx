import { SiteHeader } from "@/components/site/header"
import { PageHero } from "@/components/site/page-hero"
import { Translation } from "@/components/site/translation"
import { QuoteCalculator } from "@/components/site/quote-calculator"
import { BrochureDownload } from "@/components/site/brochure-download"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

export const metadata = {
  title: "Traduction professionnelle en ligne — FR ↔ Anglais",
  description: "Service de traduction 100% en ligne, rapide, sécurisé et confidentiel. Documents administratifs, juridiques, techniques, financiers. Devis gratuit sous 2h. Service Express 24-48h disponible.",
}

export default function TraductionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Traduction en ligne"
          title={<>Traduisez vos documents <span className="gradient-text-orange">en quelques clics</span></>}
          intro="Un service 100% en ligne, rapide, sécurisé et accessible partout dans le monde. Téléchargez vos documents, recevez un devis gratuit sous 2h, et obtenez une traduction professionnelle révisée par nos linguistes."
          breadcrumbs={[{ label: "Traduction" }]}
        />
        <QuoteCalculator />
        <Translation />
        <BrochureDownload />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
