import { ValidationOptions, MinLength as _MinLength } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

import { ValidateErrors } from '../validate-error'

export const MinLength = (
    minValue: number,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _MinLength(minValue, {
        ...validationOptions,
        message: i18nValidationMessage(ValidateErrors.MIN as never, {
            num: minValue,
        }),
    })
