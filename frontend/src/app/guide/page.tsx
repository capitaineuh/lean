'use client';

import Link from 'next/link';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#F08A47]">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Bienvenue sur Memento
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-orange-100" style={{ color: '#fff7f0' }}>
              La plateforme qui connecte artisans et particuliers pour des projets de qualité.
            </p>
            <div className="mt-10">
              <Link
                href="/register"
                className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-[#ED6A2C] hover:bg-orange-50"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Découvrez les fonctionnalités qui font d'ArtisanConnect la plateforme idéale pour vos projets
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Pour les Artisans */}
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pour les Artisans</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-[#ED6A2C]" fill="none" viewBox="0 0 24 24" stroke="#ED6A2C">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Trouvez des projets correspondant à vos compétences
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-[#ED6A2C]" fill="none" viewBox="0 0 24 24" stroke="#ED6A2C">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Gérez votre profil et mettez en avant vos réalisations
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-[#ED6A2C]" fill="none" viewBox="0 0 24 24" stroke="#ED6A2C">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Recevez des demandes de devis directement
                    </p>
                  </li>
                </ul>
              </div>

              {/* Pour les Particuliers */}
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pour les Particuliers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-[#ED6A2C]" fill="none" viewBox="0 0 24 24" stroke="#ED6A2C">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Trouvez des artisans qualifiés près de chez vous
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-[#ED6A2C]" fill="none" viewBox="0 0 24 24" stroke="#ED6A2C">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Comparez les profils et les avis
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-[#ED6A2C]" fill="none" viewBox="0 0 24 24" stroke="#ED6A2C">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">
                      Publiez vos projets et recevez des propositions
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-50" style={{ background: '#fff7f0' }}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Prêt à commencer ?</span>
            <span className="block text-[#ED6A2C]">Créez votre compte gratuitement aujourd'hui.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#ED6A2C] hover:bg-orange-600"
              >
                S'inscrire
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#ED6A2C] bg-white hover:bg-orange-50"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 