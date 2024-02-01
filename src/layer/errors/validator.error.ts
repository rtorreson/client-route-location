export class ValidationError extends Error {
  constructor(validationErrors: string[]) {
    super('Zod validation failed');
    this.name = 'ZodValidationError';
    this.validationErrors = validationErrors;
  }

  readonly validationErrors: string[];
}
