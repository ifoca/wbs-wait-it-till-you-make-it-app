import { AuthContext } from './AuthContext';
import { useState } from 'react';

function AuthState({ children }: { children: React.ReactNode }) {
  const [authToken, setAuth] = useState<string | null>(null);
  return <AuthContext.Provider value={{ authToken, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthState;
