import { Request, Response, NextFunction } from 'express';
import { QueryResultRow } from 'pg';
import { BaseController } from '@/core/factory/controllers/base';
import { TClient } from '@/domain/models/clients/clients';
import { OptimizedRouteCalculator } from '@/infra/singleton';
import { Client } from '@/core/builder';
import { ReadDDLQueryPg } from '@/core/factory/controllers/query';

export class OptimizedRouteHandler extends BaseController {
  async handle(
    _request: Request,
    response: Response
  ): Promise<Response | undefined> {
    try {
      await this.database.query({ sql: 'BEGIN' });

      const ddlQuery = await new ReadDDLQueryPg('SELECT.sql').readQuery();

      const results = await this.database.query<TClient>({
        sql: ddlQuery,
      });

      const clients = results.map((result: QueryResultRow) => {
        return new Client({
          id: result.id,
          name: result.name,
          email: result.email,
          cellphone: result.cellphone,
          coordinates: {
            x: result.coordinate_x,
            y: result.coordinate_y,
          },
        });
      });

      const routeOptimizate = OptimizedRouteCalculator.getInstance(clients);

      const orderedCoordinates = routeOptimizate.calculateOptimalRoute();

      await this.database.query({ sql: 'COMMIT' });
      return response.status(200).json({ orderedCoordinates });
    } catch (error: unknown) {
      this.database.query({ sql: 'ROLLBACK' });
      this.handleGlobalError(response, error as Error);
    }
  }
}
