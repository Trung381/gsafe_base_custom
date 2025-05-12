"use client"

import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BranchFormProps {
  index: number
  letter: string
}

export default function BranchForm({ index, letter }: BranchFormProps) {
  const t = useTranslations("branchInfo")

  return (
    <div className="mb-8">
      <h3 className="text-[#0267AB] text-lg font-medium mb-4">
        {t("branch")} {letter}:
      </h3>
      <div className="bg-[#F8FBFF] p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Branch Name */}
          <div className="space-y-2">
            <Label htmlFor={`branch-name-${index}`} className="flex items-center">
              <span className="text-red-500 mr-1">*</span> {t("branchName")}
            </Label>
            <Input id={`branch-name-${index}`} placeholder={t("enterBranchName")} className="w-full" />
          </div>

          {/* Branch Phone */}
          <div className="space-y-2">
            <Label htmlFor={`branch-phone-${index}`} className="flex items-center">
              <span className="text-red-500 mr-1">*</span> {t("branchPhone")}
            </Label>
            <Input id={`branch-phone-${index}`} placeholder={t("enterBranchPhone")} className="w-full" type="tel" />
          </div>

          {/* Branch Address */}
          <div className="space-y-2">
            <Label htmlFor={`branch-address-${index}`} className="flex items-center">
              {t("branchAddress")}
            </Label>
            <Input id={`branch-address-${index}`} placeholder={t("enterBranchAddress")} className="w-full" />
          </div>

          {/* Number of Devices */}
          <div className="space-y-2">
            <Label htmlFor={`branch-devices-${index}`} className="flex items-center">
              <span className="text-red-500 mr-1">*</span> {t("deviceCount")}
            </Label>
            <Input
              id={`branch-devices-${index}`}
              placeholder={t("enterDeviceCount")}
              className="w-full"
              type="number"
              min="1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
