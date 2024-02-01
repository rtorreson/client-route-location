import { EnvironmentFactory } from "@/core/factory";

const ENV = new EnvironmentFactory()

export default {
  SERVER: {
    PORT: ENV.get<number>('APP_PORT', 3001)!,
  },
  DATABASE: {
    PG: {
      USER: ENV.get<string>('PG_USER'),
      PASS: ENV.get<string>('PG_PASS'),
      HOST: ENV.get<string>('PG_HOST'),
      DB: ENV.get<string>('PG_DB'),
      PORT: ENV.get<number>('PG_PORT', 5432)
    }
  }
};
