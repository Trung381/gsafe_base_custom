import {useTranslations} from 'next-intl';
import BenefitsSection from "@/components/BenefitsSection"
import ClientsSection from "@/components/ClientsSection"
import Hero from "@/components/Hero"
import HowItWorksSection from "@/components/HowItWorksSection"
import PricingSection from "@/components/PricingSection"
import SpecsSection from "@/components/SpecsSection"

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <Hero />
      <PricingSection />
      <ClientsSection />
      <BenefitsSection />
      <HowItWorksSection />
      <SpecsSection />
    </>
  )
}
