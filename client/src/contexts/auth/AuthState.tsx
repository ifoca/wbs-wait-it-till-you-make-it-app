import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import { useErrorAndLoadingState } from '..';
import { type User } from '../../types/index';

function AuthState({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
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
          const data = await res.json();
          console.log(data);
          const userData: User = {
            id: data.user._id,
            username: data.user.username,
            email: data.user.email,
          };
          setUser(userData);
          setAuthToken(true);
        } else {
          setAuthToken(false);
          setUser(null);
        }
      } catch (error: unknown) {
        const message = (error as { message: string }).message;
        setError(message);
        setAuthToken(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const setAuth = (isAuthenticated: boolean) => {
    setAuthToken(isAuthenticated);
  };

  // TO DO: check to move this somewhere else?
  const logout = async () => {
    await fetch(`${apiBaseUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setAuthToken(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthState;
