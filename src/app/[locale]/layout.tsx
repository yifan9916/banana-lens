import '@/styles/globals.css';

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Satisfy } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { AppProvider } from '@/contexts/app-context';
import { ThemeProvider } from '@/contexts/theme-context/theme-context';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Link } from '@/navigation';

const satisfy = Satisfy({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-satisfy',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Banana Lens',
  description: "Yi's Playground",
};

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default function LocaleLayout(props: Props) {
  const {
    children,
    params: { locale },
  } = props;

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={`${GeistSans.variable} ${satisfy.variable}`}>
        <AppProvider>
          <ThemeProvider>
            <header className="flex justify-center p-4 sm:p-12">
              <Link
                href="/"
                className="font-[family-name:var(--font-satisfy)] text-xl"
              >
                Banana Lens
              </Link>
            </header>

            {children}

            <footer className="flex justify-end items-end gap-2 p-12 pt-20">
              <ThemeSwitcher />
              <LocaleSwitcher />
            </footer>
          </ThemeProvider>
        </AppProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
