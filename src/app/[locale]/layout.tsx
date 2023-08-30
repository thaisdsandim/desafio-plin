import './globals.css'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Desafio Plin',
  description: 'Desafio Front-End Plin',
}

export function generateStaticParams() {
  return [{locale: 'pt'}, {locale: 'en'}, {locale: 'en'}];
}
 
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
