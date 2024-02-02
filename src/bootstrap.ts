import { Server } from '@/core/server';
import { Logger } from '@/layer/middlewares';
import { ServerError } from '@/layer/errors';
import ENV from '@/infra/environments';
import { internalProcess } from '@/infra/process';

const bootstrap = async () => {
  const logger = new Logger();
  try {
    const serverInstance = new Server({
      port: ENV.SERVER.PORT,
      enableHttps: true,
    });

    internalProcess(serverInstance);

    serverInstance.start();
  } catch (error) {
    if (error instanceof ServerError) {
      logger.warn(`Erro ao iniciar ${error.message}`);
      process.exit(1);
    }
  }
};

bootstrap();
