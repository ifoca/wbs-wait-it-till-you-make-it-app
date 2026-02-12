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
              <FavoriteItem key={favorite._id} favorite={favorite} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FavoritesPage;
