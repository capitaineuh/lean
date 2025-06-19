import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des routes publiques
const publicRoutes = ['/guide', '/login', '/register', '/profile', '/artisans', '/blog'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/guide', request.url));
  }

  // Si l'utilisateur est connecté et essaie d'accéder à une route publique
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configuration des routes à protéger
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 