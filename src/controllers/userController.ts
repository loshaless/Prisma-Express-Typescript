import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../services/userService';
import { HttpStatusCode } from '../utils/httpStatusCodes';

export async function createUserController(req: Request, res: Response, next: Function): Promise<void> {
  try {
    // get user data to check if user already exists
    const user = await getUserByEmail(req.body.email);
    if (user) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'User already exists' });
      return;
    }
    // create user
    const createdUser = await createUser(req.body);
    res.status(HttpStatusCode.CREATED).json({email: createdUser.email} );
  } catch (error: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
