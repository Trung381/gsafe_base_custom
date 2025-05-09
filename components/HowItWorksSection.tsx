"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

export default function HowItWorksSection() {
  const t = useTranslations("howItWorks")

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">{t("title")}</h2>

        <div className="flex flex-col md:flex-row justify-between items-center">
          {[
            { icon: "/fire.svg", title: "step1" },
            { icon: "/signal.svg", title: "step2" },
            { icon: "/alert.svg", title: "step3" },
            { icon: "/rescue.svg", title: "step4" },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center mb-8 md:mb-0">
              <div className="bg-white p-4 rounded-full shadow-md mb-4">
                <Image src={step.icon || "/placeholder.svg"} alt={t(`${step.title}.title`)} width={40} height={40} />
              </div>
              <h3 className="text-lg font-bold mb-2">{t(`${step.title}.title`)}</h3>
              <p className="text-sm text-gray-600 text-center max-w-[200px]">{t(`${step.title}.description`)}</p>
              {index < 3 && (
                <div className="hidden md:block absolute">
                  <Image src="/arrow-right.svg" alt="Next Step" width={40} height={20} className="ml-32" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
