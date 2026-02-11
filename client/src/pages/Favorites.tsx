import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type Favorite } from '../types/index';
import { useAuthState, useErrorAndLoadingState } from '../contexts';
import { FavoriteItem } from '../components';
import { ErrorMessage, LoadingMessage } from '../components';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { error, setError, loading, setLoading } = useErrorAndLoadingState();
  const { authToken, user } = useAuthState();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  useEffect(() => {
    if (!user) return;

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

    fetchFavorites();
  }, [user]);

  if (!authToken) {
    return (
      <div className="text-center p-8">
        <p>Log in to see your favorites!</p>
        <button onClick={() => navigate('/user')} className="btn">
          Go to Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!favorites) {
    return (
      <div className="text-center p-8">
        <p>You don't have any stations saved as Favorites!</p>
        <button onClick={() => navigate('/')} className="btn">
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto h-96 w-96">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <td>Station name</td>
              <td>Nickname</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite) => (
              <FavoriteItem favorite={favorite} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FavoritesPage;
