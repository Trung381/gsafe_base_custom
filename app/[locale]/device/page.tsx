'use client';

import PageTitle from '@/components/page-title';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import deviceImage from '@/assets/img/device.png';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useEffect, useState } from 'react';

export default function DevicePage() {
    const t = useTranslations("device");
    const pathname = usePathname();
    const router = useRouter();
    

    return (
      <div>
        <PageTitle title={t('title')} />

        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">GSafe (G6)</h1>
            <p className="text-base md:text-lg mb-8 text-gray-700">
              {t('productIntroduction')}
            </p>

            <Button href="/customer-registration" className="rounded-2xl bg-[#0267AB] border-2 border-[#0C9BEB] text-white hover:bg-white hover:text-[#0267AB]">
              {t('buyNow')}
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
