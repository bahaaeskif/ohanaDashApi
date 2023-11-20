import { ValidationOptions, IsEnum as _IsEnum } from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const IsEnum = (
    entity: object,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsEnum(entity, { ...validationOptions, message: ValidateErrors.IS_ENUM })
