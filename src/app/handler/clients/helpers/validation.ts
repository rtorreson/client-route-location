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
    next();
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      response.status(400).json({
        message: 'Dados do cliente inválidos.',
        errors: error.validationErrors,
      });
    }
  }
};
