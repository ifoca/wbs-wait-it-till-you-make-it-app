import { Router } from 'express';
import { addFavorite, getFavoritesByUser, deleteOneFavorite, deleteAllFavorites } from '#controllers';
import { zodValidation, validateObjectId } from '#middleware';
import { favoriteInputSchema } from '#schemas';

const favoritesRouter = Router();

favoritesRouter.get('/:userId', validateObjectId('userId'), getFavoritesByUser);
favoritesRouter.post(
  '/:userId',
  validateObjectId('userId'),
  zodValidation(favoriteInputSchema),
  addFavorite,
);
favoritesRouter.delete('/:userId/delete-All', validateObjectId('userId'), deleteAllFavorites);
favoritesRouter.delete('/:userId/:favoriteId', validateObjectId('userId'), validateObjectId('favoriteId'), deleteOneFavorite);




  /*'/:favoriteId',
  validateObjectId('favoriteId'),
  zodValidation(deleteFavoriteSchema),
  deleteFavorite,*/

export default favoritesRouter;
