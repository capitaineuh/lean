"use client";

import { useEffect, useState } from 'react';
import { getAllBlogPosts, createBlogPost } from '@/services/blog.service';
import { useAuth } from '@/contexts/AuthContext';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Pour le formulaire d'ajout
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    setLoading(true);
    getAllBlogPosts()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Erreur inconnue');
        setLoading(false);
      });
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token manquant, veuillez vous reconnecter.');
      await createBlogPost({ title, content }, token);
      setFormSuccess('Article ajouté avec succès !');
      setTitle('');
      setContent('');
      setShowForm(false);
      fetchArticles();
    } catch (err: any) {
      setFormError(err.message || 'Erreur lors de l\'ajout de l\'article');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-black">Blog</h1>
      {user?.role === 'admin' && (
        <div className="mb-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setShowForm((v) => !v)}
            disabled={formLoading}
          >
            {showForm ? 'Annuler' : 'Ajouter un article'}
          </button>
          {showForm && (
            <form onSubmit={handleAddArticle} className="mt-4 p-4 bg-gray-50 rounded shadow">
              <div className="mb-2">
                <label className="block mb-1 font-medium">Titre</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={formLoading}
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1 font-medium">Contenu</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={5}
                  disabled={formLoading}
                />
              </div>
              {formError && <p className="text-red-500 mb-2">{formError}</p>}
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                disabled={formLoading}
              >
                {formLoading ? 'Ajout en cours...' : 'Publier'}
              </button>
            </form>
          )}
          {formSuccess && <p className="text-green-600 mt-2">{formSuccess}</p>}
        </div>
      )}
      {loading && <p>Chargement des articles...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && articles.length === 0 && (
        <p>Aucun article pour le moment.</p>
      )}
      {!loading && !error && articles.map((article) => {
        const isExpanded = expandedArticleId === article._id;
        return (
          <article
            key={article._id}
            className={`mb-8 p-6 rounded-lg shadow bg-white cursor-pointer transition-all duration-300 ${isExpanded ? 'max-h-full' : 'max-h-32 overflow-hidden'}`}
            onClick={() => setExpandedArticleId(isExpanded ? null : article._id)}
            style={{ color: '#000000', border: isExpanded ? '2px solid #2563eb' : '1px solid #e5e7eb' }}
          >
            <h2 className="text-2xl font-semibold mb-2" style={{ color: '#000000' }}>{article.title}</h2>
            <p className="text-gray-500 text-sm mb-4" style={{ color: '#000000' }}>
              Publié le {new Date(article.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
              {article.author ? ` par ${article.author}` : ''}
            </p>
            <p style={{ color: '#000000' }}>
              {isExpanded ? article.content : `${article.content.slice(0, 120)}${article.content.length > 120 ? '...' : ''}`}
            </p>
            <div className="mt-2 text-blue-600 text-sm select-none">
              {isExpanded ? 'Réduire ▲' : 'Lire la suite ▼'}
            </div>
          </article>
        );
      })}
    </main>
  );
} 