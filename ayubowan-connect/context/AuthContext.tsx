'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { AuthContextType, UserRole, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>('guest');

  useEffect(() => {
    // Check if window exists to avoid SSR issues accessing localStorage
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole') as UserRole;
      const storedUser = localStorage.getItem('userData');
      
      if (storedRole && storedRole !== 'guest' && storedUser) {
        setRole(storedRole);
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const loginAsTraveller = () => {
    const newUser: User = { id: '1', name: 'John Traveler', email: 'john@example.com', role: 'traveller' };
    setUser(newUser);
    setRole('traveller');
    localStorage.setItem('userRole', 'traveller');
    localStorage.setItem('userData', JSON.stringify(newUser));
  };

  const loginAsVendor = () => {
    const newUser: User = { id: '2', name: 'Local Artisan', email: 'artisan@example.com', role: 'vendor' };
    setUser(newUser);
    setRole('vendor');
    localStorage.setItem('userRole', 'vendor');
    localStorage.setItem('userData', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setRole('guest');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, loginAsTraveller, loginAsVendor, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
