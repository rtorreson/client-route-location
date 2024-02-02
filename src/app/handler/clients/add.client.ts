import { NextFunction, Request, Response } from 'express';
import { Controller } from '@/domain/models';
import { BaseController } from '@/core/factory/controllers/base';
import { TClient } from '@/domain/models/clients/clients';
import { ValidatorAdapter } from '@/core/adapter';
import { createClientEntity } from './helpers/entitie';
import { validate } from './helpers/validation';
import { ReadDDLQueryPg } from '@/core/factory/controllers/query';

export class AddClientHandler extends BaseController implements Controller {
  readonly clientDataValidator: ValidatorAdapter;

  constructor(clientDataValidator: ValidatorAdapter) {
    super();
    this.clientDataValidator = clientDataValidator;
  }
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      await this.database.query({ sql: 'BEGIN' });

      await validate(this.clientDataValidator, request, response, next);

      const { ...rest } = request.body as TClient;

      const {
        cellphone,
        coordinates: { x, y },
        email,
        name,
      } = createClientEntity({
        ...rest,
      });

      const ddlQuery = await new ReadDDLQueryPg('INSERT.sql').readQuery();

      const execute = await this.database.query<TClient>({
        sql: ddlQuery,
        values: [name, email, cellphone, x, y],
      });

      await this.database.query({ sql: 'COMMIT' });
      return response
        .status(200)
        .json({ message: 'Cliente criado com sucesso.' });
    } catch (error: unknown) {
      this.database.query({ sql: 'ROLLBACK' });
      this.handleGlobalError(response, error as Error);
    }
  }
}
