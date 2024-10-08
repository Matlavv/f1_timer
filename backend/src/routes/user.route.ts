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

const userRouter = express.Router();

userRouter.use(loggerMiddleware);

// Routes publiques
userRouter.post('/register', validateUser as any, register);
userRouter.post('/login', validateLogin as any, login);

// Routes protégées
userRouter.get('/', authMiddleware, getAllUsers);
userRouter.get('/:id', authMiddleware, getUser);
userRouter.post('/', authMiddleware, createUser);
userRouter.put('/:id', authMiddleware, updateUser);
userRouter.delete('/:id', authMiddleware, deleteUser);

export default userRouter;
