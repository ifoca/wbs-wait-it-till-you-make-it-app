import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState, useErrorAndLoadingState, useFavoritesState } from '../contexts';
import { FavoriteItem } from '../components';
import { ErrorMessage, LoadingMessage } from '../components';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { error, loading } = useErrorAndLoadingState();
  const { removeAllFavorites } = useFavoritesState();

  const { authToken, user } = useAuthState();
  const { favorites } = useFavoritesState();

  useEffect(() => {
    if (!user) return;
  }, [user]);

  if (!authToken) {
    return (
      <div className="text-center p-8">
        <p className="p-4">Log in to see your favorites!</p>
        <button
          onClick={() => navigate('/user')}
          className="btn btn-sm bg-base-300 hover:bg-neutral"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    <div className="flex flex-col gap-4 items-center">
      <ErrorMessage error={error} />
    </div>;
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
      {' '}
      <div className="text-center">
        <h1 className="text-3xl font-bold px-4">Your Stations</h1>
        <p className="text-sm px-4">
          Your saved stations at a glance. Jump straight to departures or manage your list.
        </p>
      </div>
      <div className="flex-1 bg-base-100">
        <h3 className="font-semibold text-center m-2 p-2">Your saved stations at a glance</h3>
        <div className="overflow-x-auto w-full mx-auto border rounded-box border-base-content/5 bg-base-300">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr className="text-center ">
                <td className="w-32">City</td>
                <td className="w-32">Station</td>
                <td className="w-18">Search</td>
                <td className="w-18">Remove</td>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite) => (
                <FavoriteItem key={favorite._id} favorite={favorite} />
              ))}
            </tbody>
            <tfoot>
              <tr className="text-center">
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button
                    className="btn btn-xs bg-base-300 text-neutral-content hover:bg-base-100"
                    onClick={() => removeAllFavorites()}
                  >
                    Remove all
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
