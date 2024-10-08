import { Request, Response } from 'express';
import {
  getAllUsers as getAllUsersService,
  getUser as getUserService,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from '../services/user.service';

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserService(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await updateUserService(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await deleteUserService(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};
