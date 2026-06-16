import { SiteHeader } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { TrustBar } from "@/components/site/trust-bar"
import { Services } from "@/components/site/services"
import { Stats } from "@/components/site/stats"
import { Testimonials } from "@/components/site/testimonials"
import { Footer } from "@/components/site/footer"
import { FloatingActions } from "@/components/site/floating-actions"
import { HomeCTA } from "@/components/site/home-cta"
import { HomeTeasers } from "@/components/site/home-teasers"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Services />
        <HomeTeasers />
        <Stats />
        <Testimonials />
        <HomeCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
