import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import { useErrorAndLoadingState } from '../contexts';

function AuthState({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<boolean>(false);
  const { setError, setLoading } = useErrorAndLoadingState();

  const apiBaseUrl = import.meta.env.VITE_SERVER_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch(`${apiBaseUrl}/auth/user/current/me`, {
          credentials: 'include',
        });

        if (res.ok) {
          setAuthToken(true);
        } else {
          setAuthToken(false);
        }
      } catch (error: unknown) {
        const message = (error as { message: string }).message;
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const setAuth = (isAuthenticated: boolean) => {
    setAuthToken(isAuthenticated);
  };

  const logout = async () => {
    await fetch(`${apiBaseUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setAuthToken(false);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuth, logout }}>{children}</AuthContext.Provider>
  );
}

export default AuthState;
