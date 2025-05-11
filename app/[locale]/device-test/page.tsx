'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import deviceImage from '@/assets/img/device.png';

export default function DeviceTestPage() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentPathname, setCurrentPathname] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
    setCurrentPathname(pathname);
  }, [pathname]);

  const changeLanguage = (newLocale: 'vi' | 'en') => {
    console.log('Changing language to:', newLocale);
    console.log('Current pathname:', pathname);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {t('devicePageTitle')} - Test
      </h1>

      <div className="bg-yellow-100 p-4 mb-8 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Debug Information:</h2>
        <p className="mb-2">
          <strong>Current URL:</strong> {currentUrl}
        </p>
        <p className="mb-4">
          <strong>Current Pathname:</strong> {currentPathname}
        </p>

        <div className="flex gap-4 mt-4">
          <Button 
            onClick={() => changeLanguage('vi')} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Tiếng Việt
          </Button>
          <Button 
            onClick={() => changeLanguage('en')} 
            className="bg-red-600 hover:bg-red-700"
          >
            English
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">GSafe (G6)</h1>
          <p className="text-base md:text-lg mb-8 text-gray-700">
            {t('product-introduction')}
          </p>

          <Button className="rounded-2xl px-7 py-3 text-base font-semibold border-2 border-[#0C9BEB]">
            {t('buttonText')}
          </Button>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src={deviceImage}
            alt="GSafe G6"
            width={500}
            height={447}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
} 