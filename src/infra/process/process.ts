import { Server } from '@/core/server';
import { Logger } from '@/layer';

export const internalProcess = (serverInstance: Server) => {
    const logger = new Logger();
    process.on('SIGINT', () => {
        logger.warn('SIGINT signal received. Stopping server...');
        serverInstance.stop();
    });
    process.on('SIGTERM', () => {
        logger.warn('SIGTERM signal received. Stopping server...');
        serverInstance.stop();
    });
};
