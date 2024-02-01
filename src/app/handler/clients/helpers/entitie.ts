import { Client } from '@/core/builder';
import { TClient } from '@/domain/models/clients/clients';

export const createClientEntity = ({
  cellphone,
  coordinates,
  email,
  name,
}: {
  cellphone: string;
  coordinates: { x: number; y: number };
  email: string;
  name: string;
}): TClient => {
  return new Client({
    name,
    email,
    cellphone,
    coordinates: { x: coordinates.x, y: coordinates.y },
  });
};
