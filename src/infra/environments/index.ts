import { EnvironmentFactory } from "@/core/factory";

const ENV = new EnvironmentFactory()

export default {
  SERVER: {
    PORT: ENV.get<number>('APP_PORT', 3001)!,
  },
  DATABASE: {
    PG: {
      USER: ENV.get<string>(''),
      PASS: ENV.get<string>(''),
      HOST: ENV.get<string>(''),
      DB: ENV.get<string>(''),
      PORT: ENV.get<number>('5432', 5432)
    }
  }
};
