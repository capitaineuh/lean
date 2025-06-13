import React from 'react';

interface Article {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'}/articles`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Erreur lors du chargement des articles');
  return res.json();
}

export default async function BlogPage() {
  let articles: Article[] = [];
  try {
    articles = await getArticles();
  } catch (e) {
    return <div className="p-8">Erreur lors du chargement des articles.</div>;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6">
        {articles.length === 0 && <p className="text-gray-600">Aucun article pour le moment.</p>}
        {articles.map(article => (
          <article key={article._id} className="p-6 border rounded-lg bg-white shadow">
            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
            <p className="mb-2 text-gray-700">{article.content}</p>
            <div className="text-xs text-gray-400">{new Date(article.createdAt).toLocaleString()}</div>
          </article>
        ))}
      </div>
    </main>
  );
} 