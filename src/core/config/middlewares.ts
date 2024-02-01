import {
  Express,
  json,
  urlencoded,
} from 'express';
import cors from 'cors';
import lusca from 'lusca'
import helmet from 'helmet';

export default (app: Express): void => {
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  app.use(helmet());
  app.use(cors({ origin: '*' }));
  app.use(lusca())
};
