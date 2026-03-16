export type UserRole = 'guest' | 'traveller' | 'vendor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  authReady: boolean;
  loginAsTraveller: () => void;
  loginAsVendor: () => void;
  logout: () => void;
}
