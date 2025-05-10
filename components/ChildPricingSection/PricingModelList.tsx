"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"

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
    buttonKey: "registerButton",
    vatKey: "vatNote"
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
    buttonKey: "registerButton",
    vatKey: "vatNote"
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
    buttonKey: "registerButton",
    vatKey: "vatNote"
  },
  { 
    name: "Priority", 
    price: "2.400.000 VND", 
    suffixKey: "per12Months",
    isPriority: true,
    features: [
      "modelFeatures.twoTimeMaintenance",
      "modelFeatures.fiveMobileAccounts",
      "modelFeatures.fiveNotificationNumbers"
    ],
    buttonKey: "registerButton",
    vatKey: "vatNote"
  }
];

export default function PricingModelList() {
  const t = useTranslations("pricing")

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {modelsData.map((model, index) => (
        // <div key={index} className="bg-white p-6 rounded-lg shadow-lg border flex flex-col justify-between">
        <div key={index} className="bg-white p-4 rounded-lg shadow border">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-1">
              GSafe {model.name}
              {model.isPriority && <span className="text-red-500 text-lg ml-1">*</span>}
            </h3>
            <p className="text-lg font-bold mb-1">
              {model.price}
              <span className="text-xs font-normal text-gray-500">/{t(model.suffixKey)}</span>
            </p>
            <ul className="mb-6 text-sm mt-4">
              {model.features.map((featureKey, fIndex) => (
                <li key={fIndex} className="flex items-start mb-2"> {/* items-start để căn đều khi text dài */}
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                  <span>{t(featureKey)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link
              href={`/products/${model.name.toLowerCase()}`}
              className="bg-blue-600 text-white px-4 py-3 rounded-md font-semibold inline-block w-full text-center hover:bg-blue-700 transition-colors text-base" // Tăng padding và font-size
            >
              {t(model.buttonKey)}
            </Link>
            <p className="text-xs text-gray-500 text-center mt-2">({t(model.vatKey)})</p>
          </div>
        </div>
      ))}
    </div>
  )
}