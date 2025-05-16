'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Steps, Popover } from 'antd';
import type { StepsProps } from 'antd';
import { useTranslations } from 'next-intl';
import CustomerRegistrationForm, { CustomerFormValues } from '@/components/customer-registration-form-simplified';
import BranchInformationForm, { BranchesFormValues } from '@/components/branch-infomation/branch-information-form-simplified';
import ServiceSelectionForm, { ServiceSelectionFormValues } from '@/components/plan-duration/service-selection-form-simplified';
import PaymentForm, { PaymentFormValues } from '@/components/payment/payment-form-simplified';
import ArrowRight from "@/assets/icons/arrow-right.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { useRouter } from 'next/navigation';
import PageTitle from '@/components/page-title';
import { RegistrationProvider, useRegistration } from '@/contexts/RegistrationContext';

// Custom dot với Popover như yêu cầu
const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index + 1} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

function RegistrationPageContent() {
  const t = useTranslations();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { 
    customerInfo, branchInfo, serviceSelection, payment,
    setCustomerInfo, setBranchInfo, setServiceSelection, setPaymentInfo,
  } = useRegistration();

  // Track payment completion status
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  // Track whether the registration is completed (user clicked "HOÀN TẤT")
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  
  // Refs for accessing form methods
  const customerFormRef = useRef<{ validate: () => Promise<boolean> }>(null);
  const branchFormRef = useRef<{ validate: () => Promise<boolean> }>(null);
  const serviceFormRef = useRef<{ validate: () => Promise<boolean> }>(null);
  const paymentFormRef = useRef<{ validate: () => Promise<boolean> }>(null);

  // Danh sách các bước
  const steps = [
    {
      title: t('registration.steps.customerInfo'),
      content: (
        <CustomerRegistrationForm 
          ref={customerFormRef} 
          data={customerInfo} 
          setData={(data) => setCustomerInfo(data)} 
        />
      ),
    },
    {
      title: t('registration.steps.branchInfo'),
      content: (
        <BranchInformationForm 
          ref={branchFormRef} 
          data={branchInfo} 
          setData={(data) => setBranchInfo(data)} 
        />
      ),
    },
    {
      title: t('registration.steps.serviceSelection'),
      content: (
        <ServiceSelectionForm 
          ref={serviceFormRef} 
          data={serviceSelection} 
          setData={(data) => setServiceSelection(data)} 
        />
      ),
    },
    {
      title: t('registration.steps.payment'),
      content: (
        <PaymentForm 
          ref={paymentFormRef} 
          data={payment} 
          setData={(data) => setPaymentInfo(data)}
          onPaymentCompleted={() => setPaymentCompleted(true)}
        />
      ),
    },
  ];

  // Đi đến bước trước đó
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  // Validate current form and go to next step if valid
  const next = async () => {
    // Get current form ref based on step
    const currentFormRef = [customerFormRef, branchFormRef, serviceFormRef, paymentFormRef][currentStep];
    
    if (currentFormRef?.current) {
      // Call the validate method of the form
      const isValid = await currentFormRef.current.validate();
      
      if (isValid) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Fallback if ref not available
      setCurrentStep(currentStep + 1);
    }
  };

  // Kiểm tra xem nút "Hoàn tất" có nên hiển thị không
  const shouldShowCompleteButton = () => {
    // Nếu không phải trang thanh toán, không hiển thị
    if (currentStep !== steps.length - 1) return false;
    
    // Nếu đã thanh toán xong, hiển thị
    if (paymentCompleted) return true;
    
    // Nếu chưa thanh toán, chỉ hiển thị nếu:
    // 1. Chọn thanh toán COD (paymentMethod = "cod") 
    // 2. Form hợp lệ (phải validate)
    if (payment?.paymentMethod === "cod") {
      // Nếu không yêu cầu hóa đơn, form luôn hợp lệ
      if (payment.wantInvoice === "no") return true;
      
      // Nếu yêu cầu hóa đơn và đã nhập đủ thông tin
      return !!payment.invoiceData && 
             !!payment.invoiceData.companyName && 
             !!payment.invoiceData.taxCode && 
             !!payment.invoiceData.address && 
             !!payment.invoiceData.email && 
             !!payment.invoiceData.phone;
    }
    
    // Các trường hợp khác không hiển thị
    return false;
  };

  // Validate final form and complete registration if valid
  const done = async () => {
    if (paymentFormRef?.current) {
      const isValid = await paymentFormRef.current.validate();
      
      if (isValid) {
        // Mark registration as completed
        setRegistrationCompleted(true);
        console.log(t('registrationComplete'));
        // Thông báo hoàn tất và chuyển hướng người dùng về trang chủ sau vài giây
        setTimeout(() => {
          router.push('/'); 
        }, 3000);
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Page Title */}
      <PageTitle title={t('RegistrationTitle')} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Steps Bar */}
        <div className="my-10 ">
          <Steps
            current={currentStep}
            progressDot={customDot}
            items={steps.map(item => ({
              title: item.title,
            }))}
          />
        </div>

        {/* Component Content */}
        <div className="mb-6">
          {steps[currentStep].content}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 0 && !registrationCompleted && (
            <button
              onClick={prev}
              className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-2xl border border-[#0267AB] bg-white text-[#0267AB] hover:bg-[#0267AB] hover:text-white transition-colors group"
            >
              <span className="inline-block w-11 h-4 text-[#0267AB] group-hover:text-white">
                <ArrowLeft className="w-full h-full" />
              </span>
              <span className="font-medium">{t('registration.back')}</span>
            </button>
          )}
          
          {currentStep < steps.length - 1 && !registrationCompleted && (
            <button
              onClick={next}
              className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-2xl border border-[#0267AB] bg-white text-[#0267AB] hover:bg-[#0267AB] hover:text-white transition-colors group ml-auto"
            >
              <span className="font-medium">{t('registration.next')}</span>
              <span className="inline-block w-11 h-4 text-[#0267AB] group-hover:text-white">
                <ArrowRight className="w-full h-full" />
              </span>
            </button>
          )}
          
          {shouldShowCompleteButton() && !registrationCompleted && (
            <button
              onClick={done}
              className="inline-flex items-center justify-center gap-2 px-8 py-2 rounded-2xl border border-[#0267AB] bg-[#0267AB] text-white hover:opacity-90 transition-colors ml-auto"
            >
              <span className="font-medium">{t('registration.complete')}</span>
            </button>
          )}
          
          {registrationCompleted && (
            <div className="text-center text-green-600 font-medium ml-auto">
              {t('registrationComplete')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RegistrationPage() {
  return (
    <RegistrationProvider>
      <RegistrationPageContent />
    </RegistrationProvider>
  );
} 