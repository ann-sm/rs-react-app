import { getMessages, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from '../../contexts/theme/ThemeProvider';
import { StoreProvider } from '../../store/storeProvider';
import '../globals.css';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import { routing } from '../../i18n/routing';
 
type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};
 
const LocaleLayout = async ({children, params}: Props) => {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <title>PokéSearch</title>
      </head>
      <body>
        <StoreProvider>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;