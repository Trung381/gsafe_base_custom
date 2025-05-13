"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

import icon4G from "@/assets/img/4G.png"
import iconAlert from "@/assets/img/alert.png"
import iconMobile from "@/assets/img/mobile.png"
import iconBattery from "@/assets/img/battery.png"
import deviceImg from "@/assets/img/device.png"

const benefitsData = [
  {
    iconSrc: icon4G,
    alt: "4G Connection",
    translationKey: "detection",
  },
  {
    iconSrc: iconAlert,
    alt: "Auto Alert",
    translationKey: "alert",
  },
  {
    iconSrc: iconMobile,
    alt: "Mobile App",
    translationKey: "mobile",
  },
  {
    iconSrc: iconBattery,
    alt: "Backup Battery",
    translationKey: "battery",
  },
]

export default function BenefitsSection() {
  const t = useTranslations("benefits")

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
          <p className="text-gray-600 max-w-4xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Main Content: Cards + Device Image */}
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Cards Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-2/3">
            {benefitsData.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center"
              >
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Image
                    src={benefit.iconSrc}
                    alt={benefit.alt}
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  {t(`${benefit.translationKey}.title`)}
                </h3>
                <p className="text-gray-600 text-center">
                  {t(`${benefit.translationKey}.description`)}
                </p>
              </div>
            ))}
          </div> */}

          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 lg:w-3/5">
            {benefitsData.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col"
              >
                <div className="bg-none py-3 mb-4 w-fit">
                  <Image
                    src={benefit.iconSrc}
                    alt={benefit.alt}
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t(`${benefit.translationKey}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`${benefit.translationKey}.description`)}
                </p>
              </div>
            ))}
          </div>

          {/* Device Image */}
          <div className="bg-[#E0F1FE] rounded-2xl lg:w-2/5 flex justify-center items-center">
            <Image
              src={deviceImg}
              alt="GSafe Device"
              width={450}
              height={450}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}