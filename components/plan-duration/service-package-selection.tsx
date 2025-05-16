"use client"

import { useTranslations } from "next-intl"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState, forwardRef, useImperativeHandle, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { facilityServiceSchema, FacilityServiceData } from "./service-selection-form-simplified"

interface ServicePackageSelectionProps {
  facilityName: string
  facilityLetter: string
  facilityId: number
  data?: FacilityServiceData
  setData?: (data: FacilityServiceData) => void
}

const ServicePackageSelection = forwardRef<{ validate: () => Promise<boolean> }, ServicePackageSelectionProps>(
  ({ facilityName, facilityLetter, facilityId, data, setData }, ref) => {
    const t = useTranslations("serviceSelection")
    
    const form = useForm<FacilityServiceData>({
      resolver: zodResolver(facilityServiceSchema),
      defaultValues: {
        facilityId,
        facilityName,
        facilityLetter,
        selectedPackage: data?.selectedPackage || "",
        selectedDuration: data?.selectedDuration || "12",
      },
      mode: "onChange", // Enable live validation
    });

    // Expose the validate method to the parent component
    useImperativeHandle(ref, () => ({
      validate: async () => {
        const result = await form.trigger();
        if (result && setData) {
          const values = form.getValues();
          setData(values);
        }
        return result;
      }
    }));

    // Update form when external data changes
    useEffect(() => {
      if (data) {
        if (data.selectedPackage) form.setValue("selectedPackage", data.selectedPackage);
        if (data.selectedDuration) form.setValue("selectedDuration", data.selectedDuration);
      }
    }, [data, form]);

    const handlePackageSelect = (packageId: string) => {
      form.setValue("selectedPackage", packageId);
      
      if (setData) {
        setData({
          ...form.getValues(),
          selectedPackage: packageId,
        });
      }
    }

    const handleDurationChange = (value: string) => {
      form.setValue("selectedDuration", value);
      
      if (setData) {
        setData({
          ...form.getValues(),
          selectedDuration: value,
        });
      }
    }

    const packages = [
      {
        id: "gsafe300",
        price: 3600000,
        title: "GSafe 300",
        description: t("gsafe300Description"),
      },
      {
        id: "gsafe400",
        price: 4800000,
        title: "GSafe 400",
        description: t("gsafe400Description"),
      },
      {
        id: "gsafe500",
        price: 6000000,
        title: "GSafe 500",
        description: t("gsafe500Description"),
      },
      {
        id: "gsafesoc",
        price: 2400000,
        title: "GSafe SOC",
        description: t("gsafesocDescription"),
      },
    ]

    const selectedPackage = form.watch("selectedPackage");
    const selectedDuration = form.watch("selectedDuration");

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
            {form.formState.errors.selectedPackage && (
              <div className="mt-2 text-sm text-red-500">{form.formState.errors.selectedPackage.message}</div>
            )}
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
                />
                <label 
                  htmlFor={`duration-12-${facilityLetter}`} 
                  className={`text-sm font-medium cursor-pointer ${
                    selectedDuration === "12" ? "text-[#0267AB]" : "text-[#CFD1D2]"
                  }`}
                >
                  12 {t("months")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="24"
                  id={`duration-24-${facilityLetter}`}
                />
                <label 
                  htmlFor={`duration-24-${facilityLetter}`} 
                  className={`text-sm font-medium cursor-pointer ${
                    selectedDuration === "24" ? "text-[#0267AB]" : "text-[#CFD1D2]"
                  }`}
                >
                  24 {t("months")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="36"
                  id={`duration-36-${facilityLetter}`}
                />
                <label 
                  htmlFor={`duration-36-${facilityLetter}`} 
                  className={`text-sm font-medium cursor-pointer ${
                    selectedDuration === "36" ? "text-[#0267AB]" : "text-[#CFD1D2]"
                  }`}
                >
                  36 {t("months")}
                </label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    )
  }
);

ServicePackageSelection.displayName = "ServicePackageSelection";

export default ServicePackageSelection;
