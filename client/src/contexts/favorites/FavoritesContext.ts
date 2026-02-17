import { createContext, use } from 'react';
import { type Favorite } from '../../types/index';

type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (city: string, station: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  removeAllFavorites: () => Promise<void>;
  isFavorite: (city: string, station: string) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const useFavoritesState = () => {
  const context = use(FavoritesContext);
  if (!context) {
    throw new Error('FavoriteContext does not exist in this component');
  }
  return context;
};

export default useFavoritesState;
