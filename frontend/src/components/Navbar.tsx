'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const UserCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6 8a7 7 0 100-14 7 7 0 000 14z" clipRule="evenodd" />
    </svg>
);

const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MementoLogo = () => (
  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* M */}
    <path d="M7.45 26.33L13.78 15.83L20.11 26.33H16.67L15.55 23.67L14.43 26.33H11.89L10.77 23.67L9.65 26.33H7.45Z" fill="#ED6A2C"/>
    
    {/* e */}
    <path d="M22.42 15.83C24.28 15.83 25.8 16.35 26.98 17.39C28.16 18.43 28.75 19.85 28.75 21.65C28.75 23.45 28.16 24.87 26.98 25.91C25.8 26.95 24.28 27.47 22.42 27.47C20.56 27.47 19.04 26.95 17.86 25.91C16.68 24.87 16.09 23.45 16.09 21.65C16.09 19.85 16.68 18.43 17.86 17.39C19.04 16.35 20.56 15.83 22.42 15.83ZM22.42 17.67C21.44 17.67 20.65 18.05 20.05 18.81C19.45 19.57 19.15 20.55 19.15 21.75C19.15 22.95 19.45 23.93 20.05 24.69C20.65 25.45 21.44 25.83 22.42 25.83C23.4 25.83 24.19 25.45 24.79 24.69C25.39 23.93 25.69 22.95 25.69 21.75C25.69 20.55 25.39 19.57 24.79 18.81C24.19 18.05 23.4 17.67 22.42 17.67Z" fill="#ED6A2C"/>
    
    {/* m */}
    <path d="M31.75 15.83V26.33H29.55V18.67L28.43 21.33L27.31 18.67V26.33H25.11V15.83H27.31L28.43 18.49L29.55 15.83H31.75Z" fill="#ED6A2C"/>
    
    {/* e */}
    <path d="M35.45 15.83C37.31 15.83 38.83 16.35 40.01 17.39C41.19 18.43 41.78 19.85 41.78 21.65C41.78 23.45 41.19 24.87 40.01 25.91C38.83 26.95 37.31 27.47 35.45 27.47C33.59 27.47 32.07 26.95 30.89 25.91C29.71 24.87 29.12 23.45 29.12 21.65C29.12 19.85 29.71 18.43 30.89 17.39C32.07 16.35 33.59 15.83 35.45 15.83ZM35.45 17.67C34.47 17.67 33.68 18.05 33.08 18.81C32.48 19.57 32.18 20.55 32.18 21.75C32.18 22.95 32.48 23.93 33.08 24.69C33.68 25.45 34.47 25.83 35.45 25.83C36.43 25.83 37.22 25.45 37.82 24.69C38.42 23.93 38.72 22.95 38.72 21.75C38.72 20.55 38.42 19.57 37.82 18.81C37.22 18.05 36.43 17.67 35.45 17.67Z" fill="#ED6A2C"/>
    
    {/* n */}
    <path d="M44.15 15.83V26.33H41.95V18.67L40.83 21.33L39.71 18.67V26.33H37.51V15.83H39.71L40.83 18.49L41.95 15.83H44.15Z" fill="#ED6A2C"/>
    
    {/* t */}
    <path d="M46.85 15.83V17.67H48.97V26.33H51.17V17.67H53.29V15.83H46.85Z" fill="#ED6A2C"/>
    
    {/* o */}
    <path d="M55.59 15.83C57.45 15.83 58.97 16.35 60.15 17.39C61.33 18.43 61.92 19.85 61.92 21.65C61.92 23.45 61.33 24.87 60.15 25.91C58.97 26.95 57.45 27.47 55.59 27.47C53.73 27.47 52.21 26.95 51.03 25.91C49.85 24.87 49.26 23.45 49.26 21.65C49.26 19.85 49.85 18.43 51.03 17.39C52.21 16.35 53.73 15.83 55.59 15.83ZM55.59 17.67C54.61 17.67 53.82 18.05 53.22 18.81C52.62 19.57 52.32 20.55 52.32 21.75C52.32 22.95 52.62 23.93 53.22 24.69C53.82 25.45 54.61 25.83 55.59 25.83C56.57 25.83 57.36 25.45 57.96 24.69C58.56 23.93 58.86 22.95 58.86 21.75C58.86 20.55 58.56 19.57 57.96 18.81C57.36 18.05 56.57 17.67 55.59 17.67Z" fill="#ED6A2C"/>
  </svg>
);

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated && user) {
      // Si c'est un artisan, rediriger vers /projets (pour voir les demandes des particuliers)
      // Si c'est un particulier, rediriger vers /artisans (pour voir les artisans)
      if (user.isArtisan) {
        router.push('/projets');
      } else {
        router.push('/artisans');
      }
    } else {
      // Si pas connecté, rediriger vers la page d'accueil
      router.push('/');
    }
  };

  // Déterminer le type d'utilisateur pour l'affichage
  const getUserType = () => {
    if (!isAuthenticated || !user) return '';
    return user.isArtisan ? 'Artisan' : 'Particulier';
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, mobileMenuRef]);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Génération dynamique des liens selon le type d'utilisateur
  const getNavLinks = () => {
    if (!isAuthenticated || !user) return [];
    if (user.isArtisan) {
      return [
        { href: '/projets', label: 'Projets' },
        { href: '/candidatures', label: 'Candidatures' },
        { href: '/messages', label: 'Messages' },
        { href: '/blog', label: 'Blog' },
        { href: '/avis', label: 'Avis' },
      ];
    } else {
      return [
        { href: '/artisans', label: 'Artisans' },
        { href: '/demande_restauration', label: 'Créer une demande' },
        { href: '/mesProjets', label: 'Mes projets' },
        { href: '/messages', label: 'Messages' },
        { href: '/blog', label: 'Blog' },
        { href: '/avis', label: 'Avis' },
      ];
    }
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center space-x-2 md:space-x-4">
            <a href="#" onClick={handleLogoClick} className="cursor-pointer flex items-center mr-1 md:mr-0">
              <img src="/logo.png" alt="Memento Logo" className="h-6 md:h-12 w-auto max-w-[90px] md:max-w-[220px]" />
            </a>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500 text-sm md:text-base">{getUserType()}</span>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              {getNavLinks().map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${
                    pathname.startsWith(link.href)
                      ? 'text-orange-500'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-5">
                <button className="relative">
                  <BellIcon />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white"></span>
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserCircleIcon />
                    </div>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                        Mon Profil
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isAuthenticated && mobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {getNavLinks().map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname.startsWith(link.href)
                      ? 'text-orange-500 bg-orange-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCircleIcon />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.email}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {getUserType()}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mon Profil
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}