import express, { Express } from "express";
import http from "http";
import SetupMiddlewares from "@/core/config/middlewares";
import SetupRouter from "@/core/config/router";
import { Logger } from "@/layer/middlewares";

export class Server {
  private readonly app: Express;
  private readonly port: number;
  private httpServer!: http.Server;
  private readonly logger: Logger;

  constructor({ port }: { port: number }) {
    this.app = express();
    this.port = port;
    process.env.TZ = "America/Sao_Paulo";
    this.logger = new Logger();
  }

  private setupRoutes(): void {
    SetupRouter(this.app);
  }

  private setupMiddleware(): void {
    SetupMiddlewares(this.app);
  }

  private setup(): void {
    this.setupMiddleware()
    this.setupRoutes();
  }

  public async start(): Promise<void> {
    this.setup();

    this.httpServer = http.createServer(this.app);

    await new Promise<void>((resolve, reject) => {
      this.httpServer.listen(this.port, () => {
        const serverAddress = this.httpServer.address();

        if (typeof serverAddress === "object" && serverAddress !== null) {
          const protocol = this.httpServer instanceof (require("https").Server) ? "https" : "http";
          const host = serverAddress.address === "::" ? "localhost" : serverAddress.address as string;
          const port = serverAddress.port;
          const bind = `${protocol}://${host}:${port}`;

          this.logger.info(`Server listening on ${bind}`);
          resolve();
        } else {
          this.logger.error("Server address format not supported");
          reject();
        }
      });
    });
  }

  public async stop(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.httpServer.close(() => {
        this.logger.info("Server stopped.");
        resolve();
      });
    });

    process.exit(0);
  }
}
