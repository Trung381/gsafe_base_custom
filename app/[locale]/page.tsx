import {useTranslations} from 'next-intl';
import BenefitsSection from "@/components/BenefitsSection"
import ClientsSection from "@/components/ClientsSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import HowItWorksSection from "@/components/HowItWorksSection"
import PricingSection from "@/components/PricingSection"
import SpecsSection from "@/components/SpecsSection"

export default function Home() {
  const t = useTranslations();

  return (
    <main>
      {/* <Header /> */}
      <Hero />
      <PricingSection />
      <ClientsSection />
      <BenefitsSection />
      <HowItWorksSection />
      <SpecsSection />
      {/* <Footer /> */}
    </main>
  )
}
