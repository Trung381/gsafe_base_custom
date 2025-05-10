"use client"

import Image from "next/image"
import Link from "next/link"
import baseImage from '@/assets/img/base.png'
import backgroundImage from '@/assets/img/backgorund.png'
import { useTranslations } from 'next-intl'
import Contact from '@/assets/icons/contact.svg';
import Shopping from '@/assets/icons/shopping.svg';
import { Button } from "@/components/ui/button";



export default function Hero() {
  const t = useTranslations("hero")

  return (
    <section className="relative min-h-screen w-full">
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10 min-h-screen">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t("title")}</h1>
          <p className="text-lg text-gray-600 mb-8">{t("subtitle")}</p>
          {/* <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-12 py-2.5 rounded-md font-medium text-center flex items-center justify-center min-w-[200px] hover:bg-blue-700 transition-colors"
            >
              {t("cta1")}
              <Contact className="fill-current ml-2" />
            </Link>
            <Link
              href="/buy"
              className="bg-white text-blue-600 border border-blue-600 px-12 py-2.5 rounded-md font-medium flex items-center justify-center min-w-[200px] hover:bg-blue-50 transition-colors"
            >
              {t("cta2")}
              <Image src="/cart.svg" alt="Cart" width={20} height={20} className="ml-2" />
            </Link>
          </div> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {/* <Button
              href="/contact"
              variant="default"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              icon={<Contact className="fill-current ml-2" />}
            >
              {t("cta1")}
            </Button> */}
            
            <Button
              href="/buy"
              variant="outline"
              size="lg"
              className="rounded-2xl border border-[#0267AB] text-[#0267AB] hover:bg-[#0267AB] hover:text-white group"
              icon={<Shopping className="mr-2 w-5 h-5" />}
            >
              {t("cta2")}
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
           
            <Image
              src={baseImage}
              alt="GSafe Device"
              // width={400}
              // height={300}
              className="relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
