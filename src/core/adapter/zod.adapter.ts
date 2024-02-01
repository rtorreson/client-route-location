import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export class ValidatorAdapter {
  constructor(private readonly schema: AnyZodObject) {}

  isValid = async (
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
      response.status(400).json(error);
    }
  };
}
