import { Request, Response } from 'express';
import { Controller } from '@/domain/models';
import { BaseController } from '@/core/factory/controllers/base';
import { TClient } from '@/domain/models/clients/clients';

export class AddClientHandler extends BaseController implements Controller {
  constructor() {
    super();
  }
  async handle(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      if (!request.body) {
        return response.status(400).json({ message: 'Requisicao invalida' });
      }
      const { cellphone, coordinates, email, name } = request.body as TClient;

      if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof cellphone !== 'string' ||
        typeof coordinates.x !== 'number' ||
        typeof coordinates.y !== 'number'
      ) {
        return response
          .status(400)
          .json({ message: 'Dados do cliente inválidos.' });
      }

      await this.database.query<TClient>({
        sql: `
          INSERT INTO Catalog (nome, email, cellphone, coordinate_x, coordinate_y)
          VALUES ($1, $2, $3, $4, $5)
        `,
        values: [name, email, cellphone, coordinates.x, coordinates.y],
      });

      return response
        .status(200)
        .json({ message: 'Cliente criado com sucesso.' });
    } catch (error: unknown) {
      this.handleGlobalError(response, error as Error);
    }
  }
}
