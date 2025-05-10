// "use client"

// import { useTranslations } from "next-intl"
// import Link from "next/link"

// const modelsData = [
//   { 
//     name: "G300", 
//     price: "3.600.000 VND", 
//     suffixKey: "per12Months",
//     features: [
//       "modelFeatures.oneTimeMaintenance",
//       "modelFeatures.twoMobileAccounts",
//       "modelFeatures.twoNotificationNumbers"
//     ],
//     buttonKey: "registerButton",
//     vatKey: "vatNote"
//   },
//   { 
//     name: "G400", 
//     price: "4.800.000 VND", 
//     suffixKey: "per12Months",
//     features: [
//       "modelFeatures.oneTimeMaintenance",
//       "modelFeatures.fiveMobileAccounts",
//       "modelFeatures.fiveNotificationNumbers"
//     ],
//     buttonKey: "registerButton",
//     vatKey: "vatNote"
//   },
//   {  
//     name: "G500", 
//     price: "6.000.000 VND", 
//     suffixKey: "per12Months",
//     features: [
//       "modelFeatures.twoTimeMaintenance",
//       "modelFeatures.tenMobileAccounts",
//       "modelFeatures.tenNotificationNumbers"
//     ],
//     buttonKey: "registerButton",
//     vatKey: "vatNote"
//   },
//   { 
//     name: "Priority", 
//     price: "2.400.000 VND", 
//     suffixKey: "per12Months",
//     isPriority: true,
//     features: [
//       "modelFeatures.twoTimeMaintenance",
//       "modelFeatures.fiveMobileAccounts",
//       "modelFeatures.fiveNotificationNumbers"
//     ],
//     buttonKey: "registerButton",
//     vatKey: "vatNote"
//   }
// ];

// export default function PricingModelList() {
//   const t = useTranslations("pricing")

//   return (
//     // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {modelsData.map((model, index) => (
//         // <div key={index} className="bg-white p-6 rounded-lg shadow-lg border flex flex-col justify-between">
//         <div key={index} className="bg-white p-4 rounded-lg shadow border">
//           <div>
//             <h3 className="text-xl font-bold text-blue-600 mb-1">
//               GSafe {model.name}
//               {model.isPriority && <span className="text-red-500 text-lg ml-1">*</span>}
//             </h3>
//             <p className="text-lg font-bold mb-1">
//               {model.price}
//               <span className="text-xs font-normal text-gray-500">/{t(model.suffixKey)}</span>
//             </p>
//             <ul className="mb-6 text-sm mt-4">
//               {model.features.map((featureKey, fIndex) => (
//                 <li key={fIndex} className="flex items-start mb-2"> {/* items-start để căn đều khi text dài */}
//                   <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
//                   <span>{t(featureKey)}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <Link
//               href={`/products/${model.name.toLowerCase()}`}
//               className="bg-blue-600 text-white px-4 py-3 rounded-md font-semibold inline-block w-full text-center hover:bg-blue-700 transition-colors text-base" // Tăng padding và font-size
//             >
//               {t(model.buttonKey)}
//             </Link>
//             <p className="text-xs text-gray-500 text-center mt-2">({t(model.vatKey)})</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import ellipseIcon from "@/assets/img/ellipse.png"
import { Button } from "@/components/ui/button"

const modelsData = [
  { 
    name: "G300", 
    price: "3.600.000 VND", 
    suffixKey: "per12Months",
    features: [
      "modelFeatures.oneTimeMaintenance",
      "modelFeatures.twoMobileAccounts",
      "modelFeatures.twoNotificationNumbers"
    ],
    isPriority: false
  },
  { 
    name: "G400", 
    price: "4.800.000 VND", 
    suffixKey: "per12Months",
    features: [
      "modelFeatures.oneTimeMaintenance",
      "modelFeatures.fiveMobileAccounts",
      "modelFeatures.fiveNotificationNumbers"
    ],
    isPriority: false
  },
  { 
    name: "G500", 
    price: "6.000.000 VND", 
    suffixKey: "per12Months",
    features: [
      "modelFeatures.twoTimeMaintenance",
      "modelFeatures.tenMobileAccounts",
      "modelFeatures.tenNotificationNumbers"
    ],
    isPriority: false
  },
  { 
    name: "Priority", 
    price: "2.400.000 VND", 
    suffixKey: "per12Months",
    features: [
      "modelFeatures.twoTimeMaintenance",
      "modelFeatures.fiveMobileAccounts",
      "modelFeatures.fiveNotificationNumbers"
    ],
    isPriority: true
  }
]

export default function PricingModelList() {
  const t = useTranslations("pricing")

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {modelsData.map((model, index) => (
        <div key={index} className="bg-white p-0 rounded-2xl shadow-md border flex flex-col justify-between overflow-hidden">
          
          {/* Header: Name + Price */}
          <div className="bg-[#E0F1FE] px-6 pt-6 pb-4 rounded-t-2xl">
            <h3 className="text-[38px] font-bold text-[#0267AB] mb-1 leading-tight">
              GSafe {model.name}
              {model.isPriority && <span className="text-red-500 text-[38] align-top">*</span>}
            </h3>
            <p className="text-[24px] font-bold text-[#252627]">
              {model.price}
              <span className=" text-[14px] font-medium text-[#252627] mt-1">/ {t(model.suffixKey)}</span>
            </p>
          </div>

          {/* Features */}
          <div className="px-6 pt-4 pb-6 flex flex-col justify-between flex-1">
            <ul className="mt-2 space-y-3">
              {model.features.map((featureKey, fIndex) => (
                <li key={fIndex} className="flex items-start text-[#686D72] text-[16px] font-medium">
                  <Image 
                    src={ellipseIcon} 
                    alt="bullet" 
                    width={25} 
                    height={25} 
                    className="mr flex-shrink-0"
                  />
                  <span>{t(featureKey)}</span>
                </li>
              ))}
            </ul>

            {/* Register Button */}
            <div className="">
              {/* <Link
                href={`/products/${model.name.toLowerCase()}`}
                className="bg-[#0267AB] hover:bg-[#065386] transition-colors text-white w-full block text-center py-3 rounded-md font-bold text-base"
              >
                {t("registerButton")}
              </Link>
              <p className="text-[14px] font-medium text-[#686D72] text-center mt-2">({t("vatNote")})</p> */}
              <div className="flex justify-center mt-6">
                <Button
                  href="/buy"
                  className="px-8 py-6 rounded-2xl bg-[#0267AB] border-2 border-[#0C9BEB] text-white hover:bg-white hover:text-[#0267AB] font-bold text-base w-full max-w-[180px] text-center"
                >
                  {t("registerButton")}
                </Button>
              </div>

              <p className="text-[14px] font-medium text-[#686D72] text-center mt-2">({t("vatNote")})</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
