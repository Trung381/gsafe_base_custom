"use client"

import { useTranslations } from "next-intl"

export default function SpecsSection() {
  const tSpecs = useTranslations("specs")
  const tBenefits = useTranslations("benefits2")

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">{tSpecs("title")}</h3>
            <div className="space-y-4">
              {[
                { icon: "/wifi.svg", text: tSpecs("wifi") },
                { icon: "/power.svg", text: tSpecs("power") },
                { icon: "/material.svg", text: tSpecs("material") },
                { icon: "/size.svg", text: tSpecs("size") },
              ].map((spec, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>{spec.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">{tBenefits("title")}</h3>
            <div className="space-y-4">
              {[
                { icon: "/safety.svg", text: tBenefits("safety") },
                { icon: "/property.svg", text: tBenefits("property") },
                { icon: "/compliance.svg", text: tBenefits("compliance") },
                { icon: "/monitoring.svg", text: tBenefits("monitoring") },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
