// 'use client';

// import React, { useState } from 'react';
// import { Steps, Popover } from 'antd';
// import type { StepsProps } from 'antd';
// import { useTranslations } from 'next-intl';
// import CustomerRegistrationForm from '@/components/customer-registration-form';
// import BranchInformationForm from '@/components/branch-infomation/branch-information-form';
// import ServiceSelectionForm from '@/components/plan-duration/service-selection-form';
// import PaymentPage from '@/components/payment/payment-page';
// import ArrowRight from "@/assets/icons/arrow-right.svg";
// import ArrowLeft from "@/assets/icons/arrow-left.svg";
// import { usePathname, useRouter } from '@/i18n/navigation';

// // Custom dot với Popover như yêu cầu
// const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
//   <Popover
//     content={
//       <span>
//         step {index + 1} status: {status}
//       </span>
//     }
//   >
//     {dot}
//   </Popover>
// );

// export default function DeviceTestPage() {
//   const t = useTranslations();
//   const pathname = usePathname();
//   const router = useRouter();
//   const [currentStep, setCurrentStep] = useState(0);

//   // Danh sách các bước
//   const steps = [
//     {
//       title: 'Thông tin khách hàng',
//       content: <CustomerRegistrationForm />,
//     },
//     {
//       title: 'Thông tin cơ sở',
//       content: <BranchInformationForm />,
//     },
//     {
//       title: 'Chọn gói dịch vụ',
//       content: <ServiceSelectionForm />,
//     },
//     {
//       title: 'Thanh toán',
//       content: <PaymentPage />,
//     },
//   ];

//   // Đi đến bước trước đó
//   const prev = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   // Đi đến bước tiếp theo
//   const next = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   // Hoàn thành đăng ký
//   const done = () => {
//     console.log('Đăng ký hoàn tất!');
//     // Xử lý hoàn tất đăng ký, có thể chuyển hướng đến trang cảm ơn
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Steps Bar */}
//         <div className="mb-10">
//           <Steps
//             current={currentStep}
//             progressDot={customDot}
//             items={steps.map(item => ({
//               title: item.title,
//             }))}
//           />
//         </div>

//         {/* Component Content */}
//         <div className="mb-12">
//           {steps[currentStep].content}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between">
//           {currentStep > 0 && (
//             <button
//               onClick={prev}
//               className="inline-flex items-center justify-center gap-2 px-8 py-2 rounded-full border border-[#0267AB] bg-white text-[#0267AB] hover:bg-[#0267AB] hover:text-white transition-colors group"
//             >
//               <span className="inline-block w-11 h-4 text-[#0267AB] group-hover:text-white">
//                 <ArrowLeft className="w-full h-full" />
//               </span>
//               <span className="font-medium">QUAY LẠI</span>
//             </button>
//           )}
          
//           {currentStep < steps.length - 1 && (
//             <button
//               onClick={next}
//               className="inline-flex items-center justify-center gap-2 px-8 py-2 rounded-full border border-[#0267AB] bg-white text-[#0267AB] hover:bg-[#0267AB] hover:text-white transition-colors group ml-auto"
//             >
//               <span className="font-medium">TIẾP THEO</span>
//               <span className="inline-block w-11 h-4 text-[#0267AB] group-hover:text-white">
//                 <ArrowRight className="w-full h-full" />
//               </span>
//             </button>
//           )}
          
//           {currentStep === steps.length - 1 && (
//             <button
//               onClick={done}
//               className="inline-flex items-center justify-center gap-2 px-8 py-2 rounded-full border border-[#0267AB] bg-[#0267AB] text-white hover:opacity-90 transition-colors ml-auto"
//             >
//               <span className="font-medium">HOÀN TẤT</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// } 






"use client"

import { useTranslations } from "next-intl"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import CheckPaymentImg from "@/assets/icons/check-payment.svg"
import Image from "next/image"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// Define the invoice form schema
const invoiceFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  taxCode: z.string().min(5, { message: "Tax code is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
});

type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

