import { SiteHeader } from "@/components/site/header"
import { PageHero } from "@/components/site/page-hero"
import { WhyHuman } from "@/components/site/why-human"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"
import { HomeCTA } from "@/components/site/home-cta"

export const metadata = {
  title: "Pourquoi Humain > IA — VISION 2000 ELC",
  description: "L'IA traduit les mots, nous traduisons le sens. Confidentialité absolue, traductions certifiées, nuances culturelles, relation humaine. Découvrez pourquoi l'expertise humaine reste irremplaçable.",
}

export default function PourquoiHumainPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Pourquoi Humain > IA"
          title={<>L'IA traduit les mots. <span className="gradient-text-orange">Nous traduisons le sens.</span></>}
          intro="Google Translate, ChatGPT et autres outils IA sont séduisants — gratuits, rapides, accessibles. Mais pour vos documents officiels, vos contrats, vos conférences et votre image professionnelle, ils présentent des risques majeurs. Voici pourquoi des centaines de professionnels, ONG et institutions continuent de nous confier leurs communications critiques."
          breadcrumbs={[{ label: "Pourquoi Humain" }]}
        />
        <WhyHuman />
        <HomeCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
