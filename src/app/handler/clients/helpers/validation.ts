import { NextFunction, Request, Response } from 'express';
import { ValidatorAdapter } from '@/core/adapter';
import { ValidationError } from '@/layer/errors';

export const validate = async (
  clientDataValidator: ValidatorAdapter,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await clientDataValidator.isValid(request, response, next);
  } catch (error: unknown) {
    throw error;
  }
};
