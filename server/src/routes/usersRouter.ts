import { Router } from 'express';
import {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  getCurrentUser,
} from '#controllers';
import { validateToken } from '#middleware';
import { loginSchema, registrationSchema } from '#schemas';
import { zodValidation } from '#middleware';

const usersRouter = Router();

// users
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/register', zodValidation(registrationSchema), registerUser);
usersRouter.post('/login', zodValidation(loginSchema), loginUser);
usersRouter.post('/logout', validateToken, logoutUser);
usersRouter.delete('/:id', validateToken, deleteUser);
usersRouter.get('/current/me', validateToken, getCurrentUser);

export default usersRouter;
