"use client"

import { useTranslations } from "next-intl"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState, forwardRef, useImperativeHandle, useEffect, createRef } from "react"
import ServicePackageSelection from "./service-package-selection"
import * as z from "zod"

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

// Mock facilities - this would normally come from context or props
const mockFacilities = [
  { id: 1, name: "Facility A", letter: "A" },
  { id: 2, name: "Facility B", letter: "B" },
];

interface ServiceSelectionFormProps {
  data?: Partial<ServiceSelectionFormValues>;
  setData?: (data: ServiceSelectionFormValues) => void;
}

const ServiceSelectionForm = forwardRef<{ validate: () => Promise<boolean> }, ServiceSelectionFormProps>(
  ({ data = {}, setData }, ref) => {
    const t = useTranslations("serviceSelection");
    const [facilityRefs, setFacilityRefs] = useState<Array<React.RefObject<{validate: () => Promise<boolean>}>>>([]);
    const [formValues, setFormValues] = useState<ServiceSelectionFormValues>({
      facilities: data.facilities || mockFacilities.map(facility => ({
        facilityId: facility.id,
        facilityName: facility.name,
        facilityLetter: facility.letter,
        selectedPackage: "",
        selectedDuration: "12",
      })),
    });

    // Initialize refs when facilities change
    useEffect(() => {
      setFacilityRefs(mockFacilities.map(() => createRef()));
    }, []);

    // Update a specific facility's data
    const updateFacilityData = (index: number, facilityData: Partial<FacilityServiceData>) => {
      setFormValues(prev => {
        const newFacilities = [...prev.facilities];
        newFacilities[index] = { ...newFacilities[index], ...facilityData };
        return { facilities: newFacilities };
      });
    };

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
    }));

    // Update form data when external data changes
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
      <div className="bg-white rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          {/* Service Package Selections for each facility */}
          {mockFacilities.map((facility, index) => (
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
          ))}
        </form>
      </div>
    );
  }
);

ServiceSelectionForm.displayName = "ServiceSelectionForm";

export default ServiceSelectionForm; 