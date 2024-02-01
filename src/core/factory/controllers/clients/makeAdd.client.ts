import { Request, Response } from 'express';
import { AddClientHandler } from '@/app';

export const makeAddClientController = (
  request: Request,
  response: Response
) => {
  return new AddClientHandler().handle(request, response);
};
