"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import LogoWhite from "@/assets/img/logo-white.png"
import Cute from "@/assets/img/cute.png"

export default function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t("company")}</h3>
            <p className="mb-2">{t("address")}</p>
            <p className="mb-2">{t("email")}</p>
            <p className="mb-2">{t("hotline")}</p>
            <p>{t("service")}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("partners")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-300">
                  {t("construction")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  {t("pccc")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  {t("tech")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-300">
                  {t("insurance")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <Image src={LogoWhite} alt="GEIC Logo" width={120} height={50} className="mb-4" />
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="hover:text-blue-300">
                <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="#" className="hover:text-blue-300">
                <Image src="/twitter.svg" alt="Twitter" width={24} height={24} />
              </Link>
              <Link href="#" className="hover:text-blue-300">
                <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
              </Link>
              <Link href="#" className="hover:text-blue-300">
                <Image src="/youtube.svg" alt="YouTube" width={24} height={24} />
              </Link>
            </div>
            <Image src={Cute} alt="Mascot" width={100} height={100} />
          </div>
        </div>

        <div className="border-t border-blue-800 pt-6 text-center">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
