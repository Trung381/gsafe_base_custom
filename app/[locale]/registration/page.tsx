'use client';

import React, { useState } from 'react';
import { Steps, Popover } from 'antd';
import type { StepsProps } from 'antd';
import { useTranslations } from 'next-intl';
import CustomerRegistrationForm from '@/components/customer-registration-form-simplified';
import BranchInformationForm from '@/components/branch-infomation/branch-information-form-simplified';
import ServiceSelectionForm from '@/components/plan-duration/service-selection-form-simplified';
import PaymentPage from '@/components/payment/payment-form-simplified';
import ArrowRight from "@/assets/icons/arrow-right.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { useRouter } from 'next/navigation';

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

export default function RegistrationPage() {
  const t = useTranslations();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Danh sách các bước
  const steps = [
    {
      title: 'Thông tin khách hàng',
      content: <CustomerRegistrationForm />,
    },
    {
      title: 'Thông tin cơ sở',
      content: <BranchInformationForm />,
    },
    {
      title: 'Chọn gói dịch vụ',
      content: <ServiceSelectionForm />,
    },
    {
      title: 'Thanh toán',
      content: <PaymentPage />,
    },
  ];

  // Đi đến bước trước đó
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  // Đi đến bước tiếp theo
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  // Hoàn thành đăng ký
  const done = () => {
    console.log('Đăng ký hoàn tất!');
    // Thông báo hoàn tất và chuyển hướng người dùng về trang chủ sau vài giây
    setTimeout(() => {
      router.push('/'); 
    }, 3000);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Steps Bar */}
        <div className="mb-10">
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