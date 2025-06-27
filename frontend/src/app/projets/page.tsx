'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/api';
import { useAuth } from '@/contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  location: string;
  category: string;
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

export default function ProjetsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    location: '',
  });
  const { user } = useAuth();
  const [applyLoading, setApplyLoading] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applySuccessId, setApplySuccessId] = useState<string | null>(null);
  const [applyErrorId, setApplyErrorId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        category: filters.category,
        location: filters.location,
      });
      const response = await fetch(`${API_BASE_URL}/tenders?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des projets');
      }

      const data = await response.json();
      const mapped = data.map((p: any) => ({ ...p, id: p.id || p._id }));
      setProjects(mapped);
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

  const handleApply = async (projectId: string) => {
    if (!user) {
      setApplyErrorId(projectId);
      setApplyError('Vous devez être connecté pour candidater.');
      return;
    }
    setApplyLoading(projectId);
    setApplySuccessId(null);
    setApplyErrorId(null);
    setApplySuccess(null);
    setApplyError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/tenders/${projectId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la candidature');
      }
      setApplySuccessId(projectId);
      setApplySuccess('Candidature envoyée !');
    } catch (err: any) {
      setApplyErrorId(projectId);
      setApplyError(err.message || 'Erreur lors de la candidature');
    } finally {
      setApplyLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trouvez les meilleurs projets
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez notre sélection de projets et d'appels d'offres
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Corps de métier
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
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
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Ville ou code postal"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Liste des projets */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des projets...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun projet ne correspond à vos critères</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <div className="mb-4">
                    <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 h-24 overflow-hidden">{project.description}</p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-800 font-bold text-lg mb-2">
                      Budget: {project.budget.toLocaleString('fr-FR')} €
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Localisation:</span> {project.location}
                    </p>
                     <p className="text-gray-600">
                      <span className="font-medium">Date limite:</span> {new Date(project.deadline).toLocaleDateString('fr-FR')}
                    </p>
                    <button
                      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition disabled:opacity-50"
                      onClick={() => handleApply(project.id)}
                      disabled={applyLoading === project.id}
                    >
                      {applyLoading === project.id ? 'Candidature en cours...' : 'Candidater'}
                    </button>
                    {applySuccessId === project.id && applySuccess && applyLoading === null && (
                      <p className="text-green-600 mt-2">{applySuccess}</p>
                    )}
                    {applyErrorId === project.id && applyError && applyLoading === null && (
                      <p className="text-red-600 mt-2">{applyError}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 