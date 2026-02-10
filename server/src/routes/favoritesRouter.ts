import { Router } from 'express';
import { addFavorite, getFavoritesByUser, deleteFavorite } from '#controllers';
import { zodValidation, validateObjectId } from '#middleware';
import { deleteFavoriteSchema, favoriteSchema } from '#schemas';

const favoritesRouter = Router();

favoritesRouter.get('/:userId', validateObjectId('userId'), getFavoritesByUser);
favoritesRouter.post(
  '/:userId',
  validateObjectId('userId'),
  zodValidation(favoriteSchema),
  addFavorite,
);
favoritesRouter.delete(
  '/:favoriteId',
  validateObjectId('favoriteId'),
  zodValidation(deleteFavoriteSchema),
  deleteFavorite,
);

export default favoritesRouter;
