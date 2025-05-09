"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export default function Header() {
  const t = useTranslations("nav")
  const phone = useTranslations("phone")
  const pathname = usePathname()
  const router = useRouter()
  const [locale, setLocale] = useState<"vi" | "en">("vi")

  const changeLanguage = (newLocale: "vi" | "en") => {
    setLocale(newLocale)
    // In a real app, you would redirect to the same page but with a different locale
    const newPath = pathname.replace(/^\/(vi|en)/, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="GEIC Logo" width={80} height={30} />
          </Link>
          <nav className="hidden md:flex ml-10">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              {t("home")}
            </Link>
            <Link href="/pricing" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              {t("about")}
            </Link>
            <Link href="/legal" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              {t("products")}
            </Link>
            <Link href="/docs" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              {t("contact")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <button
              onClick={() => changeLanguage("vi")}
              className={`mr-2 ${locale === "vi" ? "opacity-100" : "opacity-50"}`}
            >
              <Image src="/vi-flag.png" alt="Vietnamese" width={24} height={16} />
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`${locale === "en" ? "opacity-100" : "opacity-50"}`}
            >
              <Image src="/en-flag.png" alt="English" width={24} height={16} />
            </button>
          </div>
          <div className="flex items-center bg-blue-600 text-white rounded-full px-4 py-1">
            <Image src="/phone.svg" alt="Phone" width={20} height={20} className="mr-2" />
            <div>
              <div className="text-xs">{phone("label")}</div>
              <div className="text-sm font-bold">{phone("number")}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
