import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helper/jwt';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import { CustomError } from '../utils/customError';
import userService from '../services/userService';

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    let {token} = req.headers
    let decoded = verifyToken(token as string) as {email: string}

    const user = await userService.getUserByEmail(decoded.email as string)
    if (!user) {
      next(new CustomError('Invalid JWT', HttpStatusCode.UNAUTHORIZED))
    }
    
    next()
  } catch (err) {
    next(new CustomError('You must be logged in', HttpStatusCode.FORBIDDEN))
  }
}