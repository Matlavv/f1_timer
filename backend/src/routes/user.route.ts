import express from 'express';
import {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { register, login } from '../controllers/auth.controller';
import { loggerMiddleware } from '../middlewares/logger.middleware';
import { validateUser } from '../middlewares/validateUser.middleware';
import { validateLogin } from '../middlewares/validateLogin.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { dbCheckMiddleware } from '../middlewares/dbCheck.middleware';

const userRouter = express.Router();

userRouter.use(loggerMiddleware);

// Routes publiques
userRouter.post('/register', dbCheckMiddleware, validateUser as any, register);
userRouter.post('/login', dbCheckMiddleware, validateLogin as any, login);

// Routes protégées
userRouter.get('/', dbCheckMiddleware, authMiddleware, getAllUsers);
userRouter.get('/:id', dbCheckMiddleware, authMiddleware, getUser);
userRouter.post('/', dbCheckMiddleware, authMiddleware, createUser);
userRouter.put('/:id', dbCheckMiddleware, authMiddleware, updateUser);
userRouter.delete('/:id', dbCheckMiddleware, authMiddleware, deleteUser);

export default userRouter;
