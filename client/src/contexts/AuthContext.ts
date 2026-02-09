import { createContext, use } from 'react';

export type AuthContextType = {
  authToken: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth context does not exist in this component');
  }
  return context;
};

export default useAuth;
