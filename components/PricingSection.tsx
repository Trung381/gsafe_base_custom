"use client"

import PricingTitle from './ChildPricingSection/PricingTitle'
import ModelG6Card from './ChildPricingSection/ModelG6Card'
import CommonFeatures from './ChildPricingSection/CommonFeatures'
import PricingModelList from './ChildPricingSection/PricingModelList'
import PricingNote from './ChildPricingSection/PricingNote'

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import DeviceImage from "@/assets/img/device.png"

export default function PricingSection() {
  const t = useTranslations("pricing")

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <PricingTitle />

        <ModelG6Card />

        <CommonFeatures />

        <PricingModelList />

        <PricingNote />
      </div>
    </section>
  )
}




// export default function PricingSection() {
//   return (
//     <section className="py-16 bg-[#F4F9FF]"> {/* Thêm background cho section */}
//       <div className="container mx-auto px-4">
//         <PricingTitle />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-stretch"> {/* Thêm items-stretch */}
//           <ModelG6Card />
//           <CommonFeatures />
//         </div>
//         <PricingModelList />
//         <PricingNote />
//       </div>
//     </section>
//   )
// }