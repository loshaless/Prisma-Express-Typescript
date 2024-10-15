import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../utils/httpStatusCodes';

export const errorHandler = (
  err: Error,
  req: Request, 
  res: Response, 
  next: NextFunction,
) => {
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
};