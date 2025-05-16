"use client"

import { useTranslations } from "next-intl"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from "react"
import CheckPaymentImg from "@/assets/icons/check-payment.svg"
import Image from "next/image"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRegistration } from "@/contexts/RegistrationContext"
import QRImg from "@/assets/img/qr.png"
import React from "react"


// Define the invoice form schema - simplified for clarity
const invoiceFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  taxCode: z.string().min(5, { message: "Tax code is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Phone number is required" })
});

type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

// Define the payment form schema
const paymentFormSchema = z.object({
  wantInvoice: z.enum(["yes", "no"]),
  paymentMethod: z.enum(["qr", "cod"]),
  invoiceData: z.any() // We'll handle validation of this separately
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  data?: Partial<PaymentFormValues>;
  setData?: (data: PaymentFormValues) => void;
  onPaymentCompleted?: () => void;
}

const PaymentForm = forwardRef<{ validate: () => Promise<boolean> }, PaymentFormProps>(
  ({ data = {}, setData, onPaymentCompleted }, ref) => {
    const t = useTranslations("payment")
    const { orderSummary, grandTotal } = useRegistration();
    
    const [formIsValid, setFormIsValid] = useState(true); // Start with true for "no" selection
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Initialize form with default values
    const form = useForm<PaymentFormValues>({
      resolver: zodResolver(paymentFormSchema),
      defaultValues: {
        wantInvoice: data.wantInvoice || "no",
        paymentMethod: data.paymentMethod || "qr",
        invoiceData: data.invoiceData || {}
      },
      mode: "onChange"
    });

    // State for QR code
    const [showQR, setShowQR] = useState(false)
    const [countdown, setCountdown] = useState(9 * 60 + 30) // 9 minutes and 30 seconds
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    // Watch form values for changes
    const wantInvoice = form.watch("wantInvoice");
    const paymentMethod = form.watch("paymentMethod");
    const invoiceData = form.watch("invoiceData");

    // Validate the invoice data independently
    const validateInvoiceData = useCallback(() => {
      // If not wanting invoice, no validation needed
      if (wantInvoice !== "yes") {
        setFormErrors({});
        return true;
      }

      const errors: Record<string, string> = {};
      let isValid = true;

      // Check company name - direct access to ensure we catch empty fields
      const companyName = invoiceData?.companyName || "";
      if (!companyName || companyName.length < 2) {
        errors.companyName = "Company name is required";
        isValid = false;
      }

      // Check tax code - direct access to ensure we catch empty fields
      const taxCode = invoiceData?.taxCode || "";
      if (!taxCode || taxCode.length < 5) {
        errors.taxCode = "Tax code is required";
        isValid = false;
      }

      // Check address - direct access to ensure we catch empty fields
      const address = invoiceData?.address || "";
      if (!address || address.length < 5) {
        errors.address = "Address is required";
        isValid = false;
      }

      // Check email - direct access to ensure we catch empty fields
      const email = invoiceData?.email || "";
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = "Valid email is required";
        isValid = false;
      }

      // Check phone - direct access to ensure we catch empty fields
      const phone = invoiceData?.phone || "";
      if (!phone || phone.length < 10) {
        errors.phone = "Phone number is required";
        isValid = false;
      }

      // Update errors state
      setFormErrors(errors);
      
      // Return validation result
      return isValid;
    }, [wantInvoice, invoiceData]);

    // Complete form validation - don't include form.formState in dependencies
    // to avoid infinite render loops
    const validateForm = useCallback(() => {
      // Basic form validation is handled by react-hook-form
      const formState = form.formState;
      
      // If wanting invoice, also validate invoice data
      if (wantInvoice === "yes") {
        const invoiceDataValid = validateInvoiceData();
        return !formState.errors.paymentMethod && !formState.errors.wantInvoice && invoiceDataValid;
      }
      
      // Otherwise just check payment method and wantInvoice are valid
      return !formState.errors.paymentMethod && !formState.errors.wantInvoice;
    }, [wantInvoice, validateInvoiceData]); // Removed form.formState from dependencies

    // Update form validation status whenever relevant fields change
    // Use a ref to track changes and prevent infinite loops
    const prevValuesRef = React.useRef({
      wantInvoice,
      paymentMethod,
      invoiceData
    });
    
    useEffect(() => {
      // Skip validation if nothing important has changed to prevent infinite loops
      const prevValues = prevValuesRef.current;
      
      // Deep compare important parts of invoiceData to detect real changes
      let invoiceDataChanged = false;
      if (wantInvoice === "yes") {
        const fieldsToCheck = ['companyName', 'taxCode', 'address', 'email', 'phone'];
        invoiceDataChanged = fieldsToCheck.some(field => 
          prevValues.invoiceData?.[field] !== invoiceData?.[field]
        );
      }
      
      // Only validate if there are meaningful changes
      if (prevValues.wantInvoice !== wantInvoice || 
          prevValues.paymentMethod !== paymentMethod ||
          invoiceDataChanged) {
        const isValid = validateForm();
        setFormIsValid(isValid);
        
        // Update the ref with current values
        prevValuesRef.current = {
          wantInvoice,
          paymentMethod,
          invoiceData
        };
      }
    }, [wantInvoice, paymentMethod, invoiceData, validateForm]);

    // Expose the validate method to the parent component
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // Trigger validation on all fields
        const valid = validateForm();
        
        if (valid && setData) {
          setData(form.getValues());
        }
        
        // Nếu là thanh toán QR đã hoàn tất, gọi onPaymentCompleted nếu chưa được gọi
        if (valid && paymentMethod === "qr" && paymentSuccess && onPaymentCompleted) {
          onPaymentCompleted();
        }
        
        // Nếu là thanh toán COD và form hợp lệ, không cần thêm xử lý đặc biệt
        
        return valid;
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

    // Initial validation when component mounts
    useEffect(() => {
      // If invoice is required, validate immediately
      if (wantInvoice === "yes") {
        const isValid = validateInvoiceData();
        setFormIsValid(isValid);
      } else {
        // Otherwise, form is valid by default
        setFormIsValid(true);
      }
    }, [wantInvoice, validateInvoiceData]);

    // Handle invoice option change
    const handleInvoiceOptionChange = (value: string) => {
      form.setValue("wantInvoice", value as "yes" | "no");
      
      if (value === "no") {
        // Clear form data if "no" is selected
        form.setValue("invoiceData", {});
        setFormErrors({});
        setFormIsValid(true); // Form is valid when "no" is selected
      } else if (value === "yes") {
        // Immediately validate if "yes" is selected
        const isValid = validateInvoiceData();
        setFormIsValid(isValid);
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
      
      // Update form data
      form.setValue(`invoiceData.${name}` as any, value);
      
      // Update parent component if needed
      if (setData) {
        setData(form.getValues());
      }
      
      // Force immediate validation when input changes
      const isValid = validateInvoiceData();
      setFormIsValid(isValid);
      
      // Update the ref with current values to prevent double validation in useEffect
      prevValuesRef.current = {
        wantInvoice,
        paymentMethod,
        invoiceData: {
          ...invoiceData,
          [name]: value
        }
      };
    }

    // Handle QR code generation
    const handleGenerateQR = () => {
      if (formIsValid) {
        setShowQR(true)
        setCountdown(9 * 60 + 30)

        // Simulate payment success after 5 seconds (for demo purposes)
        setTimeout(() => {
          setPaymentSuccess(true)
          // Notify parent component that payment is completed
          if (onPaymentCompleted) {
            onPaymentCompleted();
          }
        }, 5000)
      }
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

    return (
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Information */}
        <div className="bg-[#F8FBFF] rounded-lg p-6">
          <h2 className="text-xl font-medium mb-6">{t("orderInformation")}</h2>

          {orderSummary.map((facility) => (
            <div key={facility.facilityId} className="mb-8">
              <h3 className="text-[#0267AB] text-lg font-medium mb-4">
                {t("facility")} {facility.facilityLetter}:
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <div>
                    <span className="text-[#686D72] text-[16] font-medium">{t("devicesOrdered")}</span>  <span className="text-[#252627] text-[20] font-semibold">x{facility.deviceCount} {t("device")}</span>
                  </div>
                  <div className="text-[#686D72] text-[20] font-semibold">{facility.devicePrice.toLocaleString()} VND</div>
                </div>
                <div className="flex justify-between py-2">
                  <div>
                    <span className="text-[#686D72] text-[16] font-medium">{t("package")} ({facility.packageName})</span>  <span className="text-[#252627] text-[20] font-semibold">x{facility.duration} {t("months")}</span>
                  </div>
                  <div className="text-[#686D72] text-[20] font-semibold">{facility.servicePrice.toLocaleString()} VND</div>
                </div>
                <div className="flex justify-between py-2">
                  <div>
                    <span className="text-[#686D72] text-[16] font-medium">{t("vat")}</span>  <span className="text-[#252627] text-[20] font-semibold">{t("package")}</span>
                  </div>
                  <div className="text-[#686D72] text-[20] font-semibold">{facility.vat.toLocaleString()} VND</div>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <div className="text-[#686D72] text-[16] font-medium">{t("subtotal")}</div>
                  <div className="text-[#686D72] text-[20] font-semibold">{facility.total.toLocaleString()} VND</div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between py-4 border-t border-t-gray-400 text-lg font-bold text-[#0267AB]">
            <div>{t("grandTotal")}</div>
            <div>{grandTotal.toLocaleString()} VND</div>
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
                {formErrors.companyName && (
                  <div className="mt-1 text-sm text-red-500">{formErrors.companyName}</div>
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
                {formErrors.taxCode && (
                  <div className="mt-1 text-sm text-red-500">{formErrors.taxCode}</div>
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
                {formErrors.address && (
                  <div className="mt-1 text-sm text-red-500">{formErrors.address}</div>
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
                {formErrors.email && (
                  <div className="mt-1 text-sm text-red-500">{formErrors.email}</div>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                  <span className="text-red-500 mr-1">*</span> {t("phone")}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.watch("invoiceData.phone") || ""}
                  onChange={handleInputChange}
                  placeholder={t("enterPhone")}
                  required
                />
                {formErrors.phone && (
                  <div className="mt-1 text-sm text-red-500">{formErrors.phone}</div>
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
          
          {/* QR Code Payment Section (Only shown if QR is selected) */}
          {paymentMethod === "qr" && !showQR && (
            <div className="text-center py-4">
              <button
                type="button"
                onClick={handleGenerateQR}
                className={`px-8 py-2 rounded-full transition-colors ${
                  wantInvoice === "yes" && !formIsValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0267AB] text-white hover:bg-[#035690]"
                }`}
                disabled={wantInvoice === "yes" && !formIsValid}
              >
                {t("generateQR")}
              </button>
              {wantInvoice === "yes" && !formIsValid && (
                <p className="text-sm text-red-500 mt-2">{t("pleaseCompleteForm")}</p>
              )}
            </div>
          )}
          
          {/* QR Code Display */}
          {paymentMethod === "qr" && showQR && (
            <div className="p-4 border rounded-lg">
              {paymentSuccess ? (
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="w-auto h-auto text-green-500">
                    <CheckPaymentImg className="w-[180hug] h-[87hug]" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-start gap-8">
                  <div className="bg-white p-6 rounded-lg inline-block mb-4 md:mb-0 shadow-sm">
                    <Image src={QRImg} alt="QR Code" className="w-[200px] h-[200px]" />
                  </div>
                  <div className="bg-white p-4 rounded-[16px] shadow-lg flex justify-center text-center">
                    <div>
                      <div className="text-[#686D72] text-[16] font-medium">Thời gian còn</div>
                      <div className="text-[#252627] text-[20] font-semibold">
                        {Math.floor(countdown / 60)} phút {countdown % 60} giây
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    );
  }
);

PaymentForm.displayName = "PaymentForm";

export default PaymentForm; 