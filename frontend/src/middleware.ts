import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des routes publiques
const publicRoutes = ['/guide', '/login', '/register', '/profile', '/projets', '/artisans', '/blog', '/demande_restauration', '/avis', '/candidatures', '/mesProjets', '/messages'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // Laisse passer les fichiers statiques (images, css, js, etc.)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

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
    // On ignore déjà les dossiers spéciaux et favicon.ico
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 