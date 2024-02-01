import dotenv from 'dotenv';
import { IEnvironmentFactory, EnvConfig } from '@/domain/models';

dotenv.config();

export class EnvironmentFactory implements IEnvironmentFactory {
    private config: EnvConfig;

    constructor() {
        this.config = process.env;
    }

    public get<T>(key: string, defaultValue?: T): T | undefined {
        return this.config[key] !== undefined ? this.config[key] as T : defaultValue;
    }
}
