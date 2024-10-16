import { Request } from 'express';

export interface JwtPayload {
  id?: number;
  email: string;
  iat: number;
  exp: number;
}

export interface CustomRequest<T = any> extends Request {
  version?: string;
  body: T;
  jwt?: JwtPayload;
}