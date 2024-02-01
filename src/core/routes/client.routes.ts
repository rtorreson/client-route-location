import { Router } from 'express';
import {
  makeAddClientController,
  makeReadClientController,
} from '@/core/factory';

export default (router: Router): void => {
  router
    .route('/client')
    .post(makeAddClientController)
    .get(makeReadClientController);
};
