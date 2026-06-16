import { SiteHeader } from "@/components/site/header"
import { PageHero } from "@/components/site/page-hero"
import { Services } from "@/components/site/services"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"
import { HomeCTA } from "@/components/site/home-cta"

export const metadata = {
  title: "Nos Services — Formation, Traduction, Interprétation & Coaching",
  description: "Découvrez les 4 pôles d'expertise de VISION 2000 ELC : formation en anglais, traduction professionnelle FR↔EN, interprétation de conférence et coaching linguistique à Ouagadougou.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Nos Services"
          title={<>Une expertise linguistique <span className="gradient-text-orange">complète</span></>}
          intro="De la formation à la traduction, de l'interprétation au coaching exécutif, VISION 2000 ELC vous accompagne à chaque étape de votre communication internationale. Quatre pôles d'expertise, une même exigence : l'excellence humaine."
          breadcrumbs={[{ label: "Services" }]}
        />
        <Services />
        <HomeCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
