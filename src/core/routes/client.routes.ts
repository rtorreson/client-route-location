import { Router } from 'express';
import {
  makeAddClientController,
  makeReadClientController,
} from '@/core/factory';

export default (router: Router): void => {
  router.post('/add', makeAddClientController);
  router.get('/list', makeReadClientController);
};
