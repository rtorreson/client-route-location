import { AnyZodObject, z as zod } from 'zod';

export class ClientDataValidator {
  readonly schema: AnyZodObject;

  constructor() {
    this.schema = zod.object({
      name: zod.string(),
      email: zod.string().email(),
      cellphone: zod.string().min(9).max(12),
      coordinates: zod.object({
        x: zod.number().min(1).max(8),
        y: zod.number().min(1).max(8),
      }),
    });
  }
}
