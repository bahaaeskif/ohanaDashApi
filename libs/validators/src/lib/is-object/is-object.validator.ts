import { ValidationOptions, IsObject as _IsObject } from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const IsObject = (
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsObject({ ...validationOptions, message: ValidateErrors.IS_OBJECT })
