import { useNavigate } from 'react-router-dom';
import type { Favorite } from '../types';
import { useFavoritesState } from '../contexts';

type FavoriteItemProps = {
  favorite: Favorite;
};

const FavoriteItem = ({ favorite }: FavoriteItemProps) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${favorite.stationId.cityName}/${favorite.stationId.stationName}`);
  };

  const { removeFavorite, removeAllFavorites } = useFavoritesState();
  return (
    <tr className="hover:bg-base-100">
      <td>{favorite.stationId.cityName}</td>
      <td>{favorite.stationId.stationName}</td>
      <td>
        <button onClick={handleSearch} className="btn btn-xs hover:bg-base-300">
          Departures
        </button>
      </td>
      <td>
        <button
          className="btn btn-xs hover:bg-base-300"
          onClick={() => removeFavorite(favorite._id)}
        >
          Remove
        </button>
      </td>

      <td>
        <button className="btn btn-xs" onClick={() => removeAllFavorites()}>
          clear
        </button>
      </td>
    </tr>
  );
};

export default FavoriteItem;
