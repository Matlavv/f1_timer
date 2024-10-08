import express from 'express';
import {
  getAllTimers,
  getTimer,
  createTimer,
} from '../controllers/timer.controller';
import { loggerMiddleware } from '../middlewares/logger.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const timerRouter = express.Router();

timerRouter.use(loggerMiddleware);

// Routes protégées
timerRouter.get('/get-reaction-times/:user_id', authMiddleware, getAllTimers);
timerRouter.get('/get-reaction-times/:user_id/:id', authMiddleware, getTimer);
timerRouter.post('/submit-reaction-time', authMiddleware, createTimer);

export default timerRouter;
