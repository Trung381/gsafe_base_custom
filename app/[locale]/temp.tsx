// import PageTitle from '@/components/custom/PageTitle';
// import Button from '@/components/custom/Button';
// import Image from 'next/image';
// import { useTranslations } from 'next-intl';

// export default function DevicePage() {
//     const t = useTranslations();
//     return (
//       <div>
//         <PageTitle title= {t('devicePageTitle')} />

//         <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10">
//           <div className="flex-1">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6">GSafe (G6)</h1>
//             <p className="text-base md:text-lg mb-8 text-gray-700">
//             {t('product-introduction')}
//             </p>

//             <Button className="rounded-2xl px-7 py-3 text-base font-semibold border-2 border-[#0C9BEB]">
//               {t('buttonText')}
//             </Button>
//           </div>

//           <div className="flex-1 flex justify-center">
//             <Image
//                 src="/img/device.png"
//                 alt="GSafe G6"
//                 width={500}
//                 height={447}
//                 className="object-contain"
//                 priority
//               />
//           </div>
//         </div>
//       </div>
//     );
// }



// import Image from 'next/image';

// interface PageTitleProps {
//     title: string;
//   }

// const PageTitle = ({ title }: PageTitleProps) => (
//     <div className="relative w-full flex item-center justify-center overflow-hidden bg-[#E0F1FE] min-h-[50px]">
//         <h2 className="font-bold text-[32px] text-[#222] z-10 my-4">{title}</h2>
//         <div className="absolute right-0 top-0 h-full w-[300px] z-0 pointer-events-none">
//             <Image
//               src="/img/wave-mask.png"
//               alt=""
//               fill
//               className="object-cover object-right"
//               quality={100}
//               priority
//             />
//         </div>
//     </div>
// );

// export default PageTitle;

// "product-introduction": "The GSafe G9 device is directly integrated into the fire alarm control panel of the facility. Whenever there is a fire alarm signal, the warning will be transmitted directly through the GSafe G9 device to the database management system of the Monitoring Service Center - GTEL. The core software system will quickly process the signal and automatically make calls, send messages, and warn on the Mobile App to the facility. At the same time, the 24/7 hotline at the MSC - GTEL center will support direct calls to the phone numbers of the facility manager registered on the system to support direct interaction with customers, and support customers in handling incidents.",


// "product-introduction": "Thiết bị GSafe G9 được tích hợp trực tiếp vào tủ trung tâm báo cháy của cơ sở công trình. Mỗi khi có tín hiệu báo cháy, cảnh báo sẽ được truyền trực tiếp thông qua Thiết bị GSafe G9 tới hệ thống quản lý cơ sở dữ liệu của Trung tâm giám sát Monitoring Service Center - GTEL. Hệ thống phần mềm lõi sẽ nhanh chóng xử lý tín hiệu và thực hiện việc tự động gọi điện, nhắn tin, cảnh báo trên ứng dụng điện thoại Mobile App tới cơ sở công trình. Đồng thời, tổng đài trực 24/7 tại trung tâm MSC - GTEL sẽ hỗ trợ gọi điện trực tiếp cảnh báo tới những số điện thoại người phụ trách cơ sở công trình đã đăng ký trên hệ thống giúp hỗ trợ tương tác trực tiếp với khách hàng, hỗ trợ khách hàng xử lý sự cố.",

