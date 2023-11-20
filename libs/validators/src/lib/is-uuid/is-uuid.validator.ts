import {
    UUIDVersion,
    ValidationOptions,
    IsUUID as _IsUUID,
} from 'class-validator'

import { ValidateErrors } from '../validate-error'

export const IsUUID = (
    version?: UUIDVersion,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _IsUUID(version, { ...validationOptions, message: ValidateErrors.IS_UUID })
