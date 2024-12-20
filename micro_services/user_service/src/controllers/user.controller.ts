import { Request, Response, NextFunction } from 'express';
import {
  getAllUsers as getAllUsersService,
  getUser as getUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from '../services/user.service';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of all users
 *       500:
 *         description: Server error
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({
      message: 'Failed to retrieve users',
      error: (error as any).message,
    });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User found
 *       500:
 *         description: Server error
 */
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await getUserService(req.params.id);
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json({
      message: 'Failed to retrieve user',
      error: (error as any).message,
    });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Server error
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await updateUserService(req.params.id, req.body);
    res.status(200).json({
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    console.error('Error in updateUser:', error);
    res.status(500).json({
      message: 'Failed to update user',
      error: (error as any).message,
    });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       500:
 *         description: Server error
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await deleteUserService(req.params.id);
    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).json({
      message: 'Failed to delete user',
      error: (error as any).message,
    });
  }
};
