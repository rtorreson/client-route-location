import { Response } from "express";
import { Logger } from "@/layer/middlewares";
import { GlobalError } from "@/layer/errors";
import { PgInstance } from "@/infra/persistence";

class BaseController {
    protected database: PgInstance;
    readonly logger: Logger;

    constructor() {
        this.database = PgInstance.getInstance();
        this.logger = new Logger();
    }

    protected handleGlobalError(response: Response, error: Error): void {
        if (error instanceof GlobalError) {
            this.logger.error(error.message);
            response.status(error.statusCode).json({ message: error.message });
        } else {
            this.logger.error(error.message);
            response.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}

export default BaseController;
