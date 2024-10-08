import { Request, Response } from 'express';
import {
  getAllTimers as getAllTimersService,
  getTimer as getTimerService,
  createTimer as createTimerService,
} from '../services/timer.service';

export const getAllTimers = async (req: Request, res: Response) => {
  try {
    const timers = await getAllTimersService(req.params.user_id);
    res.status(200).json(timers);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const getTimer = async (req: Request, res: Response) => {
  try {
    const timer = await getTimerService(req.params.id);
    res.status(200).json(timer);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const createTimer = async (req: Request, res: Response) => {
  try {
    const newTimer = await createTimerService(req.body);
    res.status(201).json(newTimer);
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
};
