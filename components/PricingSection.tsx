"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function PricingSection() {
  const t = useTranslations("pricing")

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg flex">
            <div className="w-1/2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/G6.png-WdMxV6TEvtozGXMWDVIJSQ8nk49pd2.jpeg"
                alt="GSafe G6 Model"
                width={200}
                height={200}
                className="mb-4"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-xl font-bold text-blue-600 mb-2">MODEL G6</h3>
              <p className="text-2xl font-bold mb-4">6.600.000 VND</p>
              <ul className="mb-6">
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>{t("features.fireAlert")}</span>
                </li>
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>{t("features.autoShutdown")}</span>
                </li>
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>{t("features.remoteControl")}</span>
                </li>
              </ul>
              <div className="text-sm text-gray-600 mb-4">
                <p>
                  - {t("price.prefix")} 100.000VND / Tháng / {t("price.warranty")}
                </p>
                <p>- {t("price.subscription")}</p>
              </div>
              <Link
                href="/products/g6"
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium inline-block"
              >
                {t("viewDetails")}
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-center">TÍNH NĂNG CHUNG CỦA TẤT CẢ CÁC GÓI</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                <span>Hỗ trợ khách hàng 24/7</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                <span>Kết nối trực tiếp với trung tâm thông báo cháy của PCCC</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                <span>Giám sát trực tuyến tình trạng hoạt động của thiết bị</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {["G300", "G400", "G500", "Priority"].map((model, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow border">
              <h3 className="text-xl font-bold text-blue-600 mb-2">GSafe {model}</h3>
              <p className="text-lg font-bold mb-4">
                {index === 0 && "3.600.000 VND"}
                {index === 1 && "4.800.000 VND"}
                {index === 2 && "6.000.000 VND"}
                {index === 3 && "2.400.000 VND"}
              </p>
              <ul className="mb-6 text-sm">
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>1 bộ báo tự thiết lập</span>
                </li>
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>1 bộ Module truy cập ứng dụng di động</span>
                </li>
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  <span>Tự động thông báo khi có hiện tượng cháy</span>
                </li>
              </ul>
              <Link
                href={`/products/${model.toLowerCase()}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium inline-block w-full text-center"
              >
                ĐĂNG KÝ
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
