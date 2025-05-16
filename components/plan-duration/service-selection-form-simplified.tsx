"use client"

import { useTranslations } from "next-intl"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState, forwardRef, useImperativeHandle, useEffect, createRef, useCallback } from "react"
import ServicePackageSelection from "./service-package-selection"
import * as z from "zod"
import { useRegistration } from "@/contexts/RegistrationContext"

// Define facility schema
export const facilityServiceSchema = z.object({
  facilityId: z.number(),
  facilityName: z.string(),
  facilityLetter: z.string(),
  selectedPackage: z.string().min(1, { message: "Please select a package" }),
  selectedDuration: z.string().min(1, { message: "Please select a duration" }),
});

export type FacilityServiceData = z.infer<typeof facilityServiceSchema>;

// Define the whole form schema
export const serviceSelectionSchema = z.object({
  facilities: z.array(facilityServiceSchema),
});

export type ServiceSelectionFormValues = z.infer<typeof serviceSelectionSchema>;

interface ServiceSelectionFormProps {
  data?: Partial<ServiceSelectionFormValues>;
  setData?: (data: ServiceSelectionFormValues) => void;
}

const ServiceSelectionForm = forwardRef<{ validate: () => Promise<boolean> }, ServiceSelectionFormProps>(
  ({ data = {}, setData }, ref) => {
    const t = useTranslations("serviceSelection");
    const { branchInfo } = useRegistration();
    const [facilityRefs, setFacilityRefs] = useState<Array<React.RefObject<{validate: () => Promise<boolean>}>>>([]);
    
    // Tạo danh sách facilities từ thông tin cơ sở của người dùng - memoized để tránh tính toán lại
    const facilities = branchInfo.branches?.map((branch, index) => ({
      id: index + 1,
      name: branch.branchName || `Facility ${String.fromCharCode(65 + index)}`,
      letter: String.fromCharCode(65 + index),
    })) || [];
    
    const [formValues, setFormValues] = useState<ServiceSelectionFormValues>(() => ({
      facilities: data?.facilities || facilities.map(facility => ({
        facilityId: facility.id,
        facilityName: facility.name,
        facilityLetter: facility.letter,
        selectedPackage: "",
        selectedDuration: "12",
      })),
    }));

    // Initialize refs only khi có thay đổi về số lượng facilities
    useEffect(() => {
      if (facilities.length > 0) {
        setFacilityRefs(facilities.map(() => createRef()));
      }
    }, [facilities.length]);

    // Update formValues khi facilities từ branchInfo thay đổi 
    // - chỉ được gọi khi facilities có thay đổi về cấu trúc
    useEffect(() => {
      const branchCount = branchInfo.branches?.length || 0;
      const facilitiesCount = formValues.facilities?.length || 0;
      
      // Chỉ cập nhật khi có sự thay đổi về số lượng cơ sở
      if (branchCount !== facilitiesCount && branchCount > 0) {
        setFormValues(prev => {
          // Giữ lại các giá trị đã chọn cho các cơ sở hiện có
          const existingFacilities = prev.facilities || [];
          
          // Tạo danh sách mới dựa trên các cơ sở từ branchInfo
          const newFacilities = facilities.map((facility, index) => {
            // Tìm cơ sở tương ứng trong dữ liệu hiện tại (nếu có)
            const existingFacility = existingFacilities.find(f => f.facilityLetter === facility.letter);
            
            return {
              facilityId: facility.id,
              facilityName: facility.name,
              facilityLetter: facility.letter,
              selectedPackage: existingFacility?.selectedPackage || "",
              selectedDuration: existingFacility?.selectedDuration || "12",
            };
          });
          
          return { facilities: newFacilities };
        });
      }
    }, [branchInfo.branches?.length, facilities]);

    // Memoize function để tránh tạo mới function mỗi khi render
    const updateFacilityData = useCallback((index: number, facilityData: Partial<FacilityServiceData>) => {
      setFormValues(prev => {
        const newFacilities = [...prev.facilities];
        newFacilities[index] = { ...newFacilities[index], ...facilityData };
        return { facilities: newFacilities };
      });
    }, []);

    // Expose validate method to parent
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // Validate all facility forms
        const results = await Promise.all(
          facilityRefs.map(facilityRef => facilityRef.current?.validate() || Promise.resolve(false))
        );
        
        const isValid = results.every(result => result === true);
        
        // If all valid, update the parent's data
        if (isValid && setData) {
          setData(formValues);
        }
        
        return isValid;
      }
    }), [facilityRefs, formValues, setData]);

    // Update form data when external data changes - from parent component
    useEffect(() => {
      if (data?.facilities && data.facilities.length > 0) {
        setFormValues({ facilities: data.facilities });
      }
    }, [data]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (setData) {
        setData(formValues);
      }
    };

    return (
      <div className="bg-white rounded-lg pt-6">
        <form onSubmit={handleSubmit}>
          {/* Service Package Selections for each facility */}
          {facilities.length > 0 ? (
            facilities.map((facility, index) => (
              <ServicePackageSelection 
                key={facility.id} 
                facilityName={facility.name} 
                facilityLetter={facility.letter}
                facilityId={facility.id}
                ref={facilityRefs[index]}
                data={{
                  facilityId: facility.id,
                  facilityName: facility.name,
                  facilityLetter: facility.letter,
                  selectedPackage: formValues.facilities[index]?.selectedPackage || "",
                  selectedDuration: formValues.facilities[index]?.selectedDuration || "12",
                }}
                setData={(data) => updateFacilityData(index, data)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {t("noFacilities")}
            </div>
          )}
        </form>
      </div>
    );
  }
);

ServiceSelectionForm.displayName = "ServiceSelectionForm";

export default ServiceSelectionForm; 