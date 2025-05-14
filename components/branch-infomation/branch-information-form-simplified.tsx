"use client"

import React, { useState, forwardRef, useImperativeHandle, useEffect, createRef } from "react"
import { useTranslations } from "next-intl"
import BranchForm from "./branch-form"
import Plus from "@/assets/icons/plus.svg"
import * as z from "zod"

// Define the branch schema
export const branchSchema = z.object({
  branchName: z.string().min(2, { message: "Branch name must be at least 2 characters" }),
  branchPhone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  branchAddress: z.string().optional(),
  deviceCount: z.string().min(1, { message: "Must have at least 1 device" }),
});

export type BranchData = z.infer<typeof branchSchema>;

// Define array of branches schema
export const branchesSchema = z.array(branchSchema);

export type BranchesFormValues = {
  branches: BranchData[];
}

interface BranchInformationFormProps {
  data?: Partial<BranchesFormValues>;
  setData?: (data: BranchesFormValues) => void;
}

const BranchInformationForm = forwardRef<{ validate: () => Promise<boolean> }, BranchInformationFormProps>(
  ({ data = {}, setData }, ref) => {
    const t = useTranslations("branchInfo")
    const [branches, setBranches] = useState([0]) // Start with one branch
    const [branchFormRefs, setBranchFormRefs] = useState<Array<React.RefObject<{validate: () => Promise<boolean>}>>>([]);
    const [formValues, setFormValues] = useState<BranchesFormValues>({
      branches: data.branches || [{ branchName: "", branchPhone: "", branchAddress: "", deviceCount: "1" }]
    });

    // Initialize refs when branches change
    useEffect(() => {
      setBranchFormRefs(branches.map(() => createRef()));
    }, [branches]);

    // Get letter based on index (0 -> A, 1 -> B, etc.)
    const getLetter = (index: number) => {
      return String.fromCharCode(65 + index) // ASCII: 65 = 'A'
    }

    const addBranch = () => {
      const newIndex = Math.max(...branches) + 1;
      setBranches([...branches, newIndex]);
      setFormValues(prev => ({
        branches: [...prev.branches, { branchName: "", branchPhone: "", branchAddress: "", deviceCount: "1" }]
      }));
    }

    // Update a specific branch's data
    const updateBranchData = (index: number, data: BranchData) => {
      setFormValues(prev => {
        const newBranches = [...prev.branches];
        newBranches[index] = data;
        return { branches: newBranches };
      });
    }

    // Expose validate method to parent
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // Validate all branch forms
        const results = await Promise.all(
          branchFormRefs.map(branchRef => branchRef.current?.validate() || Promise.resolve(false))
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
      if (data?.branches && data.branches.length > 0) {
        setFormValues({ branches: data.branches });
        
        // Update branches array if needed
        if (data.branches.length > branches.length) {
          const newBranches = Array.from({ length: data.branches.length }, (_, i) => i);
          setBranches(newBranches);
        }
      }
    }, [data, branches.length]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (setData) {
        setData(formValues);
      }
    }

    return (
      <div className="bg-white rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          {/* Branch Forms */}
          {branches.map((branchIndex, index) => (
            <BranchForm 
              key={branchIndex} 
              index={branchIndex} 
              letter={getLetter(index)} 
              ref={branchFormRefs[index]}
              data={formValues.branches[index]}
              setData={(data) => updateBranchData(index, data)}
            />
          ))}

          {/* Add Branch Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={addBranch}
              className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-[#0C9BEB] bg-[#0267AB] text-white hover:bg-white hover:text-[#0267AB] transition-colors group"
            >
              <span className="inline-block w-5 h-6 text-white group-hover:text-[#0267AB]">
                <Plus className="w-full h-full" />
              </span>
              <span>{t("addBranch")}</span>
            </button>
          </div>
        </form>
      </div>
    )
  }
);

BranchInformationForm.displayName = "BranchInformationForm";

export default BranchInformationForm; 