import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;

  console.log('Register endpoint hit');
  console.log('Body:', req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword, role });

    console.log('Attempting to save user to DB:', user);

    const newUser = await user.save();
    console.log('User saved:', newUser);

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' },
    );
    console.log('Token created:', token);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(400).json({ message: (error as any).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  console.log('Login endpoint hit');
  console.log(req.body);

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log('Invalid credentials: user not found');
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials: password does not match');
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' },
    );
    console.log('Login successful, token created');
    res.json({ token });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: (error as any).message });
  }
};
