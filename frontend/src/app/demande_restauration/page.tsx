'use client';
import React, { useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const API_URL = 'https://lean-back.onrender.com/api/tenders';

export default function DemandeRestauration() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    location: '',
    category: '',
    exigences: '',
    participants: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage({ type: 'error', text: 'Vous devez être connecté pour poster une demande.' });
        setLoading(false);
        return;
      }
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          budget: Number(form.budgetMax || form.budgetMin),
          deadline: form.deadline,
          location: form.location,
          category: form.category,
          exigences: form.exigences,
          participants: Number(form.participants),
        }),
      });
      if (!res.ok) {
        let errorMsg = 'Erreur lors de la création';
        try {
          const error = await res.json();
          errorMsg += error.message ? ` : ${error.message}` : '';
        } catch {}
        setMessage({ type: 'error', text: errorMsg });
      } else {
        setMessage({ type: 'success', text: 'Demande envoyée avec succès !' });
        setForm({ title: '', description: '', budgetMin: '', budgetMax: '', deadline: '', location: '', category: '', exigences: '', participants: '' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Erreur lors de la création : ' + (err instanceof Error ? err.message : 'Erreur inconnue') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] py-8 px-2">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#232d3f] mb-6">Créer une nouvelle demande de restauration</h1>
        {user && (
          <div className="mb-4 text-gray-700 text-sm">Connecté en tant que : <span className="font-semibold">{user.firstName} {user.lastName}</span> ({user.email})</div>
        )}
        {message && (
          <div className={`mb-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{message.text}</div>
        )}
        <form className="bg-white rounded-xl shadow p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-semibold text-black" htmlFor="title">Titre du projet</label>
                <input id="title" type="text" placeholder="Ex. : Restauration d'un violon du XIXᵉ siècle" className="mt-1 w-full border-2 border-orange-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500" value={form.title} onChange={handleChange} />
              </div>
              <div>
                <label className="font-semibold text-black" htmlFor="category">Catégorie</label>
                <input id="category" type="text" placeholder="Ex. : Instruments de musique, mobilier, céramique" className="mt-1 w-full border-2 border-orange-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500" value={form.category} onChange={handleChange} />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="font-semibold text-black" htmlFor="budgetMin">Fourchette budgétaire (minimale)</label>
                  <input id="budgetMin" type="number" placeholder="500 €" className="mt-1 w-full border-2 border-orange-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500" value={form.budgetMin} onChange={handleChange} />
                </div>
                <div className="w-1/2">
                  <label className="font-semibold text-black" htmlFor="budgetMax">Fourchette budgétaire (maximale)</label>
                  <input id="budgetMax" type="number" placeholder="1 500 €" className="mt-1 w-full border-2 border-orange-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500" value={form.budgetMax} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label className="font-semibold text-black" htmlFor="deadline">Date limite souhaitée</label>
                <input id="deadline" type="date" className="mt-1 w-full border-2 border-orange-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500" value={form.deadline} onChange={handleChange} />
              </div>
              <div>
                <label className="font-semibold text-black" htmlFor="location">Localisation</label>
                <input id="location" type="text" placeholder="Ville, Pays" className="mt-1 w-full border-2 border-orange-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500" value={form.location} onChange={handleChange} />
              </div>
              <div>
                <label className="font-semibold text-black" htmlFor="participants">Nombre de participants requis</label>
                <input id="participants" type="number" placeholder="1" className="mt-1 w-full border-2 border-orange-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500" value={form.participants} onChange={handleChange} min={1} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-semibold text-black" htmlFor="description">Description détaillée</label>
                <textarea id="description" placeholder="Décrivez l'objet, son état, son histoire, et ses besoins spécifiques en restauration…" className="mt-1 w-full border-2 border-orange-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:border-orange-500" value={form.description} onChange={handleChange} />
              </div>
              {/*
              <div>
                <label className="font-semibold" htmlFor="images">Télécharger des images</label>
                <div className="mt-1 border-2 border-dashed border-orange-400 rounded-xl flex flex-col items-center justify-center py-8 px-4 text-center cursor-pointer hover:bg-orange-50 transition" onClick={() => fileInputRef.current?.click()}>
                  <span className="text-4xl text-orange-400 mb-2">📷</span>
                  <span className="mb-4 text-gray-500">Glissez-déposez les images ici, ou cliquez pour parcourir</span>
                  <button type="button" className="inline-flex items-center gap-2 px-4 py-2 border border-orange-400 rounded bg-white text-orange-500 font-semibold hover:bg-orange-100 transition" onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                    <span>⬆️</span> Choisir des fichiers
                  </button>
                  <input ref={fileInputRef} id="images" type="file" multiple className="hidden" />
                </div>
              </div>
              */}
              <div>
                <label className="font-semibold text-black" htmlFor="exigences">Exigences particulières</label>
                <textarea id="exigences" placeholder="Des techniques, matériaux ou certifications spécifiques sont-ils nécessaires… ?" className="mt-1 w-full border-2 border-orange-300 rounded px-3 py-2 h-20 resize-none focus:outline-none focus:border-orange-500" value={form.exigences} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-4 mt-8">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded transition" disabled={loading}>{loading ? 'Envoi...' : 'Publier la demande'}</button>
          </div>
        </form>
      </div>
    </div>
  );
} 