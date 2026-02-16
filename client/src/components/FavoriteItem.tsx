import type { Favorite } from '../types';
import { useFavoritesState } from '../contexts';


type FavoriteItemProps = {
  favorite: Favorite;
};

const FavoriteItem = ({ favorite }: FavoriteItemProps) => {
  const { removeFavorite } = useFavoritesState();
  return (
    <tr className="hover:bg-base-100">
      <td>{favorite.stationId.cityName}</td>
      <td>{favorite.stationId.stationName}</td>
      <td>
        <button className="btn btn-xs hover:bg-base-300">Departures</button>
      </td>
      <td>
        <button className="btn btn-xs hover:bg-base-300"onClick={()=> removeFavorite(favorite._id)}>
          Remove</button>
      </td>
    </tr>
  );
};

export default FavoriteItem;
