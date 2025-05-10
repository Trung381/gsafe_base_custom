"use client"

import { useTranslations } from "next-intl"

export default function PricingTitle() {
  const t = useTranslations("pricing")

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
      <p className="text-gray-600">{t("subtitle")}</p>
    </div>
  )
}