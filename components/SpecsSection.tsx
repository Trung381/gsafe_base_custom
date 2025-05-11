"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Specification from "@/assets/img/specifications.png"
import Benefit from "@/assets/img/benefit.png"
import Tick from "@/assets/img/tick-circle.png"

export default function SpecsSection() {
  const tSpecs = useTranslations("specs")
  const tBenefits = useTranslations("benefits2")

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Specifications Column */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src={Specification || "/placeholder.svg"}
                alt="Specifications"
                width={24}
                height={24}
                className="object-contain text-blue-500"
              />
              <h3 className="text-[24px] font-bold text-[#252627]">{tSpecs("title")}</h3>
            </div>

            <div className="space-y-4">
              {[
                { text: tSpecs("wifi") },
                { text: tSpecs("power") },
                { text: tSpecs("material") },
                { text: tSpecs("size") },
              ].map((spec, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Image
                    src={Tick || "/placeholder.svg"}
                    alt="Check"
                    width={20}
                    height={20}
                    className="object-contain flex-shrink-0"
                  />
                  <span className="text-[16px] font-medium text-[#252627]">{spec.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Column */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src={Benefit || "/placeholder.svg"}
                alt="Benefits"
                width={24}
                height={24}
                className="object-contain text-blue-500"
              />
              <h3 className="text-[24px] font-bold text-[#252627]">{tBenefits("title")}</h3>
            </div>

            <div className="space-y-4">
              {[
                { text: tBenefits("safety") },
                { text: tBenefits("property") },
                { text: tBenefits("compliance") },
                { text: tBenefits("monitoring") },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Image
                    src={Tick || "/placeholder.svg"}
                    alt="Check"
                    width={20}
                    height={20}
                    className="object-contain flex-shrink-0"
                  />
                  <span className="text-[16px] font-medium text-[#252627]">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
