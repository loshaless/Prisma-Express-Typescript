import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../utils/customRequest';
import { CustomResponse } from '../utils/customResponse';
declare namespace Express {
  interface Request {
      version?: string;
  }
}
export function versionHandler(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    const version = req.headers['accept-version'] as string || '1.0';
    req.version = version;
    next();
}