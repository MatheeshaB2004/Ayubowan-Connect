'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';
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
  const [authReady, setAuthReady] = useState(false);

  const { user: clerkUser, isSignedIn, isLoaded: clerkLoaded } = useUser();

  useEffect(() => {
    if (!clerkLoaded) return;

    if (isSignedIn && clerkUser) {
      // Derive role from Clerk unsafeMetadata set during registration
      const clerkRole = clerkUser.unsafeMetadata?.role as string | undefined;
      const mappedRole: UserRole = clerkRole === 'vendor' ? 'vendor' : 'traveller';

      setRole(mappedRole);
      setUser({
        id: clerkUser.id,
        name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
        email: clerkUser.emailAddresses[0]?.emailAddress ?? '',
        role: mappedRole,
      });
      setAuthReady(true);
      return;
    }

    // Not signed in via Clerk — fall back to localStorage (mock/dev login)
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole') as UserRole;
      const storedUser = localStorage.getItem('userData');

      if (storedRole && storedRole !== 'guest' && storedUser) {
        setRole(storedRole);
        setUser(JSON.parse(storedUser));
        setAuthReady(true);
        return;
      }
    }

    // No auth found — set as guest
    setRole('guest');
    setUser(null);
    setAuthReady(true);
  }, [clerkLoaded, isSignedIn, clerkUser]);

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
    <AuthContext.Provider value={{ user, role, isAuthenticated, authReady, loginAsTraveller, loginAsVendor, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
