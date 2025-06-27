export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`
  },
  TENDERS: `${API_BASE_URL}/tenders`,
  CANDIDATURES: (userId: string) => `${API_BASE_URL}/tenders/candidatures/${userId}`,
  MES_PROJETS: (userId: string) => `${API_BASE_URL}/tenders/mes-projets/${userId}`,
}; 