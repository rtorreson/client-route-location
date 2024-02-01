import { TClient } from "@/domain/models/clients/clients";

export class Client implements TClient {
  id?: number;
  name: string;
  email: string;
  cellphone: string;
  coordinates: { x: number; y: number };

  constructor({
    id,
    name,
    email,
    cellphone,
    coordinates,
  }: {
    id?: number;
    name: string;
    email: string;
    cellphone: string;
    coordinates: { x: number; y: number };
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.cellphone = cellphone;
    this.coordinates = coordinates;
  }
}
