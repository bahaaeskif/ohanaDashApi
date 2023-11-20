import { ValidationOptions, IsMimeType as _IsMimeType } from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const IsMimeType = (
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsMimeType({ ...validationOptions, message: ValidateErrors.IS_MIME_TYPE })
