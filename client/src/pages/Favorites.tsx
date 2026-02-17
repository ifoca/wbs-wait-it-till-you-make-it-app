import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState, useErrorAndLoadingState, useFavoritesState } from '../contexts';
import { FavoriteItem } from '../components';
import { ErrorMessage, LoadingMessage } from '../components';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { error, loading } = useErrorAndLoadingState();
  const { authToken, user } = useAuthState();
  const { favorites } = useFavoritesState();

  useEffect(() => {
    if (!user) return;
  }, [user]);

  if (!authToken) {
    return (
      <div className="text-center p-8">
        <p>Log in to see your favorites!</p>
        <button onClick={() => navigate('/user')} className="btn m-4 p-4">
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

  if (favorites.length === 0) {
    return (
      <div className="text-center p-8">
        <p>You don't have any stations saved as Favorites!</p>
        <button onClick={() => navigate('/')} className="btn p-4 m-4">
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto h-96 w-96 bg-base-300 text-neutral-content rounded-box">
        <h1 className="text-xl font-semibold text-neutral-content text-center p-4">
          Your favorites at a glance
        </h1>
        <div className="flex justify-end px-4 pb-2"></div>
        <table className="table table-xs">
          <thead>
            <tr>
              <th>City</th>
              <th>Station</th>
              <th>See departures</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite) => (
              <FavoriteItem key={favorite._id} favorite={favorite} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FavoritesPage;
