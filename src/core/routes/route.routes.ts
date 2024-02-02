import { Router } from 'express';
import { makeDecideOptmalRouteClientController } from '@/core/factory';

export default (router: Router): void => {
  router.route('/calculate-route').get(makeDecideOptmalRouteClientController);
};
