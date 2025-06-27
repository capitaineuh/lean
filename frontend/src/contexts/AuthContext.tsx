'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import authService from '@/services/auth.service';

interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  metier?: string;
  competences?: string[];
  isArtisan?: boolean;
  role?: string;
  siret?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  description?: string;
  tarifHoraire?: string;
  dateNaissance?: string;
  genre?: string;
  adresseParticulier?: string;
  codePostalParticulier?: string;
  villeParticulier?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = authService.getToken();
    console.log('[Auth] Token récupéré du localStorage :', token);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('[Auth] Payload décodé du token :', payload);
        const userId = payload.sub || payload.id || payload._id;
        console.log('[Auth] userId extrait du token :', userId);
        if (userId) {
          authService.fetchProfile(userId)
            .then((u) => {
              const userObj = u as User;
              const userWithId = { ...userObj, id: userObj.id || (userObj as any)._id };
              console.log('[Auth] Profil utilisateur récupéré via API :', userWithId);
              setUser(userWithId as User);
            })
            .catch((err) => {
              console.error('[Auth] Erreur lors de la récupération du profil utilisateur :', err);
              setUser(null);
            });
        } else {
          console.warn('[Auth] Aucun userId trouvé dans le token');
        }
      } catch (err) {
        console.error('[Auth] Erreur lors du décodage du token :', err);
      }
    } else {
      console.warn('[Auth] Aucun token trouvé dans le localStorage');
    }
  }, []);

  const login = async (_userData: User, token: string) => {
    localStorage.setItem('token', token);
    console.log('[Auth] Token stocké lors du login :', token);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('[Auth] Payload décodé du token (login) :', payload);
      const userId = payload.sub || payload.id || payload._id;
      console.log('[Auth] userId extrait du token (login) :', userId);
      if (userId) {
        const freshUser = await authService.fetchProfile(userId);
        const userObj = freshUser as User;
        const userWithId = { ...userObj, id: userObj.id || (userObj as any)._id };
        console.log('[Auth] Profil utilisateur récupéré via API (login) :', userWithId);
        setUser(userWithId as User);
      } else {
        console.warn('[Auth] Aucun userId trouvé dans le token (login)');
      }
    } catch (err) {
      console.error('[Auth] Erreur lors du décodage du token ou de la récupération du profil (login) :', err);
    }
  };

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      console.log('[Auth] updateUser appelé avec user.id =', user.id);
      const updatedUser = await authService.updateProfile(user.id, userData);
      const userObj = updatedUser as User;
      const userWithId = { ...userObj, id: userObj.id || (userObj as any)._id };
      setUser(userWithId as User);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 