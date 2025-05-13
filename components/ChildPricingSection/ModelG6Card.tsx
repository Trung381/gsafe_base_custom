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
    <div className="bg-white my-2 rounded-2xl shadow-lg flex flex-col lg:flex-row w-full h-full border-t border-b border-l border-gray-200">
      {/* LEFT: Image + Button */}
      <div className="w-full lg:w-2/5 bg-[#E0F1FE] flex flex-col items-center justify-between p-4 rounded-t-2xl lg:rounded-s-xl h-full">
        <Image
          src={DeviceImage}
          alt="GSafe G6 Model"
          className="object-contain mb-4"
        />
        <Button
          href="/device"
          size="lg"
          className="rounded-2xl bg-[#0267AB] border-2 border-[#0C9BEB] text-white hover:bg-white hover:text-[#0267AB]"
        >
          {t2("viewDetails")}
        </Button>
      </div>

      {/* RIGHT: Content */}
      <div className="w-full lg:w-3/5 pl-0 lg:pl-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-6 lg:py-0">
        <h3 className="text-[38px] font-bold text-[#0267AB] mb-2">{t("title")}</h3>
        <p className="text-[38px] font-bold text-[#252627] mb-0">
          {t("price")}
          <span className="text-[14px] font-medium text-[#252627] ml-1">
            /{t("productSuffix")}
          </span>
        </p>

        <ul className="mb-6 mt-4 space-y-3">
          {[t("features.fireAlert"), t("features.compatible"), t("features.largeScale")].map((text, idx) => (
            <li key={idx} className="flex items-center text-[20px] font-medium text-[#686D72] justify-center lg:justify-start">
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
