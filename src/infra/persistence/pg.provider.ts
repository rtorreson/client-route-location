import { PoolClient, QueryResultRow } from 'pg';
import { GlobalError } from '@/layer/errors';
import { Logger } from '@/layer';
import PgConnection from '../singleton/postgre/postgre.singleton';

class PgPersistence {
  private readonly logger: Logger;
  private readonly connection: PgConnection;

  constructor() {
    this.logger = new Logger();
    this.connection = PgConnection.getInstance();
  }

  async query<T extends QueryResultRow>({
    sql,
    values,
  }: {
    sql: string;
    values?: any[];
  }): Promise<QueryResultRow[]> {
    const client = await this.connection.getClient();
    try {
      const result = await client.query<T>(sql, values);
      return result.rows;
    } catch (error: unknown) {
      if (error instanceof GlobalError) {
        this.logger.error(error.message);
      }
      throw error;
    } finally {
      await this.connection.release(client);
    }
  }
}

export default PgPersistence;
