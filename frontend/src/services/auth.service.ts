import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';

// Configuration d'axios
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isArtisan: boolean;
  metier?: string;
}

export interface RegisterResponse {
  isArtisan: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    metier?: string;
    competences?: string[];
    isArtisan?: boolean;
  };
}

class AuthService {
  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await axios.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Une erreur est survenue lors de l\'inscription');
    }
  }

  async login(data: LoginData): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Email ou mot de passe incorrect');
    }
  }

  async fetchProfile(userId: string) {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  }

  async updateProfile(userId: string, data: Partial<LoginResponse['user']>): Promise<LoginResponse['user']> {
    const response = await axios.put(`/users/${userId}`, data);
    return response.data as LoginResponse['user'];
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

export default new AuthService(); 