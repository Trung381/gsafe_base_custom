"use client"

import { useTranslations } from "next-intl"

export default function PricingNote() {
  const t = useTranslations("pricing")
  return (
    <div className="text-left text-sm text-gray-600 mt-8"> {/* text-left và margin-top */}
      <p>
        <span className="font-semibold">{t("note.prefix")}</span>
        {t("note.content")}
      </p>
    </div>
  )
}