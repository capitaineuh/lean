'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { API_BASE_URL } from '@/config/api';

interface Artisan {
  id: string;
  firstName: string;
  lastName: string;
  metier: string;
  competences: string[];
  localisation: string;
  note: number;
  projetsRealises: number;
}

const METIERS = [
  'Ébéniste',
  'Joaillier',
  'Métallurgie',
  'Serrurier',
  'Plombier',
  'Électricien',
  'Maçon',
  'Carreleur',
  'Peintre',
  'Menuisier',
  'Charpentier',
  'Couturier',
  'Tapissier',
  'Céramiste',
  'Souffleur de verre',
  'Forgeron',
  'Sculpteur',
  'Doreur',
  'Maroquinier',
  'Autre'
];

export default function ArtisansPage() {
  const { user } = useAuth();
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    metier: '',
    localisation: '',
    note: 0
  });

  useEffect(() => {
    fetchArtisans();
  }, [filters]);

  const fetchArtisans = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/artisans?` + new URLSearchParams({
        metier: filters.metier,
        localisation: filters.localisation,
        note: filters.note.toString()
      }));
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des artisans');
      }

      const data = await response.json();
      setArtisans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trouvez les meilleurs artisans pour vos projets
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez notre sélection d'artisans qualifiés près de chez vous
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="metier" className="block text-sm font-medium text-gray-700 mb-2">
                Corps de métier
              </label>
              <select
                id="metier"
                name="metier"
                value={filters.metier}
                onChange={handleFilterChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Tous les métiers</option>
                {METIERS.map((metier) => (
                  <option key={metier} value={metier}>
                    {metier}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="localisation" className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <input
                type="text"
                id="localisation"
                name="localisation"
                value={filters.localisation}
                onChange={handleFilterChange}
                placeholder="Ville ou code postal"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                Note minimum
              </label>
              <select
                id="note"
                name="note"
                value={filters.note}
                onChange={handleFilterChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="0">Toutes les notes</option>
                <option value="4">4 étoiles et plus</option>
                <option value="3">3 étoiles et plus</option>
                <option value="2">2 étoiles et plus</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des artisans */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des artisans...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : artisans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun artisan ne correspond à vos critères</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisans.map((artisan) => (
              <div key={artisan.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {artisan.firstName} {artisan.lastName}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-gray-600">{artisan.note.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {artisan.metier}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Localisation:</span> {artisan.localisation}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Projets réalisés:</span> {artisan.projetsRealises}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Compétences:</h4>
                    <div className="flex flex-wrap gap-2">
                      {artisan.competences.map((competence) => (
                        <span
                          key={competence}
                          className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                        >
                          {competence}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="w-full bg-[#ED6A2C] text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300"
                    onClick={() => {/* TODO: Implémenter la redirection vers le profil de l'artisan */}}
                  >
                    Voir le profil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 