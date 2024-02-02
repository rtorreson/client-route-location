import { NextFunction, Request, Response } from 'express';
import { Controller } from '@/domain/models';
import { BaseController } from '@/core/factory/controllers/base';
import { TClient } from '@/domain/models/clients/clients';
import { ReadDDLQueryPg } from '@/core/factory/controllers/query';

export class ReadClientHandler extends BaseController implements Controller {
  constructor() {
    super();
  }
  async handle(
    _request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      await this.database.query({ sql: 'BEGIN' });

      const ddlQuery = await new ReadDDLQueryPg('SELECT.sql').readQuery();

      const results = await this.database.query<TClient[]>({
        sql: ddlQuery,
      });

      await this.database.query({ sql: 'COMMIT' });
      return response.status(200).json({ message: 'success', results });
    } catch (error: unknown) {
      this.database.query({ sql: 'ROLLBACK' });
      this.handleGlobalError(response, error as Error);
    }
  }
}
