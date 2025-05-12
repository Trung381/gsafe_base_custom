"use client"

import type React from "react"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ArrowRight from "@/assets/icons/arrow-right.svg"
import ArrowLeft from "@/assets/icons/arrow-left.svg"
import PageTitle from "@/components/page-title"
import ServicePackageSelection from "./service-package-selection"
import PlanDurationImg from "/assets/img/plan-duration.png"

// This would normally come from context or props
const mockFacilities = [
  { id: 1, name: "Facility A", letter: "A" },
  { id: 2, name: "Facility B", letter: "B" },
]

export default function ServiceSelectionForm() {
  const t = useTranslations("serviceSelection")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <div>
        {/* Page Title */}
      <PageTitle title={t("title")} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Progress Indicator */}
      <div className="w-full mb-8 flex justify-center">
          <Image
            src={PlanDurationImg}
            alt="Registration Progress"
            width={500}
            height={80}
            className="w-auto h-auto"
          />
        </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
        {/* Service Package Selections for each facility */}
        {mockFacilities.map((facility) => (
          <ServicePackageSelection key={facility.id} facilityName={facility.name} facilityLetter={facility.letter} />
        ))}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-full border border-[#0267AB] text-[#0267AB] hover:bg-[#0267AB] hover:text-white group px-6"
            icon={<ArrowLeft className="mr-2 w-5 h-5" />}
          >
            {t("back")}
          </Button>

          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="rounded-full border border-[#0267AB] bg-white text-[#0267AB] hover:bg-[#0267AB] hover:text-white group px-6"
          >
            {t("confirm")}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
    </div>
    
  )
}
