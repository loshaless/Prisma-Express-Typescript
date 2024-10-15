import { Request, Response } from 'express';
import { createUser } from '../services/userService';
import { HttpStatusCode } from '../utils/httpStatusCodes';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(HttpStatusCode.CREATED).json(user);
  } catch (error: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// Implement other CRUD operations similarly