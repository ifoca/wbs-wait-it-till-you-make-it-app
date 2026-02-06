import { Router } from 'express';
import {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
} from '#controllers';
import {Auth} from '#middleware'

const usersRouter = Router();

// users
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.post('/logout',Auth, logoutUser);
usersRouter.delete('/:id',Auth, deleteUser);

export default usersRouter;
