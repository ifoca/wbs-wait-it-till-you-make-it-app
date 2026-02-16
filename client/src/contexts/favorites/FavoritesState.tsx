import { useEffect, useState } from 'react';
import { FavoritesContext } from './FavoritesContext';
import type { Favorite } from '../../types';
import useErrorAndLoadingState from '../errorAndLoading/ErrorAndLoadingContext';
import useAuthState from '../auth/AuthContext';
import { normalizeGermanText } from '../../utils/normalize';

function FavoritesState({ children }: { children: React.ReactNode }) {
  const { user } = useAuthState();
  const { setError, setLoading } = useErrorAndLoadingState();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const apiBaseUrl = import.meta.env.VITE_SERVER_API_URL;

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
        if (res.ok) {
          const favorites: Favorite[] = await res.json();
          setFavorites(favorites);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : `Could not fetch your favorites.`);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user]);

  const addFavorite = async (cityName: string, stationName: string) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${apiBaseUrl}/favorites/${user.id}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityName, stationName }),
      });
      if (res.ok) {
        const newFavorite = await res.json();
        setFavorites((prev) => [...prev, newFavorite]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Could not add ${stationName} as favorite.`);
    } finally {
      setLoading(false);
    }
  };
  //---

  const removeFavorite = async (favoriteId: string) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      await fetch(`${apiBaseUrl}/favorites/${user.id}/${favoriteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not remove favorite.');
    } finally {
      setLoading(false);
    }
  };

  const removeAllFavorites = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      await fetch(`${apiBaseUrl}/favorites/${user.id}/delete-All`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setFavorites([]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not remove all favorites.');
    } finally {
      setLoading(false);
    }
  };




  const isFavorite = (cityName: string, stationName: string) => {
    const normalizedCity = normalizeGermanText(cityName);
    const normalizedStation = normalizeGermanText(stationName);
    return favorites.some(
      (fav) =>
        fav.stationId.cityNameNormalized === normalizedCity &&
        fav.stationId.stationNameNormalized === normalizedStation,
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, removeAllFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesState;
