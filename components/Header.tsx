"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, Button, Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import logo from "@/assets/img/logo-gsafe.png"
import CallIcon from "@/assets/img/call-btn.png"
import LangIcon from "@/assets/img/lang.png"
import VieFlag from "@/assets/img/vi-flag.png"
import EngFlag from "@/assets/img/en-flag.png"
import { Link, usePathname, useRouter } from "@/i18n/navigation"

export default function Header() {
  const t = useTranslations("nav")
  const phone = useTranslations("phone")
  const pathname = usePathname()
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState<"vi" | "en">("vi")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const pathLocale = pathname.split('/')[1]
    if (pathLocale === 'en' || pathLocale === 'vi') {
      setCurrentLocale(pathLocale as "vi" | "en")
    }

    // Kiểm tra kích thước màn hình
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [pathname])

  const changeLanguage = (newLocale: "vi" | "en") => {
    setDropdownOpen(false)
    router.replace(pathname, { locale: newLocale })
  }

  const menuItems = [
    { key: 'home', label: <Link href="/">{t("openLetter")}</Link> },
    { key: 'pricing', label: <Link href="/pricing">{t("pricesList")}</Link> },
    { key: 'device', label: <Link href="/device">{t("device")}</Link> },
    { key: 'legal', label: <Link href="/legal">{t("legal")}</Link> },
    { key: 'docs', label: <Link href="/docs">{t("guide")}</Link> },
  ]

  const renderMenu = () => (
    <Menu
      mode="horizontal"
      items={menuItems}
      className="border-0"
      style={{ background: 'transparent' }}
    />
  )

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} alt="GEIC Logo" width={80} height={30} />
          </Link>
          {!isMobile && <div className="ml-10">{renderMenu()}</div>}
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

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              className="ml-2"
            />
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          style={{ border: 'none' }}
        />
      </Drawer>
    </header>
  )
}
