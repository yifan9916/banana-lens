import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export type Locale = 'en' | 'zh' | 'nl' | 'de';

// Can be imported from a shared config
// zh-cn
export const locales: Locale[] = ['en', 'zh', 'nl', 'de'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../dictionaries/${locale}.json`)).default,
  };
});
