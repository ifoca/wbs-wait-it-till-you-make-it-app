import { createContext, use } from 'react';
import { type Favorite } from '../../types/index';

type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (city: string, station: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (city: string, station: string) => boolean;
  loading: boolean;
};

export const FavoriteContext = createContext<FavoritesContextType | undefined>(undefined);

const useFavoriteState = () => {
  const context = use(FavoriteContext);
  if (!context) {
    throw new Error('FavoriteContext does not exist in this component');
  }
  return context;
};

export default useFavoriteState;
