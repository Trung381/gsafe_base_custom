"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

export default function ClientsSection() {
  const t = useTranslations("clients")

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {["construction", "pccc", "tech", "insurance", "smart-city"].map((client, index) => (
            <div key={index} className="flex justify-center">
              <div className="bg-blue-100 p-4 rounded-lg w-24 h-24 flex items-center justify-center">
                <Image src={`/${client}.svg`} alt={`Client ${index + 1}`} width={60} height={60} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/12 text-4xl text-blue-300 mb-4 md:mb-0">"</div>
            <div className="md:w-10/12 px-4">
              <p className="text-gray-600 italic mb-4">{t("testimonial.text")}</p>
              <div className="flex items-center">
                <Image src="/avatar.svg" alt="User Avatar" width={40} height={40} className="rounded-full mr-3" />
                <div>
                  <p className="font-bold">{t("testimonial.author")}</p>
                  <p className="text-sm text-gray-500">{t("testimonial.position")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
