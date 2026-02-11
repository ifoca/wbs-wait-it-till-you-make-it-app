import type { Favorite } from '../types';

type FavoriteItemProps = {
  favorite: Favorite;
};

const FavoriteItem = ({ favorite }: FavoriteItemProps) => {
  return (
    <tr>
      <td>{favorite.stationId.stationName}</td>
      <td>{favorite.nickname}</td>
      <td>
        <button className="btn btn-xs">Departures</button>
      </td>
      <td>
        <button className="btn btn-xs">Remove</button>
      </td>
    </tr>
  );
};

export default FavoriteItem;
