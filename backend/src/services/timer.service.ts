import { Request, Response } from 'express';
import timerModel from '../models/timer.model';

export const getAllTimers = async (user_id: string) => {
  return timerModel.find({ user_id });
};

export const getTimer = async (id: string) => {
  return timerModel.findOne({ _id: id });
};

export const createTimer = async (timerData: {
  user_id: string;
  time: number;
}) => {
  const timer = new timerModel(timerData);
  return timer.save();
};
