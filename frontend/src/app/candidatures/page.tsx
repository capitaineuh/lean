"use client";

import { useEffect, useState } from 'react';
import { getUserCandidatures } from '@/services/blog.service';
import { useAuth } from '@/contexts/AuthContext';
import { API_BASE_URL } from '@/config/api';

interface Project {
  _id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  location: string;
  category: string;
  applicants?: string[];
  validatedApplicants?: string[];
}

export default function CandidaturesPage() {
  const { user } = useAuth();
  const [candidatures, setCandidatures] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelSuccess, setCancelSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchCandidatures = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token manquant');
        const data = await getUserCandidatures(user.id, token);
        setCandidatures(data);
      } catch (err: any) {
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidatures();
  }, [user]);

  const handleCancel = async (projectId: string) => {
    if (!user) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token manquant');
      const response = await fetch(`${API_BASE_URL}/tenders/${projectId}/cancel`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!response.ok) throw new Error('Erreur lors de l\'annulation');
      setCandidatures((prev) => prev.filter((p) => p._id !== projectId));
      setCancelSuccess('Votre désinscription a bien été prise en compte.');
      setTimeout(() => setCancelSuccess(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Erreur lors de l\'annulation');
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Mes candidatures</h1>
      {cancelSuccess && <div className="mb-4 text-green-600 font-semibold">{cancelSuccess}</div>}
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && candidatures.length === 0 && (
        <p>Vous n'avez candidaté à aucun projet pour le moment.</p>
      )}
      <div className="space-y-6">
        {candidatures.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2 text-black">{project.title}</h2>
            <p className="text-gray-700 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-4 text-sm mb-2">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">{project.category}</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{project.location}</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Budget : {project.budget.toLocaleString('fr-FR')} €</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Date limite : {new Date(project.deadline).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="mt-2">
              {project.validatedApplicants?.includes(user?.id || '') ? (
                <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full font-medium">Candidature acceptée</span>
              ) : project.applicants?.includes(user?.id || '') ? (
                <span className="inline-block bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-medium">En attente de confirmation</span>
              ) : (
                <span className="inline-block bg-red-200 text-red-800 px-3 py-1 rounded-full font-medium">Candidature refusée</span>
              )}
              <button
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => handleCancel(project._id)}
              >
                Annuler la candidature
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 