import createMiddleware from 'next-intl/middleware';

import { type Locale, locales } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en' as Locale,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|zh|nl)/:path*'],
};
