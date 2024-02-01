import { Pool, PoolClient } from 'pg';
import ENV from '@/infra/environments';

class PgConnection {
  private static instance: PgConnection;
  readonly pool: Pool;

  private constructor() {
    this.pool = new Pool({
      user: ENV.DATABASE.PG.USER,
      host: ENV.DATABASE.PG.HOST,
      database: ENV.DATABASE.PG.DB,
      password: ENV.DATABASE.PG.PASS,
      port: ENV.DATABASE.PG.PORT,
    });
  }

  static getInstance(): PgConnection {
    if (!PgConnection.instance) {
      PgConnection.instance = new PgConnection();
    }
    return PgConnection.instance;
  }

  async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  async release(client: PoolClient): Promise<void> {
    client.release();
  }
}

export default PgConnection;
