"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState } from "react"
import logo from "@/assets/img/logo-gsafe.png"
import CallIcon from "@/assets/img/call-btn.png"
import LangIcon from "@/assets/img/lang.png"
import VieFlag from "@/assets/img/vi-flag.png"
import EngFlag from "@/assets/img/en-flag.png"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { MenuOutlined } from '@ant-design/icons'
import SidebarMenu from "./SidebarMenu"

export default function Header() {
  const t = useTranslations("nav")
  const phone = useTranslations("phone")
  const pathname = usePathname()
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const changeLanguage = (newLocale: "vi" | "en") => {
    setDropdownOpen(false)
    router.replace(pathname, { locale: newLocale })
  }

  const navLinks = [
    { href: "/", label: "openLetter" },
    { href: "/pricing", label: "pricesList" },
    { href: "/legal", label: "legal" },
    { href: "/docs", label: "guide" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} alt="GEIC Logo" width={80} height={30} />
          </Link>
          {/* Menu desktop */}
          <nav className="hidden lg:flex ml-10">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 flex-row-reverse lg:flex-row">
          {/* Call button desktop */}
          <div className="hidden lg:flex items-center text-white rounded-xl px-3 py-1">
            <Image src={CallIcon} alt="Call" width={50} height={50} className="mr-2" />
            <div className="flex flex-col text-[#252627] leading-none">
              <span className="text-[20] font-semibold">{phone("label")}</span>
              <span className="text-[24] font-bold">{phone("number")}</span>
            </div>
          </div>

          {/* Language Dropdown luôn hiện */}
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Image
                src={LangIcon}
                alt="language icon"
                width={80}
                height={80}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow z-50 min-w-[160px] whitespace-nowrap">
                <button
                  key="vi"
                  onClick={() => changeLanguage("vi")}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                >
                  <Image src={VieFlag} alt="Vietnamese" width={20} height={14} className="mr-2" />
                  Tiếng Việt
                </button>
                <button
                  key="en"
                  onClick={() => changeLanguage("en")}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                >
                  <Image src={EngFlag} alt="English" width={20} height={14} className="mr-2" />
                  English
                </button>
              </div>
            )}
          </div>

          {/* Icon menu mobile */}
          <button
            className="block lg:hidden ml-2 text-2xl text-[#222]"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <MenuOutlined />
          </button>
        </div>
      </div>
      {/* Sidebar cho mobile */}
      <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} navLinks={navLinks} />
    </header>
  )
}
