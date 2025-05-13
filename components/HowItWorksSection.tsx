"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"

// Import the images
import fireIcon from "@/assets/img/fire.png"
import signalIcon from "@/assets/img/signal.png"
import alertRingIcon from "@/assets/img/alert-ring.png"
import rescueIcon from "@/assets/img/rescue.png"
import arrowIcon from "@/assets/img/icon-arrow.png"

// Define the steps data
const stepsData = [
  {
    iconSrc: fireIcon,
    alt: "Fire Detection",
    translationKey: "step1",
  },
  {
    iconSrc: signalIcon,
    alt: "Signal Transmission",
    translationKey: "step2",
  },
  {
    iconSrc: alertRingIcon,
    alt: "Alert Notification",
    translationKey: "step3",
  },
  {
    iconSrc: rescueIcon,
    alt: "Rescue Response",
    translationKey: "step4",
  },
]

export default function HowItWorksSection() {
  const t = useTranslations("howItWorks")

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-[#E0F1FE] rounded-2xl p-4 md:p-6">
          <h2 className="text-[24px] font-bold mb-8 md:mb-12 text-[#0267AB] text-center">{t("title")}</h2>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            {stepsData.map((step, index) => (
              <React.Fragment key={`step-${index}`}>
                {/* Step Card */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full max-w-[250px] flex flex-col items-center justify-between">
                    <div className="flex items-center justify-center h-[70px]">
                      <Image
                        src={step.iconSrc || "/placeholder.svg"}
                        alt={step.alt}
                        width={70}
                        height={70}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-center mt-4">
                      <h3 className="text-[18px] md:text-[20px] font-semibold text-[#252627] mb-1 text-center">
                        {t(`${step.translationKey}.title`)}
                      </h3>
                      <p className="text-[14px] md:text-[16px] font-medium text-[#686D72] text-center">
                        {t(`${step.translationKey}.description`)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow (only between steps, not after the last one) */}
                {index < stepsData.length - 1 && (
                  <div className="flex items-center justify-center my-2 md:my-0 md:mx-0">
                    <div className="hidden md:flex">
                      <Image
                        src={arrowIcon || "/placeholder.svg"}
                        alt="Next Step"
                        width={63}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex md:hidden">
                      <Image
                        src={arrowIcon || "/placeholder.svg"}
                        alt="Next Step"
                        width={32}
                        height={63}
                        className="rotate-90 object-contain"
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
