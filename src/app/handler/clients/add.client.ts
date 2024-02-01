import { NextFunction, Request, Response } from 'express';
import { Controller } from '@/domain/models';
import { BaseController } from '@/core/factory/controllers/base';
import { TClient } from '@/domain/models/clients/clients';
import { Client } from '@/core/builder/client';
import { ValidatorAdapter } from '@/core/adapter';
import { createClientEntity } from './helpers/entitie';
import { validate } from './helpers/validation';

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
      if (!request.body) {
        return response.status(400).json({ message: 'Requisicao invalida' });
      }

      await this.database.query({ sql: 'BEGIN' });

      const { ...rest } = request.body as TClient;

      await validate(this.clientDataValidator, request, response, next);

      const {
        cellphone,
        coordinates: { x, y },
        email,
        name,
      } = createClientEntity({
        ...rest,
      });

      await this.database.query<TClient>({
        sql: `
          INSERT INTO Catalog (nome, email, cellphone, coordinate_x, coordinate_y)
          VALUES ($1, $2, $3, $4, $5)
        `,
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
