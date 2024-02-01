import winston, { Logger as WintonLogger } from 'winston';

enum LogLevel {
    SILLY = 'silly',
    DEBUG = 'debug',
    VERBOSE = 'verbose',
    HTTP = 'http',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

export class Logger {
    private logger: WintonLogger;

    constructor() {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: 'logs/server.log',
                }),
            ],
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'DD-MMM-YYYY HH:mm:ss',
                }),
                winston.format.printf(
                    (info) =>
                        `[${info.level.toUpperCase()}] (${[info.timestamp]}): ${info.message
                        }`
                )
            ),
        });

        const logMethods: LogLevel[] = [
            LogLevel.DEBUG,
            LogLevel.VERBOSE,
            LogLevel.SILLY,
            LogLevel.INFO,
            LogLevel.WARN,
            LogLevel.ERROR,
        ];
        logMethods.forEach((method) => {
            // @ts-ignore
            this[method] = (message: string) => this.logger[method](message);
        });
    }

    info(message: string): void {
        this.logger.info(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }

    debug(message: string): void {
        this.logger.debug(message);
    }

    verbose(message: string): void {
        this.logger.verbose(message);
    }
}
