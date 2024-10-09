import { Request, Response } from 'express';
import {
  getAllTimers as getAllTimersService,
  getTimer as getTimerService,
  createTimer as createTimerService,
} from '../services/timer.service';

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
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc for ascending and desc for descending)
 *       - in: query
 *         name: minTime
 *         schema:
 *           type: number
 *         description: Minimum time to filter
 *       - in: query
 *         name: maxTime
 *         schema:
 *           type: number
 *         description: Maximum time to filter
 *     responses:
 *       200:
 *         description: A list of all timers for a user
 *       500:
 *         description: Server error
 */
export const getAllTimers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user_id } = req.params;
  const { sort, minTime, maxTime } = req.query;

  try {
    const sortParam = sort ? sort.toString() : undefined;
    const minTimeParam = minTime !== undefined ? Number(minTime) : undefined;
    const maxTimeParam = maxTime !== undefined ? Number(maxTime) : undefined;

    if (
      (minTime !== undefined &&
        minTimeParam !== undefined &&
        isNaN(minTimeParam)) ||
      (maxTime !== undefined &&
        maxTimeParam !== undefined &&
        isNaN(maxTimeParam))
    ) {
      res
        .status(400)
        .json({ message: 'minTime and maxTime must be valid numbers' });
      return;
    }

    const timers = await getAllTimersService(
      user_id,
      sortParam,
      minTimeParam,
      maxTimeParam,
    );
    res.status(200).json(timers);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

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
export const getTimer = async (req: Request, res: Response): Promise<void> => {
  try {
    const timer = await getTimerService(req.params.id);
    res.status(200).json(timer);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

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
export const createTimer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newTimer = await createTimerService(req.body);
    res.status(201).json(newTimer);
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
};
