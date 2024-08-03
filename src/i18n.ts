import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { MessageKeys } from 'next-intl';

// Can be imported from a shared config
export const locales = [
  'en',
  'zh',
  // 'nl',
  // 'de'
] as const;

export type Locale = (typeof locales)[number];

export type Dictionary = IntlMessages;
export type DictionaryKeys = MessageKeys<Dictionary, keyof Dictionary>;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../dictionaries/${locale}.json`)).default,
  };
});
