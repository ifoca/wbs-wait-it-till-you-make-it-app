import { Router } from 'express';
import {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
} from '#controllers';
import { validateToken } from '#middleware';

const usersRouter = Router();

// users
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.post('/logout', validateToken, logoutUser);
usersRouter.delete('/:id', validateToken, deleteUser);

export default usersRouter;
