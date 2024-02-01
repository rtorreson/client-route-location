export type TClient = {
    readonly id?: number;
    name: string;
    email: string;
    cellphone: string;
    coordinates: {
        x: number;
        y: number;
    }
}