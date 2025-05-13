import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "@/styles/antd.css"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "@/lib/get-messages"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GSafe - Thiết bị bảo cháy thông minh",
  description: "Bảo vệ tài sản và sinh mạng của bạn bằng công nghệ báo cháy hiện đại",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = params.locale || "vi"
  const messages = await getMessages(locale)

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
