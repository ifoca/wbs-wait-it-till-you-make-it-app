import { AuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import { useErrorAndLoadingState } from '..';
import { type User } from '../../types/index';

function AuthState({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const { setError, setLoading } = useErrorAndLoadingState();

  const apiBaseUrl = import.meta.env.VITE_SERVER_API_URL;

  const loadCurrentUser = async () => {
    setIsWakingUp(true);
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${apiBaseUrl}/auth/user/current/me`, {
        credentials: 'include',
        signal: AbortSignal.timeout(90000), // 90 second timeout
      });

      if (res.ok) {
        const data = await res.json();
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
    } finally {
      setIsWakingUp(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const setAuth = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      loadCurrentUser();
      return;
    }
    setAuthToken(false);
    setUser(null);
  };

  const logout = async () => {
    await fetch(`${apiBaseUrl}/auth/user/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setAuthToken(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, setAuth, logout, isWakingUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthState;
