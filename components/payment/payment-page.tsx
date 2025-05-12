"use client"

import type React from "react"

import PageTitle from '@/components/page-title';
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ArrowLeft from "@/assets/icons/arrow-left.svg"
import CheckPaymentImg from "@/assets/icons/check-payment.svg"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Mock data that would normally come from context
const mockOrderData = {
  facilities: [
    {
      id: 1,
      name: "A",
      devices: { count: 1, price: 6600000, label: "x1 sản phẩm" },
      package: { name: "GSafe 300", duration: "12 tháng", price: 3600000 },
      vat: 400000,
      total: 10600000,
    },
    {
      id: 2,
      name: "B",
      devices: { count: 1, price: 6600000, label: "x1 sản phẩm" },
      package: { name: "GSafe 300", duration: "12 tháng", price: 3600000 },
      vat: 400000,
      total: 10600000,
    },
  ],
  grandTotal: 23200000,
}

interface InvoiceFormData {
  companyName: string
  taxCode: string
  address: string
  email: string
  phone: string
}

export default function PaymentPage() {
  const t = useTranslations("payment")
  const router = useRouter()

  // State for invoice options
  const [wantInvoice, setWantInvoice] = useState<"yes" | "no">("no")
  const [invoiceFormData, setInvoiceFormData] = useState<InvoiceFormData>({
    companyName: "",
    taxCode: "",
    address: "",
    email: "",
    phone: "",
  })

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "cod">("qr")

  // State for QR code
  const [showQR, setShowQR] = useState(false)
  const [countdown, setCountdown] = useState(9 * 60 + 30) // 9 minutes and 30 seconds
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Handle invoice option change
  const handleInvoiceOptionChange = (value: string) => {
    setWantInvoice(value as "yes" | "no")
    if (value === "no") {
      // Clear form data if "no" is selected
      setInvoiceFormData({
        companyName: "",
        taxCode: "",
        address: "",
        email: "",
        phone: "",
      })
    }
  }

  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as "qr" | "cod")
    if (value === "cod") {
      // Hide QR code and reset countdown if COD is selected
      setShowQR(false)
      setCountdown(9 * 60 + 30)
    }
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInvoiceFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle QR code generation
  const handleGenerateQR = () => {
    setShowQR(true)
    setCountdown(9 * 60 + 30)

    // Simulate payment success after 5 seconds (for demo purposes)
    setTimeout(() => {
      setPaymentSuccess(true)
    }, 5000)
  }

  // Format countdown time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes} phút ${remainingSeconds} giây`
  }

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (showQR && countdown > 0 && !paymentSuccess) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [showQR, countdown, paymentSuccess])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")
    // Process payment and navigate to success page
  }

  return (
    <div>
        {/* Page Title */}
        <PageTitle title={t('title')} />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
          {/* Progress Indicator */}
          {/* <div className="w-full mb-8">
            <Image
              src="/assets/img/payment.png"
              alt="Registration Progress"
              width={1200}
              height={80}
              className="w-full h-auto"
            />
          </div> */}
    
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Information */}
            <div className="bg-[#F8FBFF] rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">{t("orderInformation")}</h2>
    
              {mockOrderData.facilities.map((facility) => (
                <div key={facility.id} className="mb-8">
                  <h3 className="text-[#0267AB] text-lg font-medium mb-4">
                    {t("facility")} {facility.name}:
                  </h3>
            
                  <div className="space-y-3">
                    <div className="flex justify-between py-2">
                      <div>
                        {t("devicesOrdered")} {facility.devices.label}
                      </div>
                      <div className="font-medium">{facility.devices.price.toLocaleString()} VND</div>
                    </div>
            
                    <div className="flex justify-between py-2">
                      <div>
                        {t("package")}({facility.package.name}) {facility.package.duration}
                      </div>
                      <div className="font-medium">{facility.package.price.toLocaleString()} VND</div>
                    </div>
            
                    <div className="flex justify-between py-2">
                      <div>
                        {t("vat")} {t("package")}
                      </div>
                      <div className="font-medium">{facility.vat.toLocaleString()} VND</div>
                    </div>
            
                    <div className="flex justify-between py-2 border-t">
                      <div>{t("subtotal")}</div>
                      <div className="font-medium">{facility.total.toLocaleString()} VND</div>
                    </div>
                  </div>
                </div>
              ))}
    
              <div className="flex justify-between py-4 border-t border-t-gray-400 text-lg font-bold text-[#0267AB]">
                <div>{t("grandTotal")}</div>
                <div>{mockOrderData.grandTotal.toLocaleString()} VND</div>
              </div>
            </div>
          
            {/* Payment Section */}
            <div className="bg-[#F8FBFF] rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">{t("payment")}</h2>
          
              {/* Invoice Option */}
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium">
                  <span className="text-red-500 mr-1">*</span> {t("wantInvoice")}
                </label>
                <RadioGroup value={wantInvoice} onValueChange={handleInvoiceOptionChange} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className={wantInvoice === "yes" ? "radio-item-wrapper-selected" : "radio-item-wrapper"}>
                      <RadioGroupItem
                        value="yes"
                        id="invoice-yes"
                        className={wantInvoice === "yes" ? "radio-item-selected" : "radio-item"}
                      />
                    </div>
                    <label htmlFor="invoice-yes" className="text-sm font-medium cursor-pointer">
                      {t("yes")}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={wantInvoice === "no" ? "radio-item-wrapper-selected" : "radio-item-wrapper"}>
                      <RadioGroupItem
                        value="no"
                        id="invoice-no"
                        className={wantInvoice === "no" ? "radio-item-selected" : "radio-item"}
                      />
                    </div>
                    <label htmlFor="invoice-no" className="text-sm font-medium cursor-pointer">
                      {t("no")}
                    </label>
                  </div>
                </RadioGroup>
              </div>
          
              {/* Invoice Form - Only shown if "yes" is selected */}
              {wantInvoice === "yes" && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="companyName" className="block mb-2 text-sm font-medium">
                      <span className="text-red-500 mr-1">*</span> {t("companyName")}
                    </label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={invoiceFormData.companyName}
                      onChange={handleInputChange}
                      placeholder={t("enterCompanyName")}
                      required
                    />
                  </div>
            
                  <div>
                    <label htmlFor="taxCode" className="block mb-2 text-sm font-medium">
                      <span className="text-red-500 mr-1">*</span> {t("taxCode")}
                    </label>
                    <Input
                      id="taxCode"
                      name="taxCode"
                      value={invoiceFormData.taxCode}
                      onChange={handleInputChange}
                      placeholder={t("enterTaxCode")}
                      required
                    />
                  </div>
            
                  <div>
                    <label htmlFor="address" className="block mb-2 text-sm font-medium">
                      <span className="text-red-500 mr-1">*</span> {t("address")}
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={invoiceFormData.address}
                      onChange={handleInputChange}
                      placeholder={t("enterAddress")}
                      required
                    />
                  </div>
            
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">
                      <span className="text-red-500 mr-1">*</span> {t("email")}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={invoiceFormData.email}
                      onChange={handleInputChange}
                      placeholder={t("enterEmail")}
                      required
                    />
                  </div>
            
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                      <span className="text-red-500 mr-1">*</span> {t("phone")}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={invoiceFormData.phone}
                      onChange={handleInputChange}
                      placeholder={t("enterPhone")}
                      required
                    />
                  </div>
                </div>
              )}
    
              {/* Payment Method */}
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium">
                  <span className="text-red-500 mr-1">*</span> {t("paymentMethod")}
                </label>
                <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className={paymentMethod === "qr" ? "radio-item-wrapper-selected" : "radio-item-wrapper"}>
                      <RadioGroupItem
                        value="qr"
                        id="payment-qr"
                        className={paymentMethod === "qr" ? "radio-item-selected" : "radio-item"}
                      />
                    </div>
                    <label htmlFor="payment-qr" className="text-sm font-medium cursor-pointer">
                      {t("qrPayment")}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={paymentMethod === "cod" ? "radio-item-wrapper-selected" : "radio-item-wrapper"}>
                      <RadioGroupItem
                        value="cod"
                        id="payment-cod"
                        className={paymentMethod === "cod" ? "radio-item-selected" : "radio-item"}
                      />
                    </div>
                    <label htmlFor="payment-cod" className="text-sm font-medium cursor-pointer">
                      {t("codPayment")}
                    </label>
                  </div>
                </RadioGroup>
              </div>
          
              {/* QR Code Section */}
              {paymentMethod === "qr" && !showQR && !paymentSuccess && (
                <div className="flex justify-center mt-6">
                  <Button
                    type="button"
                    onClick={handleGenerateQR}
                    className="bg-[#0267AB] text-white hover:bg-[#025a96] rounded-lg px-6 py-3 font-medium"
                  >
                    {t("generateQR")}
                  </Button>
                </div>
              )}
    
              {/* QR Code Display */}
              {paymentMethod === "qr" && showQR && !paymentSuccess && (
                <div className="flex flex-col items-center mt-6">
                  <div className="border-2 border-[#0267AB] p-4 rounded-lg mb-4">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="QR Code"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-full">
                    <p className="text-center">
                      {t("timeRemaining")}: <span className="font-bold">{formatTime(countdown)}</span>
                    </p>
                  </div>
                </div>
              )}
    
              {/* Payment Success Message */}
              {paymentSuccess && (
                <div className="flex flex-col items-center justify-center mt-6 p-6 ">
                  {/* <div className="text-[#0267AB] mb-2">
                    
                  </div>
                  <p className="text-[#0267AB] text-xl font-bold text-center">{t("paymentSuccess")}</p> */}
                  <CheckPaymentImg className="w-180 h-87 mx-auto" />
                </div>
              )}
            </div>
          </form>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-full border border-[#0267AB] text-[#0267AB] hover:bg-[#0267AB] hover:text-white group px-6"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              {t("back")}
            </Button>
          
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="rounded-full border border-[#0267AB] bg-white text-[#0267AB] hover:bg-[#0267AB] hover:text-white group px-6"
              onClick={handleSubmit}
              disabled={paymentMethod === "qr" && !paymentSuccess}
            >
              {t("complete")}
            </Button>
          </div>
        </div>
    </div>
  )
}
