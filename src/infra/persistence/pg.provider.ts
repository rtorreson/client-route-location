import { Pool, PoolClient, QueryResultRow } from 'pg';
import ENV from '@/infra/environments'

class PgConnection {
    private static instance: PgConnection;
    private pool: Pool;

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
        const client = await this.pool.connect();
        return client;
    }

    async release(client: PoolClient): Promise<void> {
        client.release();
    }

    async query<T extends QueryResultRow>(sql: string, values?: any[]): Promise<T[] | undefined> {
        const client = await this.pool.connect();
        try {
            const result = await client.query<T>(sql, values);
            return result.rows;
        } catch (error: unknown) {
            console.error(error)
        } finally {
            this.release(client);
        }
    }
}

export default PgConnection;
