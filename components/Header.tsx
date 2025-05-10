// "use client"

// import { useTranslations } from "next-intl"
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname, useRouter } from "next/navigation"
// import { useState } from "react"
// import logo from "@/assets/img/logo-gsafe.png"

// export default function Header() {
//   const t = useTranslations("nav")
//   const phone = useTranslations("phone")
//   const pathname = usePathname()
//   const router = useRouter()
//   const [locale, setLocale] = useState<"vi" | "en">("vi")

//   const changeLanguage = (newLocale: "vi" | "en") => {
//     setLocale(newLocale)
//     // In a real app, you would redirect to the same page but with a different locale
//     const newPath = pathname.replace(/^\/(vi|en)/, `/${newLocale}`)
//     router.push(newPath)
//   }

//   return (
//     <header className="bg-white shadow-sm">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <div className="flex items-center">
//           <Link href="/">
//             <Image src={logo} alt="GEIC Logo" width={80} height={30} />
//           </Link>
//           <nav className="hidden md:flex ml-10">
//             <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
//               {t("openLetter")}
//             </Link>
//             <Link href="/pricing" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
//               {t("pricesList")}
//             </Link>
//             <Link href="/legal" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
//               {t("legal")}
//             </Link>
//             <Link href="/docs" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
//               {t("guide")}
//             </Link>
//           </nav>
//         </div>

//         <div className="flex items-center">
//           <div className="flex items-center mr-4">
//             <button
//               onClick={() => changeLanguage("vi")}
//               className={`mr-2 ${locale === "vi" ? "opacity-100" : "opacity-50"}`}
//             >
//               <Image src="/vi-flag.png" alt="Vietnamese" width={24} height={16} />
//             </button>
//             <button
//               onClick={() => changeLanguage("en")}
//               className={`${locale === "en" ? "opacity-100" : "opacity-50"}`}
//             >
//               <Image src="/en-flag.png" alt="English" width={24} height={16} />
//             </button>
//           </div>
//           <div className="flex items-center bg-blue-600 text-white rounded-full px-4 py-1">
//             <Image src="/phone.svg" alt="Phone" width={20} height={20} className="mr-2" />
//             <div>
//               <div className="text-xs">{phone("label")}</div>
//               <div className="text-sm font-bold">{phone("number")}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }



"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import logo from "@/assets/img/logo-gsafe.png"
import CallIcon from "@/assets/img/call-btn.png"
import LangIcon from "@/assets/img/lang.png"

export default function Header() {
  const t = useTranslations("nav")
  const phone = useTranslations("phone")
  const pathname = usePathname()
  const router = useRouter()
  const [locale, setLocale] = useState<"vi" | "en">("vi")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const changeLanguage = (newLocale: "vi" | "en") => {
    setLocale(newLocale)
    setDropdownOpen(false)
    const newPath = pathname.replace(/^\/(vi|en)/, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} alt="GEIC Logo" width={80} height={30} />
          </Link>
          <nav className="hidden md:flex ml-10">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              {t("openLetter")}
            </Link>
            <Link href="/pricing" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              {t("pricesList")}
            </Link>
            <Link href="/legal" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              {t("legal")}
            </Link>
            <Link href="/docs" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
              {t("guide")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Call button */}
          <div className="flex items-center text-white rounded-xl px-3 py-1">
            <Image src={CallIcon} alt="Call" width={50} height={50} className="mr-2" />
            <div className="flex flex-col text-[#252627] leading-none">
              <span className="text-[20] font-semibold">{phone("label")}</span>
              <span className="text-[24] font-bold">{phone("number")}</span>
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {/* <Image
                src={`/assets/img/${locale}-flag.png`}
                alt={`${locale} flag`}
                width={24}
                height={16}
                className="rounded-full mr-1"
              /> */}
              <Image
                src={LangIcon}
                alt="language icon"
                width={60}
                height={60}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow z-50">
                <button
                  onClick={() => changeLanguage("vi")}
                  className="flex items-center px-3 py-2 hover:bg-gray-100 w-full"
                >
                  <Image src="/assets/img/lang.png" alt="Vietnamese" width={20} height={14} className="mr-2" />
                  Tiếng Việt
                </button>
                <button
                  onClick={() => changeLanguage("en")}
                  className="flex items-center px-3 py-2 hover:bg-gray-100 w-full"
                >
                  <Image src="/assets/img/lang.png" alt="English" width={20} height={14} className="mr-2" />
                  English
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
