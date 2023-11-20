import { ValidationOptions, IsOptional as _IsOptional } from 'class-validator';

export const IsOptional = (
  validationOptions?: ValidationOptions
): PropertyDecorator => _IsOptional({ ...validationOptions });
