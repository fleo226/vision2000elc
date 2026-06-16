import { SiteHeader } from "@/components/site/header"
import { PageHero } from "@/components/site/page-hero"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

export const metadata = {
  title: "Contact — VISION 2000 ELC, Ouagadougou",
  description: "Contactez VISION 2000 ELC à Koulouba, Ouagadougou. Téléphone, email, WhatsApp, formulaire en ligne. Réponse garantie sous 2h ouvrées. Première consultation gratuite.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Contact"
          title={<>Parlons de votre <span className="gradient-text-orange">projet linguistique</span></>}
          intro="Une traduction à faire ? Une formation à organiser ? Un événement à interpréter ? Écrivez-nous, appelez-nous ou passez nous voir à Koulouba. La première consultation est toujours gratuite."
          breadcrumbs={[{ label: "Contact" }]}
        />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
