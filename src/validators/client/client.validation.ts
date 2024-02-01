import { AnyZodObject, z as zod } from 'zod';

export class ClientDataValidator {
  readonly schema: AnyZodObject;

  constructor() {
    this.schema = zod.object({
      name: zod.string(),
      email: zod.string().email(),
      cellphone: zod.string().min(10),
      coordinates: zod.object({
        x: zod.number(),
        y: zod.number(),
      }),
    });
  }
}
