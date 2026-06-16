import { SiteHeader } from "@/components/site/header"
import { PageHero } from "@/components/site/page-hero"
import { Blog } from "@/components/site/blog"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"
import { HomeCTA } from "@/components/site/home-cta"

export const metadata = {
  title: "Blog & Conseils — Anglais, Traduction, Interprétation",
  description: "Articles, guides pratiques et retours d'expérience pour développer votre maîtrise de l'anglais professionnel, réussir vos certifications et comprendre les enjeux de la traduction.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Blog & Conseils"
          title={<>Nos conseils pour <span className="gradient-text-orange">communiquer en anglais</span> avec aisance</>}
          intro="Articles, guides pratiques et retours d'expérience pour développer votre maîtrise de l'anglais professionnel, réussir vos certifications et comprendre les enjeux de la traduction."
          breadcrumbs={[{ label: "Blog" }]}
        />
        <Blog />
        <HomeCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
