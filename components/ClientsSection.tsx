// "use client"

// import { useTranslations } from "next-intl"
// import Image from "next/image"
// import quote from "@/assets/img/quote.png"
// import avata from "@/assets/img/avata.png"

// export default function ClientsSection() {
//   const t = useTranslations("clients")

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>

//         <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
//           {["construction", "pccc", "tech", "insurance", "smart-city"].map((client, index) => (
//             <div key={index} className="flex justify-center">
//               <div className="bg-blue-100 p-4 rounded-lg w-24 h-24 flex items-center justify-center">
//                 <Image src={`@/assets/img/${client}.png`} alt={`Client ${index + 1}`} width={60} height={60} />
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="md:w-1/12 text-4xl text-blue-300 mb-4 md:mb-0">
//               <Image src={quote} alt="Quote icon"/>
//             </div>
//             <div className="md:w-10/12 px-4">
//               <p className="text-gray-600 italic mb-4">{t("testimonial.text")}</p>
//               <div className="flex items-center">
//                 <Image src={avata} alt="User Avatar" width={40} height={40} className="rounded-full mr-3" />
//                 <div>
//                   <p className="font-bold">{t("testimonial.author")}</p>
//                   <p className="text-sm text-gray-500">{t("testimonial.position")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }




"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

import quoteIcon from "@/assets/img/quote.png"
import avatarImg from "@/assets/img/avata.png"

import construction from "@/assets/img/construction.png"
import pccc         from "@/assets/img/pccc.png"
import tech         from "@/assets/img/tech.png"
import insurance    from "@/assets/img/insurance.png"
import smartCity    from "@/assets/img/smart-city.png"

const clientLogos = [
  { img: construction, labelKey: "construction" },
  { img: pccc,        labelKey: "pccc" },
  { img: tech,        labelKey: "tech" },
  { img: insurance,   labelKey: "insurance" },
  { img: smartCity,   labelKey: "smartCity" },
]

export default function ClientsSection() {
  const t = useTranslations("clients")

  return (
    <section className="relative py-20 overflow-hidden">
      {/* gradient top & bottom */}
      {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0267AB33] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0267AB33] to-transparent" /> */}

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0267AB33] to-transparent" />
      </div>

      {/* main container */}
      <div className="relative z-10 container mx-auto px-4">

        {/* Title */}
        <h2 className="text-[46px] font-bold text-[#252627] text-center mb-14">
          {t("title")}
        </h2>

        {/* Clients */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 m mb-16">
          {clientLogos.map(({ img, labelKey }, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden text-center shadow-sm">
              {/* Icon section with blue bg, only top corners rounded */}
              <div className="bg-[#E0F1FE] pt-6 pb-4 flex items-center justify-center rounded-t-2xl m-3">
                <Image
                  src={img}
                  alt={t(`labels.${labelKey}`)}
                  width={56}
                  height={56}
                  // className="max-with-[56]"
                  className="h-[56px] w-auto object-contain"
                />
              </div>
          
              {/* Text under icon */}
              <div className="px-2 my-6">
                <p className="text-[#252627] text-[20px] font-semibold leading-snug">
                  {t(`labels.${labelKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>


        {/* Testimonial */}
        <div className="relative z-10 bg-white p-6 rounded-2xl shadow-md">
          {/* Quote Icon - Positioned absolutely */}
          <div className="absolute -top-4 -left-4 w-10 h-10">
            <Image src={quoteIcon} alt="Quote icon" width={40} height={40} />
          </div>

          <p className="text-[#0267AB] text-[20px] font-medium italic mb-4">
            {t("testimonial.text")}
          </p>

          <div className="flex items-center">
            <Image src={avatarImg} alt="User Avatar" width={40} height={40} className="rounded-full mr-3" />
            <div>
              <p className="text-[#252627] text-[20px] font-bold">
                {t("testimonial.author")}
              </p>
              <p className="text-[#686D72] text-[16px] font-medium">
                {t("testimonial.position")}
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
