"use client";

import { useEffect, useState } from 'react';
import { getMesProjets, getUserById, acceptCandidature, refuseCandidature } from '@/services/blog.service';
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
  applicants: string[];
  participants?: number;
  validatedApplicants?: string[];
}

export default function MesProjetsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);
  const [applicantNames, setApplicantNames] = useState<Record<string, string>>({});
  const [acceptedApplicants, setAcceptedApplicants] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token manquant');
        const data = await getMesProjets(user.id, token);
        setProjects(data);
        // Récupère les noms des candidats
        const allApplicantIds: string[] = Array.from(new Set(data.flatMap((p: any) => p.applicants as string[])));
        const names: Record<string, string> = {};
        await Promise.all(
          allApplicantIds.map(async (id) => {
            try {
              const userData = await getUserById(id, token);
              names[id] = userData.firstName + ' ' + userData.lastName;
            } catch {
              names[id] = id;
            }
          })
        );
        setApplicantNames(names);
      } catch (err: any) {
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [user]);

  const handleEditClick = (project: Project) => {
    setEditProjectId(project._id);
    setEditForm({ ...project });
    setEditError(null);
    setEditSuccess(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    if (!user || !editProjectId) return;
    setEditLoading(true);
    setEditError(null);
    setEditSuccess(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token manquant');
      const response = await fetch(`${API_BASE_URL}/tenders/${editProjectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      if (!response.ok) throw new Error('Erreur lors de la modification');
      setEditSuccess('Projet modifié avec succès !');
      // Met à jour la liste locale
      setProjects((prev) => prev.map((p) => p._id === editProjectId ? { ...p, ...editForm } as Project : p));
      setTimeout(() => {
        setEditProjectId(null);
        setEditSuccess(null);
      }, 1500);
    } catch (err: any) {
      setEditError(err.message || 'Erreur lors de la modification');
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditProjectId(null);
    setEditError(null);
    setEditSuccess(null);
  };

  const handleAccept = async (projectId: string, applicantId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token manquant');
      await acceptCandidature(projectId, applicantId, token);
      setProjects((prev) => prev.map((p) =>
        p._id === projectId
          ? { ...p, applicants: p.applicants.filter((id) => id !== applicantId), validatedApplicants: [...(p.validatedApplicants || []), applicantId] }
          : p
      ));
    } catch (err) {
      alert('Erreur lors de l\'acceptation de la candidature');
    }
  };

  const handleRefuse = async (projectId: string, applicantId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token manquant');
      await refuseCandidature(projectId, applicantId, token);
      setProjects((prev) => prev.map((p) =>
        p._id === projectId
          ? { ...p, applicants: p.applicants.filter((id) => id !== applicantId), validatedApplicants: (p.validatedApplicants || []).filter((id) => id !== applicantId) }
          : p
      ));
    } catch (err) {
      alert('Erreur lors du refus de la candidature');
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Mes projets</h1>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && projects.length === 0 && (
        <p>Vous n'avez créé aucun projet pour le moment.</p>
      )}
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2 text-black">{project.title}</h2>
            <p className="text-gray-700 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-4 text-sm mb-2">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">{project.category}</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{project.location}</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Budget : {project.budget.toLocaleString('fr-FR')} €</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Date limite : {new Date(project.deadline).toLocaleDateString('fr-FR')}</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Participants requis : {project.validatedApplicants?.length || 0}/{project.participants ?? '-'}</span>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Candidatures reçues :</h3>
              {project.applicants.length === 0 ? (
                <p className="text-gray-500">Aucune candidature pour ce projet.</p>
              ) : (
                <ul className="space-y-2">
                  {project.applicants.map((applicantId) => (
                    <li key={applicantId} className="flex items-center gap-2">
                      <span className="text-gray-800">Candidat : {applicantNames[applicantId] || applicantId}</span>
                      {project.validatedApplicants?.includes(applicantId) ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Validé</span>
                      ) : (
                        <>
                          <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs" onClick={() => handleAccept(project._id, applicantId)}>Accepter</button>
                          <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs" onClick={() => handleRefuse(project._id, applicantId)}>Refuser</button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-4">
              {editProjectId === project._id ? (
                <div className="bg-gray-50 p-4 rounded mb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Titre</label>
                      <input name="title" value={editForm.title || ''} onChange={handleEditChange} className="w-full border rounded px-2 py-1" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Catégorie</label>
                      <input name="category" value={editForm.category || ''} onChange={handleEditChange} className="w-full border rounded px-2 py-1" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Budget</label>
                      <input name="budget" type="number" value={editForm.budget || ''} onChange={handleEditChange} className="w-full border rounded px-2 py-1" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Date limite</label>
                      <input name="deadline" type="date" value={editForm.deadline ? new Date(editForm.deadline).toISOString().split('T')[0] : ''} onChange={handleEditChange} className="w-full border rounded px-2 py-1" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Nombre de participants requis</label>
                      <input name="participants" type="number" min={1} value={editForm.participants || ''} onChange={handleEditChange} className="w-full border rounded px-2 py-1" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-black mb-1">Description</label>
                      <textarea name="description" value={editForm.description || ''} onChange={handleEditChange} className="w-full border rounded px-2 py-1" />
                    </div>
                    <div className="md:col-span-2 flex gap-2 mt-2">
                      <button type="button" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleEditSave} disabled={editLoading}>{editLoading ? 'Sauvegarde...' : 'Sauvegarder'}</button>
                      <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500" onClick={handleEditCancel}>Annuler</button>
                    </div>
                  </div>
                  {editError && <p className="text-red-500 mt-2">{editError}</p>}
                  {editSuccess && <p className="text-green-600 mt-2">{editSuccess}</p>}
                </div>
              ) : (
                <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600" onClick={() => handleEditClick(project)}>Modifier le projet</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
