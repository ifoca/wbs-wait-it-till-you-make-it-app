import { Router } from 'express';
import { addFavorite,getFavoritesByUser,deleteFavorite } from '#controllers';



const favoriteRouter= Router()

favoriteRouter.post('/add',addFavorite);
favoriteRouter.get('/user/:userId',getFavoritesByUser);
favoriteRouter.delete('/delete/:id',deleteFavorite);

export  default favoriteRouter