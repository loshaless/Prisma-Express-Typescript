import { Response, NextFunction } from 'express';
import { verifyToken } from '../helper/jwt';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import { CustomError } from '../utils/customError';
import userService from '../services/userService';
import { CustomRequest, JwtPayload } from '../utils/customRequest';

export async function authenticate(req: CustomRequest, _res: Response, next: NextFunction) {
  try {
    let {token} = req.headers
    let decoded = verifyToken(token as string) as JwtPayload

    const user = await userService.getUserByEmail(decoded.email as string)
    if (!user) {
      next(new CustomError('Invalid JWT', HttpStatusCode.UNAUTHORIZED))
    }

    req.jwt = decoded
    req.jwt.id = user?.id
    next()
  } catch (err) {
    next(new CustomError('You must be logged in', HttpStatusCode.FORBIDDEN))
  }
}