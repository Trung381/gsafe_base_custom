"use client"

import { useTranslations } from "next-intl"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"

interface ServicePackageSelectionProps {
  facilityName: string
  facilityLetter: string
}

export default function ServicePackageSelection({ facilityName, facilityLetter }: ServicePackageSelectionProps) {
  const t = useTranslations("serviceSelection")
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<string>("12")

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value)
  }

  const packages = [
    {
      id: "gsafe300",
      title: "GSafe 300",
      description: t("gsafe300Description"),
    },
    {
      id: "gsafe400",
      title: "GSafe 400",
      description: t("gsafe400Description"),
    },
    {
      id: "gsafe500",
      title: "GSafe 500",
      description: t("gsafe500Description"),
    },
    {
      id: "gsafesoc",
      title: "GSafe SOC",
      description: t("gsafesocDescription"),
    },
  ]

  return (
    <div className="mb-8">
      <h3 className="text-[#0267AB] text-lg font-medium mb-4">
        {t("facility")} {facilityLetter}:
      </h3>
      <div className="bg-[#F8FBFF] p-6 rounded-lg">
        {/* Package Selection */}
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium">
            <span className="text-red-500 mr-1">*</span> {t("selectPackage")}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`cursor-pointer p-4 rounded-lg border transition-all ${
                  selectedPackage === pkg.id ? "border-[#0267AB] bg-white shadow-md" : "border-[#CFD1D2] bg-white"
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                <h4 className="text-[#0267AB] font-medium mb-2">{pkg.title}</h4>
                <p className="text-sm text-gray-600">{pkg.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div>
          <label className="block mb-3 text-sm font-medium">
            <span className="text-red-500 mr-1">*</span> {t("selectDuration")}
          </label>
          <RadioGroup value={selectedDuration} onValueChange={handleDurationChange} className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="12"
                id={`duration-12-${facilityLetter}`}
                className={
                  selectedDuration === "12" ? "border-[#0267AB] text-[#0267AB]" : "border-[#CFD1D2] text-[#CFD1D2]"
                }
              />
              <label htmlFor={`duration-12-${facilityLetter}`} className="text-sm font-medium cursor-pointer">
                12 {t("months")}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="24"
                id={`duration-24-${facilityLetter}`}
                className={
                  selectedDuration === "24" ? "border-[#0267AB] text-[#0267AB]" : "border-[#CFD1D2] text-[#CFD1D2]"
                }
              />
              <label htmlFor={`duration-24-${facilityLetter}`} className="text-sm font-medium cursor-pointer">
                24 {t("months")}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="36"
                id={`duration-36-${facilityLetter}`}
                className={
                  selectedDuration === "36" ? "border-[#0267AB] text-[#0267AB]" : "border-[#CFD1D2] text-[#CFD1D2]"
                }
              />
              <label htmlFor={`duration-36-${facilityLetter}`} className="text-sm font-medium cursor-pointer">
                36 {t("months")}
              </label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
