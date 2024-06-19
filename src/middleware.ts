import { NextRequest, NextResponse } from 'next/server';

// Rutas que quieres desactivar
const disabledRoutes = [
  '/trade/recurring',
  '/trade/limit-range',
  '/trade/dca',
  '/lock',
  '/lock/(.*)',
  '/vote',
  '/rewards',
];

const isMobileDevice = (userAgent: string): boolean => {
  const mobileRegex = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
  return mobileRegex.test(userAgent);
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = isMobileDevice(userAgent);

  if (disabledRoutes.some(route => new RegExp(`^${route}$`).test(pathname))) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  if (isMobile && (pathname !== '/trade/swap' && pathname !== '/')) {
    return NextResponse.redirect(new URL('/trade/swap', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/trade/recurring', '/trade/limit-range', '/trade/dca', '/lock', '/lock/(.*)', '/vote', '/rewards'],
}