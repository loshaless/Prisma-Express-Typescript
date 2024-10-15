import { Response } from 'express';

export interface CustomResponse<T = any> extends Response {
  json: (body: T) => this;
}