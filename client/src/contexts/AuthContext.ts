import { createContext, use } from 'react';
import { type User } from '../types/index';

export type AuthContextType = {
  authToken: boolean;
  user: User | null;
  setAuth: (isAuthenticated: boolean) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuthState = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('AuthContext does not exist in this component');
  }
  return context;
};

export default useAuthState;
