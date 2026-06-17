import { SiteHeader } from "@/components/site/header"
import { PageHero } from "@/components/site/page-hero"
import { Formations } from "@/components/site/formations"
import { BrochureDownload } from "@/components/site/brochure-download"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"
import { HomeCTA } from "@/components/site/home-cta"

export const metadata = {
  title: "Formations en anglais — Général, Pro, TOEIC/TOEFL/IELTS",
  description: "Programmes structurés par niveau (débutant à avancé), anglais professionnel sectoriel et préparations aux certifications internationales. Cours en groupe, particuliers, en entreprise ou en ligne à Ouagadougou.",
}

export default function FormationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Nos Formations"
          title={<>Des parcours <span className="gradient-text-orange">structurés</span> pour chaque objectif</>}
          intro="Que vous prépariez le TOEIC, visiez une promotion internationale ou souhaitiez simplement voyager, nos programmes progressifs vous mènent du niveau débutant au niveau avancé — avec un suivi pédagogique personnalisé et des formateurs expérimentés."
          breadcrumbs={[{ label: "Formations" }]}
        />
        <Formations />
        <BrochureDownload />
        <HomeCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
