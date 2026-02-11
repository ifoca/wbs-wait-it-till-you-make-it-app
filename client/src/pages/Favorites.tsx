import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { type Favorites } from '../types/index';
import { useAuthState, useErrorAndLoadingState } from '../contexts';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { error, setError, loading, setLoading } = useErrorAndLoadingState();
  const { authToken, setAuth } = useAuthState();
  const [stations, setStations] = useState<Favorites[]>([]);

  // useState for getting the stations
  // add conditional to display no favorites + go to homepage

  // fetch the favorites
  // check if the user is logged in
  // if yes, get the user id
  // use the id to create the request to get the favorites

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

  if (stations.length === 0) {
    return (
      <div className="text-center p-8">
        <p>You don't have any stations saved!</p>
        <button onClick={() => navigate('/')} className="btn">
          Go to Homepage
        </button>
      </div>
    );
  }

  //   return <div>Favorites list</div>;
};

export default FavoritesPage;
