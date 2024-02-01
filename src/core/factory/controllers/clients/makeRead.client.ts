import { NextFunction, Request, Response } from 'express';
import { ReadClientHandler } from '@/app';

export const makeReadClientController = (
  request: Request,
  response: Response
) => {
  return new ReadClientHandler().handle(request, response);
};
