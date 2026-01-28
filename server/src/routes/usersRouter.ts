import { Router } from 'express';
import { getUsers } from '#controllers';

const usersRouter = Router();

// users
usersRouter.get('/', getUsers);

export default usersRouter;
