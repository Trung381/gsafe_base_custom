// "use client"

// import { useTranslations } from "next-intl"
// import Image from "next/image"
// import Link from "next/link"
// import DeviceImage from "@/assets/img/device.png"
// import { Button } from "@/components/ui/button"

// export default function ModelG6Card() {
//   const t = useTranslations("modelG6")
//   const t2 = useTranslations()
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg flex">
//       <div className="w-1/3 bg-[#E0F1FE] flex items-center justify-center p-4"> {/* Thêm padding và flex centering cho ảnh */}
//         <Image
//           src={DeviceImage}
//           alt="GSafe G6 Model"
//         //   width={200} // Bạn có thể điều chỉnh kích thước này
//         //   height={200} // Bạn có thể điều chỉnh kích thước này
//           className="object-contain" // Đảm bảo ảnh hiển thị tốt
//         />
//       </div>
//       <div className="w-1/2 pl-6"> {/* Thêm padding-left cho phần text */}
//         <h3 className="text-xl font-bold text-blue-600 mb-2">{t("title")}</h3>
//         <p className="text-2xl font-bold mb-4">
//           {t("price")}
//           <span className="text-sm font-normal text-gray-500">/{t("productSuffix", { ns: "pricing"})}</span>
//         </p>
//         <ul className="mb-6">
//           <li className="flex items-center mb-2">
//             <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
//             <span>{t("features.fireAlert")}</span>
//           </li>
//           <li className="flex items-center mb-2">
//             <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
//             <span>{t("features.compatible")}</span>
//           </li>
//           <li className="flex items-center mb-2">
//             <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
//             <span>{t("features.largeScale")}</span>
//           </li>
//         </ul>
//         <div className="text-sm text-gray-600 mb-4">
//           <p className="font-semibold text-red-600">* {t("fromDeviceTwo")}</p>
//           <p>- {t("pricePrefix")} 100.000VND / {t("perMonth")} / {t("perDevice")}</p>
//           <p>- {t("subscription")}</p>
//         </div>
//         {/* <Link
//           href="/products/g6"
//           className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium inline-block hover:bg-blue-700 transition-colors"
//         >
//           {t2("viewDetails")}
//         </Link> */}
//         <Button
//               href="/buy"
//               size="lg"
//               className="rounded-2xl bg-[#0267AB] border-2 border-[#0C9BEB] text-white hover:bg-[#0267AB] hover:text-[#0267AB] hover:bg-white"
//             >
//               {t2("viewDetails")}
//         </Button>
//       </div>
//     </div>
//   )
// }

"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import DeviceImage from "@/assets/img/device.png"
import EllipseImage from "@/assets/img/ellipse.png"
import { Button } from "@/components/ui/button"

export default function ModelG6Card() {
  const t = useTranslations("modelG6")
  const t2 = useTranslations()

  return (
    // <div className="bg-white p-6 rounded-2xl shadow-lg flex w-full h-full">
    //   {/* LEFT: Image + Button */}
    //   <div className="w-2/5 bg-[#E0F1FE] flex flex-col items-center justify-between p-4 rounded-xl h-full">
    <div className="bg-white my-2 rounded-2xl shadow-lg flex w-full h-full border-t border-b border-l border-gray-200">
      {/* LEFT: Image + Button */}
      <div className="w-2/5 bg-[#E0F1FE] flex flex-col items-center justify-between p-4 rounded-s-xl h-full">
        <Image
          src={DeviceImage}
          alt="GSafe G6 Model"
          className="object-contain mb-4"
        />
        <Button
          href="/buy"
          size="lg"
          className="rounded-2xl bg-[#0267AB] border-2 border-[#0C9BEB] text-white hover:bg-white hover:text-[#0267AB]"
        >
          {t2("viewDetails")}
        </Button>
      </div>

      {/* RIGHT: Content */}
      <div className="w-3/5 pl-6 flex flex-col justify-center">
        <h3 className="text-[38px] font-bold text-[#0267AB] mb-2">{t("title")}</h3>
        <p className="text-[38px] font-bold text-[#252627] mb-0">
          {t("price")}
          <span className="text-[14px] font-medium text-[#252627] ml-1">
            /{t("productSuffix", { ns: "pricing" })}
          </span>
        </p>

        <ul className="mb-6 mt-4 space-y-3">
          {[t("features.fireAlert"), t("features.compatible"), t("features.largeScale")].map((text, idx) => (
            <li key={idx} className="flex items-center text-[20px] font-medium text-[#686D72]">
              <Image
                src={EllipseImage}
                alt="bullet"
                width={20}
                height={20}
                className="mr-1.4 flex-shrink-0"
              />
              {text}
            </li>
          ))}
        </ul>

        <div className="text-[20px] font-medium text-[#686D72] space-y-1">
          <p className="font-bold text-[#0267AB]"><span className="text-red-500 text-[15px] align-top ">*</span>{t("fromDeviceTwo")}</p>
          <p>- {t("pricePrefix")} 100.000VND / {t("perMonth")} / {t("perDevice")}</p>
          <p>- {t("subscription")}</p>
        </div>
      </div>
    </div>
  )
}
