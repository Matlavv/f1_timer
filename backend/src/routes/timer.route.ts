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

/**
 * @swagger
 * tags:
 *   name: Timer
 *   description: Endpoints for managing timers
 */

/**
 * @swagger
 * /timers/get-reaction-times/{user_id}:
 *   get:
 *     summary: Get all timers for a user
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A list of all timers for a user
 *       500:
 *         description: Server error
 */
timerRouter.get('/get-reaction-times/:user_id', authMiddleware, getAllTimers);

/**
 * @swagger
 * /timers/get-reaction-times/{user_id}/{id}:
 *   get:
 *     summary: Get a timer by ID for a user
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A timer for a user
 *       500:
 *         description: Server error
 */
timerRouter.get('/get-reaction-times/:user_id/:id', authMiddleware, getTimer);

/**
 * @swagger
 * /timers/submit-reaction-time:
 *   post:
 *     summary: Create a new timer
 *     tags: [Timer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - time
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               time:
 *                 type: number
 *     responses:
 *       201:
 *         description: Timer created successfully
 *       400:
 *         description: Error creating timer
 */
timerRouter.post('/submit-reaction-time', authMiddleware, createTimer);

export default timerRouter;
