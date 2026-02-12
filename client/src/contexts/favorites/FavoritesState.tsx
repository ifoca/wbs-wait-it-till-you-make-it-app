import { useEffect, useState } from 'react';
import { FavoritesContext } from './FavoritesContext';
import type { Favorite } from '../../types';
import useErrorAndLoadingState from '../errorAndLoading/ErrorAndLoadingContext';
import useAuthState from '../auth/AuthContext';

function FavoritesState({ children }: { children: React.ReactNode }) {
  const { user } = useAuthState();
  const { setError, setLoading } = useErrorAndLoadingState();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const apiBaseUrl = import.meta.env.VITE_SERVER_API_URL;

  // Fetch favorites when user logs in
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const fetchFavorites = async () => {
      const apiBaseUrl = import.meta.env.VITE_SERVER_API_URL;

      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${apiBaseUrl}/favorites/${user.id}`);
        if (!res.ok) {
          throw new Error(`Could not fetch favorites.`);
        }

        const favorites: Favorite[] = await res.json();
        console.log(favorites);
        setFavorites(favorites);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : `Could not fetch your favorites.`);
      } finally {
        setLoading(false);
      }
    };

    // const fetchFavorites = async () => {
    //   setLoading(true);
    //   const res = await fetch(`${apiBaseUrl}/favorites/${user.id}`, {
    //     credentials: 'include',
    //   });
    //   const data = await res.json();
    //   setFavorites(data.favorites);
    //   setLoading(false);
    // };

    fetchFavorites();
  }, [user]);

  const addFavorite = async (city: string, station: string) => {
    const res = await fetch(`${apiBaseUrl}/favorites`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, station }),
    });
    const newFavorite = await res.json();
    setFavorites((prev) => [...prev, newFavorite]);
  };

  const removeFavorite = async (id: string) => {
    await fetch(`${apiBaseUrl}/favorites/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setFavorites((prev) => prev.filter((fav) => fav._id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((fav) => fav._id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesState;
