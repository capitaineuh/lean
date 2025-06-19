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
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      authService.fetchProfile(payload.sub).then((u) => setUser(u as User)).catch(() => setUser(null));
    }
  }, []);

  const login = async (_userData: User, token: string) => {
    localStorage.setItem('token', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    const freshUser = await authService.fetchProfile(payload.sub);
    setUser(freshUser as User);
  };

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      const updatedUser = await authService.updateProfile(user.id, userData);
      setUser(updatedUser as User);
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