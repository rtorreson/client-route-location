import { Router } from 'express';
import { makeAddClientController } from '@/core/factory';

export default (router: Router): void => {
  router.route('/client').post(makeAddClientController);
};
