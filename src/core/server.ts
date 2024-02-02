import express, { Express } from 'express';
import http from 'http';
import { Server as HttpServer, createServer as createHttpServer } from 'http';
import {
  Server as HttpsServer,
  createServer as createHttpsServer,
} from 'https';
import { join } from 'path';
import { readFileSync } from 'fs';
import SetupMiddlewares from '@/core/config/middlewares';
import SetupRouter from '@/core/config/router';
import { Logger } from '@/layer/middlewares';

export class Server {
  private readonly app: Express;
  private readonly port: number;
  private httpServer!: http.Server;
  private server!: HttpServer | HttpsServer | null;
  private enableHttps?: boolean;
  private readonly logger: Logger;
  private readonly credentials!: { key: Buffer; cert: Buffer };

  constructor({ port, enableHttps }: { port: number; enableHttps: boolean }) {
    this.app = express();
    this.port = port;
    process.env.TZ = 'America/Sao_Paulo';
    this.logger = new Logger();

    this.enableHttps = enableHttps;

    if (this.enableHttps) {
      this.credentials = {
        cert: readFileSync(join(__dirname, '..', '..', 'ssl', 'localhost.crt')),
        key: readFileSync(join(__dirname, '..', '..', 'ssl', 'localhost.key')),
      };
      this.server = createHttpsServer(this.credentials, this.app);
    } else {
      this.server = null;
    }
  }

  private setupRoutes(): void {
    SetupRouter(this.app);
  }

  private setupMiddleware(): void {
    SetupMiddlewares(this.app);
  }

  private setup(): void {
    this.setupMiddleware();
    this.setupRoutes();
  }

  public async start(): Promise<void> {
    this.setup();

    if (!this.server) {
      this.server = createHttpServer(this.app);
    }

    await new Promise<void>((resolve, reject) => {
      if (this.server) {
        this.server.listen(this.port, () => {
          const serverAddress = this.server!.address();

          if (serverAddress && typeof serverAddress === 'object') {
            const protocol = this.enableHttps ? 'https' : 'http';
            const host =
              serverAddress.address === '::'
                ? 'localhost'
                : (serverAddress.address as string);
            const port = serverAddress.port;
            const bind = `${protocol}://${host}:${port}`;

            this.logger.info(`Server listening on ${bind}`);
            resolve();
          } else {
            this.logger.error('Server address format not supported');
            reject();
          }
        });
      }
    });
  }

  public async stop(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.httpServer.close(() => {
        this.logger.info('Server stopped.');
        resolve();
      });
    });

    process.exit(0);
  }
}
