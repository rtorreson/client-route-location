import { ValidationError } from '@/layer/errors';
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export class ValidatorAdapter {
  constructor(private readonly schema: AnyZodObject) {}

  public isValid = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.schema.parseAsync({
        body: request.body,
        query: request.query,
        params: request.params,
        headers: request.headers,
      });
      return next();
    } catch (error) {
      if (error instanceof ValidationError) {
        response.status(400).json(error);
      }
    }
  };
}
