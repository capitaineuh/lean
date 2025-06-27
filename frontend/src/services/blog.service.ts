import { API_BASE_URL } from '../config/api';
import { API_ENDPOINTS } from '@/config/api';

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

export async function getUserCandidatures(userId: string, token: string) {
  const response = await fetch(API_ENDPOINTS.CANDIDATURES(userId), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des candidatures');
  }
  return response.json();
}

export async function getMesProjets(userId: string, token: string) {
  const response = await fetch(API_ENDPOINTS.MES_PROJETS(userId), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de vos projets');
  }
  return response.json();
}

export async function getUserById(userId: string, token: string) {
  const response = await fetch(`${API_ENDPOINTS.USERS}/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de l\'utilisateur');
  }
  return response.json();
}

export async function acceptCandidature(projectId: string, userId: string, token: string) {
  const response = await fetch(`${API_ENDPOINTS.TENDERS}/${projectId}/accept`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de l\'acceptation de la candidature');
  }
  return response.json();
}

export async function refuseCandidature(projectId: string, userId: string, token: string) {
  const response = await fetch(`${API_ENDPOINTS.TENDERS}/${projectId}/refuse`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) {
    throw new Error('Erreur lors du refus de la candidature');
  }
  return response.json();
} 