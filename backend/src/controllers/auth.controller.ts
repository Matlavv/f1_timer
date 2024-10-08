import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;

  try {
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword, role });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: (error as any).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Créer un token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'secret-key',
      { expiresIn: '1h' },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};
