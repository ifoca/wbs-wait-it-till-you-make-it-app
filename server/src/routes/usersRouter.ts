import { Router } from 'express';
import { getUsers,getUserById, registerUser,loginUser,logoutUser,deleteUser } from '#controllers';
import {Auth} from '#middleware'
const usersRouter = Router();

// users
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/register', registerUser);
usersRouter.post('/login',Auth,loginUser);
usersRouter.post('/logout', logoutUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter;
