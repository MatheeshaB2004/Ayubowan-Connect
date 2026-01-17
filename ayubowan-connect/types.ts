export type UserRole = 'guest' | 'traveller' | 'vendor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  loginAsTraveller: () => void;
  loginAsVendor: () => void;
  logout: () => void;
}
