import { FaMinusCircle, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import type { Favorite } from '../types';
import { useFavoritesState } from '../contexts';

type FavoriteItemProps = {
  favorite: Favorite;
};

const FavoriteItem = ({ favorite }: FavoriteItemProps) => {
  const navigate = useNavigate();
  const { removeFavorite } = useFavoritesState();

  const handleSearch = () => {
    navigate(`/search/${favorite.stationId.cityName}/${favorite.stationId.stationName}`);
  };

  return (
    <tr className="text-center hover:bg-base-100">
      <td className="whitespace-normal break-words">{favorite.stationId.cityName}</td>
      <td className="whitespace-normal break-words">{favorite.stationId.stationName}</td>
      <td>
        <button onClick={handleSearch} className="btn btn-sm bg-base-100 hover:bg-base-300">
          <span>{<FaSearch />}</span>
        </button>
      </td>
      <td>
        <button
          className="btn btn-sm bg-base-100 hover:bg-base-300"
          onClick={() => removeFavorite(favorite._id)}
        >
          <span>{<FaMinusCircle />}</span>
        </button>
      </td>
    </tr>
  );
};

export default FavoriteItem;
