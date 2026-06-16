import { SiteHeader } from "@/components/site/header"
import { PageHero } from "@/components/site/page-hero"
import { Interpretation } from "@/components/site/interpretation"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"
import { HomeCTA } from "@/components/site/home-cta"

export const metadata = {
  title: "Interprétation de conférence — Simultanée & Consécutive",
  description: "Interprétation simultanée et consécutive pour conférences internationales, réunions ministérielles, ateliers et missions diplomatiques. Interprètes certifiés, matériel technique inclus, coordination logistique complète.",
}

export default function InterpretationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Interprétation"
          title={<>Vos événements <span className="gradient-text-orange">sans frontières linguistiques</span></>}
          intro="L'interprétation de conférence est un art qui exige des professionnels certifiés, une concentration extrême et une maîtrise parfaite des deux langues. Nos interprètes ont accompagné des sommets ministériels, des conférences internationales et des missions diplomatiques au Burkina Faso et dans la sous-région."
          breadcrumbs={[{ label: "Interprétation" }]}
        />
        <Interpretation />
        <HomeCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
