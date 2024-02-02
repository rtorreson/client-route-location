import { NextFunction, Request, Response } from 'express';
import { OptimizedRouteHandler } from '@/app';

export const makeDecideOptmalRouteClientController = (
  request: Request,
  response: Response
) => {
  return new OptimizedRouteHandler().handle(request, response);
};
