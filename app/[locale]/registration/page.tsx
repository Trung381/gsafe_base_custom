'use client';

import React, { useState, useRef } from 'react';
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

// Define types for form data
interface FormData {
  customerInfo: Partial<CustomerFormValues>;
  branchInfo: Partial<BranchesFormValues>;
  serviceSelection: Partial<ServiceSelectionFormValues>;
  payment: Partial<PaymentFormValues>;
}

export default function RegistrationPage() {
  const t = useTranslations();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    customerInfo: {},
    branchInfo: {},
    serviceSelection: {},
    payment: {}
  });

  // Refs for accessing form methods
  const customerFormRef = useRef<{ validate: () => Promise<boolean> }>(null);
  const branchFormRef = useRef<{ validate: () => Promise<boolean> }>(null);
  const serviceFormRef = useRef<{ validate: () => Promise<boolean> }>(null);
  const paymentFormRef = useRef<{ validate: () => Promise<boolean> }>(null);

  // Danh sách các bước
  const steps = [
    {
      title: 'Thông tin khách hàng',
      content: (
        <CustomerRegistrationForm 
          ref={customerFormRef} 
          data={formData.customerInfo} 
          setData={(data) => setFormData(prev => ({ ...prev, customerInfo: data }))} 
        />
      ),
    },
    {
      title: 'Thông tin cơ sở',
      content: (
        <BranchInformationForm 
          ref={branchFormRef} 
          data={formData.branchInfo} 
          setData={(data) => setFormData(prev => ({ ...prev, branchInfo: data }))} 
        />
      ),
    },
    {
      title: 'Chọn gói dịch vụ',
      content: (
        <ServiceSelectionForm 
          ref={serviceFormRef} 
          data={formData.serviceSelection} 
          setData={(data) => setFormData(prev => ({ ...prev, serviceSelection: data }))} 
        />
      ),
    },
    {
      title: 'Thanh toán',
      content: (
        <PaymentForm 
          ref={paymentFormRef} 
          data={formData.payment} 
          setData={(data) => setFormData(prev => ({ ...prev, payment: data }))} 
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

  // Validate final form and complete registration if valid
  const done = async () => {
    if (paymentFormRef?.current) {
      const isValid = await paymentFormRef.current.validate();
      
      if (isValid) {
        console.log('Đăng ký hoàn tất!', formData);
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
      <PageTitle title={t('RegisTrationTitle')} />
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
        <div className="mb-12">
          {steps[currentStep].content}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              onClick={prev}
              className="inline-flex items-center justify-center gap-2 px-8 py-2 rounded-full border border-[#0267AB] bg-white text-[#0267AB] hover:bg-[#0267AB] hover:text-white transition-colors group"
            >
              <span className="inline-block w-11 h-4 text-[#0267AB] group-hover:text-white">
                <ArrowLeft className="w-full h-full" />
              </span>
              <span className="font-medium">QUAY LẠI</span>
            </button>
          )}
          
          {currentStep < steps.length - 1 && (
            <button
              onClick={next}
              className="inline-flex items-center justify-center gap-2 px-8 py-2 rounded-full border border-[#0267AB] bg-white text-[#0267AB] hover:bg-[#0267AB] hover:text-white transition-colors group ml-auto"
            >
              <span className="font-medium">TIẾP THEO</span>
              <span className="inline-block w-11 h-4 text-[#0267AB] group-hover:text-white">
                <ArrowRight className="w-full h-full" />
              </span>
            </button>
          )}
          
          {currentStep === steps.length - 1 && (
            <button
              onClick={done}
              className="inline-flex items-center justify-center gap-2 px-8 py-2 rounded-full border border-[#0267AB] bg-[#0267AB] text-white hover:opacity-90 transition-colors ml-auto"
            >
              <span className="font-medium">HOÀN TẤT</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 