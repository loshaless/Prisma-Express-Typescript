import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../utils/httpStatusCodes';
import { CustomError } from '../utils/customError';
import { ErrorDTO } from '../dtos/errorDTO';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const statusCode = err instanceof CustomError ? err.statusCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ message: err.message } as ErrorDTO);
}
