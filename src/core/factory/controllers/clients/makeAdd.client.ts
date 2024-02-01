import { NextFunction, Request, Response } from 'express';
import { AddClientHandler } from '@/app';
import { ClientDataValidator } from '@/validators/client/client.validation';
import { ValidatorAdapter } from '@/core/adapter';

export const makeAddClientController = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const clientDataValidator = new ClientDataValidator();
  const validatorAdapter = new ValidatorAdapter(clientDataValidator.schema);
  const addClientHandler = new AddClientHandler(validatorAdapter);
  return addClientHandler.handle(request, response, next);
};
