"use client"

import type React from "react"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ArrowRight from "@/assets/icons/arrow-right.svg"
import ArrowLeft from "@/assets/icons/arrow-left.svg"
import Plus from "@/assets/icons/plus.svg"
import PageTitle from "@/components/page-title"
import { useState } from "react"
import BranchForm from "./branch-form"
import BranchInfoImg from "/assets/img/branch-information.png"

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
    <div suppressHydrationWarning={true}>
      {/* Page Title */}
      <PageTitle title={t("title")} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
        {/* Progress Indicator */}
        <div className="w-full mb-8 flex justify-center">
          <Image
            src={BranchInfoImg}
            alt="Registration Progress"
            width={500}
            height={80}
            className="w-auto h-auto"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
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

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-8 py-2 rounded-full border border-[#0C9BEB] bg-white text-[#0267AB] hover:bg-[#0267AB] hover:text-white transition-colors group"
            >
              <span className="inline-block w-11 h-4 text-[#0267AB] group-hover:text-white">
                <ArrowLeft className="w-full h-full" />
              </span>
              <span className="font-medium">BACK</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-2 rounded-full border border-[#686D72] bg-white text-[#686D72] hover:bg-[#0267AB] hover:text-white transition-colors group"
            >
              <span className="font-medium">NEXT</span>
              <span className="inline-block w-11 h-4 text-[#686D72] group-hover:text-white">
                <ArrowRight className="w-full h-full" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
