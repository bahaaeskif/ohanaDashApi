import {
    ValidationOptions,
    ValidateNested as _ValidateNested,
} from 'class-validator'

export const ValidateNested = (
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _ValidateNested({
        ...validationOptions,
        // message: 'validation.ValidateNested',
    })
