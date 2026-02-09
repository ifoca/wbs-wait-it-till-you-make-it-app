import { Router } from 'express';
import { addFavorite, getFavoritesByUser, deleteFavorite } from '#controllers';
import { zodValidation } from '#middleware';
import { deleteFavoriteSchema, favoriteSchema } from '#schemas';

const favoritesRouter = Router();

favoritesRouter.post('/add',zodValidation(favoriteSchema), addFavorite);
favoritesRouter.get('/:userId', getFavoritesByUser);
favoritesRouter.delete('/delete/:id',zodValidation(deleteFavoriteSchema) ,deleteFavorite);

export default favoritesRouter;
