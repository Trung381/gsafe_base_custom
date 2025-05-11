import {NextIntlClientProvider} from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'vi'}];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { locale } = props.params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // Fallback to default messages if locale file is not found
    messages = (await import(`../../messages/vi.json`)).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
} 