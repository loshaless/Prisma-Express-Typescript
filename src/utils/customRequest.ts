import { Request } from 'express';

export interface CustomRequest<T = any> extends Request {
  version?: string;
  body: T;
}