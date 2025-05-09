"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

export default function BenefitsSection() {
  const t = useTranslations("benefits")

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
          <p className="text-gray-600 max-w-4xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Image src="/network.svg" alt="4G Connection" width={40} height={40} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">{t("detection.title")}</h3>
            <p className="text-gray-600 text-center">{t("detection.description")}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Image src="/alert.svg" alt="Auto Alert" width={40} height={40} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">{t("alert.title")}</h3>
            <p className="text-gray-600 text-center">{t("alert.description")}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Image src="/mobile.svg" alt="Mobile App" width={40} height={40} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">{t("mobile.title")}</h3>
            <p className="text-gray-600 text-center">{t("mobile.description")}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Image src="/battery.svg" alt="Backup Battery" width={40} height={40} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">{t("battery.title")}</h3>
            <p className="text-gray-600 text-center">{t("battery.description")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
