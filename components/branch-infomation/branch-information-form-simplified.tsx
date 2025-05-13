"use client"

import type React from "react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import BranchForm from "./branch-form"
import Plus from "@/assets/icons/plus.svg"

export default function BranchInformationForm() {
  const t = useTranslations("branchInfo")
  const [branches, setBranches] = useState([0]) // Start with one branch

  // Get letter based on index (0 -> A, 1 -> B, etc.)
  const getLetter = (index: number) => {
    return String.fromCharCode(65 + index) // ASCII: 65 = 'A'
  }

  const addBranch = () => {
    setBranches([...branches, branches.length])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        {/* Branch Forms */}
        {branches.map((branchIndex, index) => (
          <BranchForm key={branchIndex} index={branchIndex} letter={getLetter(index)} />
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