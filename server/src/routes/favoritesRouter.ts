import { Router } from 'express';
import { addFavorite, getFavoritesByUser, deleteFavorite, deleteAllFavorites } from '#controllers';
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
favoritesRouter.delete( '/:userId/:stationId',validateObjectId('userId'),validateObjectId('stationId'), deleteFavorite);
favoritesRouter.delete('/:userId',validateObjectId('userId'), deleteAllFavorites);



  /*'/:favoriteId',
  validateObjectId('favoriteId'),
  zodValidation(deleteFavoriteSchema),
  deleteFavorite,*/

export default favoritesRouter;
