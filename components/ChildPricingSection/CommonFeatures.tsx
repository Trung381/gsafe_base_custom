// "use client"
// import { useTranslations } from "next-intl" 

// export default function CommonFeatures() {
//   const t = useTranslations("features");

//   return (
//     <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//       <h3 className="text-xl font-bold mb-4 text-left">
//         {t("title")}
//         {/* TÍNH NĂNG CHUNG CỦA TẤT CẢ CÁC GÓI */}
//       </h3>
//       <div className="grid grid-cols-1 gap-4">
//         <div className="flex items-center">
//           <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0">
           
//           </div>
//           <span>{t("support247")}</span>
//           {/* <span>Hỗ trợ khách hàng 24/7</span> */}
//         </div>
//         <div className="flex items-center">
//           <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0">
           
//           </div>
//           <span>{t("pccc")}</span>
//           {/* <span>Tự động báo cháy về trung tâm chỉ huy của lực lượng cảnh sát PCCC</span> */}
//         </div>
//         <div className="flex items-center">
//          <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0">
           
//           </div>
//           <span>{t("sim")}</span>
//           {/* <span>Sim data 4G</span> */}
//         </div>
//         <div className="flex items-center">
//          <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0">
           
//           </div>
//           <span>{t("monitoring")}</span>
//           {/* <span>Giám sát trực tuyến tình trạng hoạt động của thiết bị</span> */}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"
import TickIcon from "@/assets/img/tick-circle.png"

export default function CommonFeatures() {
  const t = useTranslations("features")

  return (
    <div className="bg-[#E0F1FE] p-6 rounded-2xl my-5">
      <h3 className="text-[24px] font-bold text-[#065386] mb-4">
        {t("title")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {[t("support247"), t("sim"), t("pccc"), t("monitoring")].map((text, index) => (
          <div key={index} className="flex items-start text-[16px] font-medium text-[#252627]">
            <Image
              src={TickIcon}
              alt="tick"
              width={20}
              height={20}
              className="mr-3 mt-[2px]"
            />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
