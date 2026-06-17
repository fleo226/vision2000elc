import { SiteHeader } from "@/components/site/header"
import { PageHero } from "@/components/site/page-hero"
import { Testimonials } from "@/components/site/testimonials"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"
import { HomeCTA } from "@/components/site/home-cta"

export const metadata = {
  title: "Témoignages clients — VISION 2000 ELC",
  description: "Découvrez ce que disent nos clients : banques, ONG, ministères, particuliers. La meilleure preuve de notre expertise, ce sont les mots de ceux qui nous font confiance depuis 20 ans.",
}

export default function TemoignagesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Témoignages"
          title={<>Ce que disent <span className="gradient-text-orange">ceux qui nous font confiance</span></>}
          intro="La meilleure preuve de notre expertise, ce sont les mots de nos clients. Voici quelques-uns de leurs retours, recueillis au fil de nos missions."
          breadcrumbs={[{ label: "Témoignages" }]}
        />
        <Testimonials />
        <HomeCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
