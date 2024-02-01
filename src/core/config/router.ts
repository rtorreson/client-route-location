import { Express, Router } from 'express';
import * as routes from '@/core/routes';

export default (app: Express): void => {
  const router = Router();

  Object.values(routes).forEach((route) => {
    route(router);
  });

  app.use('/v1', router);
};
