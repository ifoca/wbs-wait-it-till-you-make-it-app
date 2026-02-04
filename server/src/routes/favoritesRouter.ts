import { Router } from 'express';
import { addFavorite, getFavoritesByUser, deleteFavorite } from '#controllers';

const favoritesRouter = Router();

favoritesRouter.post('/add', addFavorite);
favoritesRouter.get('/:userId', getFavoritesByUser);
favoritesRouter.delete('/delete/:id', deleteFavorite);

export default favoritesRouter;
