import { Response } from 'express';

export interface Controller<T = any, D = any> {
    handle(request?: T, response?: D): Promise<Response | undefined>;
}
