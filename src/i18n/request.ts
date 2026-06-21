import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export type locale = 'en' | 'ru'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !routing.locales.includes(locale as locale )) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});