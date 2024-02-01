import { Response } from 'express';

export interface Controller<T = any, D = any, N = any> {
    handle(request?: T, response?: D, next?: N): Promise<Response | undefined>;
}
