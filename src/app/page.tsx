import { SiteHeader } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { TrustBar } from "@/components/site/trust-bar"
import { Services } from "@/components/site/services"
import { About } from "@/components/site/about"
import { WhyHuman } from "@/components/site/why-human"
import { Formations } from "@/components/site/formations"
import { Translation } from "@/components/site/translation"
import { Interpretation } from "@/components/site/interpretation"
import { Stats } from "@/components/site/stats"
import { Testimonials } from "@/components/site/testimonials"
import { Blog } from "@/components/site/blog"
import { FAQ } from "@/components/site/faq"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <WhyHuman />
        <Formations />
        <Translation />
        <Interpretation />
        <Stats />
        <Testimonials />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