// Define the payment form schema
const paymentFormSchema = z.object({
  wantInvoice: z.enum(["yes", "no"]),
  paymentMethod: z.enum(["qr", "cod"]),
  // Make invoice fields conditional based on wantInvoice
  invoiceData: z.union([
    z.object({}).optional(),
    invoiceFormSchema
  ]).optional(),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

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

interface PaymentFormProps {
  data?: Partial<PaymentFormValues>;
  setData?: (data: PaymentFormValues) => void;
}

const PaymentForm = forwardRef<{ validate: () => Promise<boolean> }, PaymentFormProps>(
  ({ data = {}, setData }, ref) => {
    const t = useTranslations("payment")
    
    const form = useForm<PaymentFormValues>({
      resolver: zodResolver(paymentFormSchema),
      defaultValues: {
        wantInvoice: data.wantInvoice || "no",
        paymentMethod: data.paymentMethod || "qr",
        invoiceData: data.invoiceData || {},
      },
      mode: "onChange", // Enable live validation
    });

    // State for QR code
    const [showQR, setShowQR] = useState(false)
    const [countdown, setCountdown] = useState(9 * 60 + 30) // 9 minutes and 30 seconds
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    // Expose the validate method to the parent component
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // If wantInvoice is "yes", validate invoice fields
        if (form.getValues().wantInvoice === "yes") {
          const result = await form.trigger(["wantInvoice", "paymentMethod", "invoiceData"]);
          if (result && setData) {
            setData(form.getValues());
          }
          return result;
        } else {
          // Otherwise, only validate the payment method
          const result = await form.trigger(["wantInvoice", "paymentMethod"]);
          if (result && setData) {
            setData(form.getValues());
          }
          return result;
        }
      }
    }));

    // Update form when external data changes
    useEffect(() => {
      if (data) {
        if (data.wantInvoice) form.setValue("wantInvoice", data.wantInvoice);
        if (data.paymentMethod) form.setValue("paymentMethod", data.paymentMethod);
        if (data.invoiceData) form.setValue("invoiceData", data.invoiceData);
      }
    }, [data, form]);

    // Handle invoice option change
    const handleInvoiceOptionChange = (value: string) => {
      form.setValue("wantInvoice", value as "yes" | "no");
      
      if (value === "no") {
        // Clear form data if "no" is selected
        form.setValue("invoiceData", {});
      }
      
      if (setData) {
        setData(form.getValues());
      }
    }

    // Handle payment method change
    const handlePaymentMethodChange = (value: string) => {
      form.setValue("paymentMethod", value as "qr" | "cod");
      
      if (value === "cod") {
        // Hide QR code and reset countdown if COD is selected
        setShowQR(false)
        setCountdown(9 * 60 + 30)
      }
      
      if (setData) {
        setData(form.getValues());
      }
    }

    // Handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      form.setValue(`invoiceData.${name}` as any, value);
      
      if (setData) {
        setData(form.getValues());
      }
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
      if (setData) {
        setData(form.getValues());
      }
    }

    const wantInvoice = form.watch("wantInvoice");
    const paymentMethod = form.watch("paymentMethod");
    
    // Helper function to safely get error messages
    const getFieldError = (fieldName: keyof InvoiceFormData): string | undefined => {
      const errors = form.formState.errors.invoiceData;
      if (!errors || typeof errors !== 'object') return undefined;
      
      // Type assertion to access errors as a record
      const fieldError = (errors as Record<string, any>)[fieldName];
      return fieldError?.message as string | undefined;
    };

    return (
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
                  value={form.watch("invoiceData.companyName") || ""}
                  onChange={handleInputChange}
                  placeholder={t("enterCompanyName")}
                  required
                />
                {getFieldError("companyName") && (
                  <div className="mt-1 text-sm text-red-500">{getFieldError("companyName")}</div>
                )}
              </div>
        
              <div>
                <label htmlFor="taxCode" className="block mb-2 text-sm font-medium">
                  <span className="text-red-500 mr-1">*</span> {t("taxCode")}
                </label>
                <Input
                  id="taxCode"
                  name="taxCode"
                  value={form.watch("invoiceData.taxCode") || ""}
                  onChange={handleInputChange}
                  placeholder={t("enterTaxCode")}
                  required
                />
                {getFieldError("taxCode") && (
                  <div className="mt-1 text-sm text-red-500">{getFieldError("taxCode")}</div>
                )}
              </div>
        
              <div>
                <label htmlFor="address" className="block mb-2 text-sm font-medium">
                  <span className="text-red-500 mr-1">*</span> {t("address")}
                </label>
                <Input
                  id="address"
                  name="address"
                  value={form.watch("invoiceData.address") || ""}
                  onChange={handleInputChange}
                  placeholder={t("enterAddress")}
                  required
                />
                {getFieldError("address") && (
                  <div className="mt-1 text-sm text-red-500">{getFieldError("address")}</div>
                )}
              </div>
        
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  <span className="text-red-500 mr-1">*</span> {t("email")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.watch("invoiceData.email") || ""}
                  onChange={handleInputChange}
                  placeholder={t("enterEmail")}
                  required
                />
                {getFieldError("email") && (
                  <div className="mt-1 text-sm text-red-500">{getFieldError("email")}</div>
                )}
              </div>
        
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                  <span className="text-red-500 mr-1">*</span> {t("phoneNumber")}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.watch("invoiceData.phone") || ""}
                  onChange={handleInputChange}
                  placeholder={t("enterPhoneNumber")}
                  required
                />
                {getFieldError("phone") && (
                  <div className="mt-1 text-sm text-red-500">{getFieldError("phone")}</div>
                )}
              </div>
            </div>
          )}
        
          {/* Payment Method Selection */}
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
                  {t("qrCode")}
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
                  {t("cod")}
                </label>
              </div>
            </RadioGroup>
          </div>
          
          {/* QR Code Payment Section (Only shown if QR is selected) */}
          {paymentMethod === "qr" && !showQR && (
            <div className="text-center py-4">
              <button
                type="button"
                onClick={handleGenerateQR}
                className="px-8 py-2 bg-[#0267AB] text-white rounded-full hover:bg-[#035690] transition-colors"
              >
                {t("generateQR")}
              </button>
            </div>
          )}
          
          {/* QR Code Display */}
          {paymentMethod === "qr" && showQR && (
            <div className="text-center p-4 border rounded-lg">
              {paymentSuccess ? (
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="w-16 h-16 text-green-500">
                    <CheckPaymentImg className="w-full h-full" />
                  </div>
                  <p className="text-lg font-medium text-green-600">{t("paymentSuccess")}</p>
                </div>
              ) : (
                <>
                  <div className="bg-white p-4 inline-block mb-4">
                    {/* Mock QR code image */}
                    <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
                      <p className="text-gray-600 text-sm">{t("qrCodePlaceholder")}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-2">
                    {t("scanToComplete")}: <span className="font-bold">{mockOrderData.grandTotal.toLocaleString()} VND</span>
                  </p>
                  <p className="text-sm text-red-500">
                    {t("qrExpires")}: {formatTime(countdown)}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </form>
    )
  }
);

PaymentForm.displayName = "PaymentForm";

export default PaymentForm; 