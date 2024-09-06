import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { env } from './env';
import { routing } from './i18n/routing';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin') {
    if (env.NODE_ENV !== 'development') {
      return Response.json({ success: false }, { status: 403 });
    }

    return NextResponse.next();
  }

  const handleI18nRouting = createMiddleware(routing);

  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|zh|nl)/:path*', '/admin'],
};
