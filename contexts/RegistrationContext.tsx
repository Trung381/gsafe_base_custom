"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CustomerFormValues } from '@/components/customer-registration-form-simplified';
import { BranchesFormValues, BranchData } from '@/components/branch-infomation/branch-information-form-simplified';
import { ServiceSelectionFormValues, FacilityServiceData } from '@/components/plan-duration/service-selection-form-simplified';
import { PaymentFormValues } from '@/components/payment/payment-form-simplified';

// Constants
const DEVICE_PRICE = 6600000; // 6.6 triệu đồng/thiết bị

// Định nghĩa gói cước và giá theo chu kỳ
// Đã sửa lại đúng format yêu cầu
const PACKAGE_PRICES = {
  "gsafe300": {
    prices: {
      "12": 3600000,
      "24": 7200000,
      "36": 10800000,
    }
  },
  "gsafe400": {
    prices: {
      "12": 4800000,
      "24": 9600000,
      "36": 14400000,
    }
  },
  "gsafe500": {
    prices: {
      "12": 6000000,
      "24": 12000000,
      "36": 18000000,
    }
  },
  "gsafesoc": {
    prices: {
      "12": 2400000,
      "24": 4800000,
      "36": 7200000,
    }
  },
  "discountPrice": {
    prices: {
      "12": 1200000,
      "24": 2400000,
      "36": 3600000,
    }
  }
};

// Định nghĩa kiểu dữ liệu cho order item (1 cơ sở)
export interface OrderItem {
  facilityId: number;
  facilityName: string;
  facilityLetter: string;
  deviceCount: number;
  devicePrice: number;
  packageId: string;
  packageName: string;
  packagePrice: number;
  duration: string;
  servicePrice: number;
  firstDeviceService: number;
  additionalDevicesService: number;
  subtotal: number;
  vat: number;
  total: number;
}

// Định nghĩa kiểu dữ liệu cho context
interface RegistrationContextType {
  customerInfo: Partial<CustomerFormValues>;
  branchInfo: Partial<BranchesFormValues>;
  serviceSelection: Partial<ServiceSelectionFormValues>;
  payment: Partial<PaymentFormValues>;
  orderSummary: OrderItem[];
  grandTotal: number;
  setCustomerInfo: (data: CustomerFormValues) => void;
  setBranchInfo: (data: BranchesFormValues) => void;
  setServiceSelection: (data: ServiceSelectionFormValues) => void;
  setPaymentInfo: (data: PaymentFormValues) => void;
  calculateTotals: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const [customerInfo, setCustomerInfo] = useState<Partial<CustomerFormValues>>({});
  const [branchInfo, setBranchInfo] = useState<Partial<BranchesFormValues>>({});
  const [serviceSelection, setServiceSelection] = useState<Partial<ServiceSelectionFormValues>>({});
  const [payment, setPaymentInfo] = useState<Partial<PaymentFormValues>>({});
  const [orderSummary, setOrderSummary] = useState<OrderItem[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);

  // Hàm tính toán tổng tiền dựa trên thông tin đơn hàng
  const calculateTotals = () => {
    if (!branchInfo.branches || !serviceSelection.facilities) return;

    const newOrderSummary: OrderItem[] = [];
    let newGrandTotal = 0;

    branchInfo.branches.forEach((branch: BranchData, index: number) => {
      const facilityService = serviceSelection.facilities?.find(f => 
        f.facilityLetter === String.fromCharCode(65 + index));
      
      if (!facilityService || !facilityService.selectedPackage) return;

      const deviceCount = parseInt(branch.deviceCount || "1");
      const devicePrice = DEVICE_PRICE * deviceCount;
      
      // Lấy thông tin gói cước
      const packageId = facilityService.selectedPackage as 'gsafe300' | 'gsafe400' | 'gsafe500' | 'gsafesoc';
      const duration = (facilityService.selectedDuration || "12") as '12' | '24' | '36';
      
      // Tính giá dịch vụ
      let servicePrice = 0;
      let firstDeviceService = 0;
      let additionalDevicesService = 0;
      const packageInfo = PACKAGE_PRICES[packageId];
      const discountInfo = PACKAGE_PRICES["discountPrice"];
      
      if (packageInfo && discountInfo) {
        if (deviceCount <= 1) {
          // Nếu chỉ có 1 thiết bị, tính theo giá gói thông thường
          firstDeviceService = packageInfo.prices[duration];
          additionalDevicesService = 0;
          servicePrice = firstDeviceService;
        } else {
          // Nếu có nhiều hơn 1 thiết bị:
          // - Thiết bị đầu tiên tính theo giá gói thông thường
          // - Các thiết bị còn lại tính theo giá ưu đãi (discountPrice)
          firstDeviceService = packageInfo.prices[duration];
          additionalDevicesService = discountInfo.prices[duration] * (deviceCount - 1);
          servicePrice = firstDeviceService + additionalDevicesService;
        }
      }
      
      // Tính VAT (10%) của toàn bộ gói cước
      const vat = Math.round(servicePrice * 0.1);
      
      // Tính tổng tiền cho cơ sở
      const subtotal = devicePrice + servicePrice;
      const total = subtotal + vat;
      
      // Cập nhật tổng tiền toàn bộ đơn hàng
      newGrandTotal += total;
      
      // Lấy tên gói cước
      let packageName = '';
      switch (packageId) {
        case 'gsafe300': packageName = 'GSafe 300'; break;
        case 'gsafe400': packageName = 'GSafe 400'; break;
        case 'gsafe500': packageName = 'GSafe 500'; break;
        case 'gsafesoc': packageName = 'GSafe SOC'; break;
        default: packageName = 'Unknown Package';
      }
      
      // Thêm vào danh sách order summary
      newOrderSummary.push({
        facilityId: facilityService.facilityId,
        facilityName: branch.branchName,
        facilityLetter: String.fromCharCode(65 + index),
        deviceCount,
        devicePrice,
        packageId,
        packageName,
        packagePrice: packageInfo?.prices[duration] || 0,
        duration,
        servicePrice, // Tổng giá dịch vụ cho tất cả thiết bị
        firstDeviceService,
        additionalDevicesService,
        subtotal,
        vat,
        total
      });
    });
    
    setOrderSummary(newOrderSummary);
    setGrandTotal(newGrandTotal);
  };

  // Tính toán lại tổng tiền khi thông tin thay đổi
  useEffect(() => {
    calculateTotals();
  }, [branchInfo, serviceSelection]);

  const value = {
    customerInfo,
    branchInfo,
    serviceSelection,
    payment,
    orderSummary,
    grandTotal,
    setCustomerInfo,
    setBranchInfo,
    setServiceSelection,
    setPaymentInfo,
    calculateTotals
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationContext; 