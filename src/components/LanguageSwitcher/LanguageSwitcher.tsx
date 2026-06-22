'use client';

import { useLocale } from 'next-intl';
import { locale } from '../../i18n/request';
import { usePathname, useRouter } from '../../i18n/navigation';
import { useSearchParams } from 'next/navigation';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocale = useLocale() as locale;
  const newLocale = currentLocale === 'en' ? 'ru' : 'en';

  const switchLocale = () => {
    const currentParams = searchParams?.toString();
    const targetUrl = currentParams ? `${pathname}?${currentParams}` : pathname;

    router.replace(targetUrl, { locale: newLocale });
  }

  return (
    <button onClick={switchLocale} className='font-mono text-gray-100 dark:text-teal-950 text-lg cursor-pointer hover:text-yellow-400'>
      {currentLocale.toString().toUpperCase()}
    </button>
  );
};

export default LanguageSwitcher;