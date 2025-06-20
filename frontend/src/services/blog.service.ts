import { API_BASE_URL } from '../config/api';

export async function getAllBlogPosts() {
  const res = await fetch(`${API_BASE_URL}/blog`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Erreur lors de la récupération des articles');
  return res.json();
}

export async function createBlogPost(data: { title: string; content: string }, token: string) {
  const res = await fetch(`${API_BASE_URL}/blog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur lors de la création de l\'article');
  return res.json();
} 