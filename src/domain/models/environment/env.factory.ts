export interface IEnvironmentFactory {
    get<T>(key: string, defaultValue?: T): T | undefined
}