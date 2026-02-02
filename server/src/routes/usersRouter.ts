import { Router } from 'express';
import { getUsers,getUserById, registerUser,loginUser,logoutUser,deleteUser } from '#controllers';

const usersRouter = Router();

// users
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.post('/logout',logoutUser)
usersRouter.delete('/user/:id', deleteUser)

export default usersRouter;
