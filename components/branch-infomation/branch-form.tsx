"use client"

import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forwardRef, useImperativeHandle, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { branchSchema, BranchData } from "./branch-information-form-simplified"

interface BranchFormProps {
  index: number
  letter: string
  data?: BranchData
  setData?: (data: BranchData) => void
}

const BranchForm = forwardRef<{ validate: () => Promise<boolean> }, BranchFormProps>(
  ({ index, letter, data = { branchName: "", branchPhone: "", branchAddress: "", deviceCount: "1" }, setData }, ref) => {
    const t = useTranslations("branchInfo")

    const form = useForm<BranchData>({
      resolver: zodResolver(branchSchema),
      defaultValues: {
        branchName: data.branchName || "",
        branchPhone: data.branchPhone || "",
        branchAddress: data.branchAddress || "",
        deviceCount: data.deviceCount || "1",
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
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined) {
            form.setValue(key as keyof BranchData, value);
          }
        });
      }
    }, [data, form]);

    // Handle field change
    const handleChange = (field: keyof BranchData, value: string) => {
      form.setValue(field, value);
      
      if (setData) {
        const updatedData = { ...data, [field]: value };
        setData(updatedData as BranchData);
      }
    };

    return (
      <div className="mb-8">
        <h3 className="text-[#0267AB] text-lg font-medium mb-4">
          {t("branch")} {letter}
        </h3>
        <div className="bg-[#F8FBFF] p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Branch Name */}
            <div className="space-y-2">
              <Label htmlFor={`branch-name-${index}`} className="flex items-center">
                <span className="text-red-500 mr-1">*</span> {t("branchName")}
              </Label>
              <Input 
                id={`branch-name-${index}`} 
                placeholder={t("enterBranchName")} 
                className="w-full" 
                value={form.watch("branchName")}
                onChange={(e) => handleChange("branchName", e.target.value)}
              />
              {form.formState.errors.branchName && (
                <div className="text-sm text-red-500">{form.formState.errors.branchName.message}</div>
              )}
            </div>

            {/* Branch Phone */}
            <div className="space-y-2">
              <Label htmlFor={`branch-phone-${index}`} className="flex items-center">
                <span className="text-red-500 mr-1">*</span> {t("branchPhone")}
              </Label>
              <Input 
                id={`branch-phone-${index}`} 
                placeholder={t("enterBranchPhone")} 
                className="w-full" 
                type="tel" 
                value={form.watch("branchPhone")}
                onChange={(e) => handleChange("branchPhone", e.target.value)}
              />
              {form.formState.errors.branchPhone && (
                <div className="text-sm text-red-500">{form.formState.errors.branchPhone.message}</div>
              )}
            </div>

            {/* Branch Address */}
            <div className="space-y-2">
              <Label htmlFor={`branch-address-${index}`} className="flex items-center">
                {t("branchAddress")}
              </Label>
              <Input 
                id={`branch-address-${index}`} 
                placeholder={t("enterBranchAddress")} 
                className="w-full" 
                value={form.watch("branchAddress")}
                onChange={(e) => handleChange("branchAddress", e.target.value)}
              />
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
                value={form.watch("deviceCount")}
                onChange={(e) => handleChange("deviceCount", e.target.value)}
              />
              {form.formState.errors.deviceCount && (
                <div className="text-sm text-red-500">{form.formState.errors.deviceCount.message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
);

BranchForm.displayName = "BranchForm";

export default BranchForm;
