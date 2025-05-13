"use client"

import { useTranslations } from "next-intl"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import ServicePackageSelection from "./service-package-selection"

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
    <div className="bg-white rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        {/* Service Package Selections for each facility */}
        {mockFacilities.map((facility) => (
          <ServicePackageSelection key={facility.id} facilityName={facility.name} facilityLetter={facility.letter} />
        ))}
      </form>
    </div>
  )
} 