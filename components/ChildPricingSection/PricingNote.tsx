"use client"

import { useTranslations } from "next-intl"

export default function PricingNote() {
  const t = useTranslations("pricing")
  return (
    <div className="text-left text-medium text-[16] text-[#686D72] mt-8"> {/* text-left và margin-top */}
      <p>
        <span>{t("note.prefix")}<span className="text-red-500 align-top">*</span>:</span>
        {t("note.content")}
      </p>
    </div>
  )
}