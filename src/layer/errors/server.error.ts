export class ServerError extends Error {
    constructor(error: string) {
        super('Internal Server Error');
        this.message = error || 'Internal Server Error';
    }
}
