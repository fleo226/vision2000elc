import { SiteHeader } from "@/components/site/header"
import { PageHero } from "@/components/site/page-hero"
import { About } from "@/components/site/about"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"
import { HomeCTA } from "@/components/site/home-cta"

export const metadata = {
  title: "À propos — 20 ans d'expertise humaine à Ouagadougou",
  description: "Découvrez l'histoire, la vision, la mission et les valeurs de VISION 2000 ELC, centre de référence en formation, traduction et interprétation au Burkina Faso depuis plus de 20 ans.",
}

export default function AProposPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="À propos"
          title={<>20 ans d'expertise humaine <span className="gradient-text-orange">au cœur de Ouagadougou</span></>}
          intro="Fondé il y a plus de deux décennies, VISION 2000 ELC est aujourd'hui un acteur incontournable de la communication linguistique au Burkina Faso et dans la sous-région ouest-africaine."
          breadcrumbs={[{ label: "À propos" }]}
        />
        <About />
        <HomeCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
