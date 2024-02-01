declare namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      APP_PORT: number;
      DATABASE_URL: string;
    }
  }
  