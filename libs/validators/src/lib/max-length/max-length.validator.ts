import { ValidationOptions, MaxLength as _MaxLength } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

import { ValidateErrors } from '../validate-error'

export const MaxLength = (
    maxValue: number,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _MaxLength(maxValue, {
        ...validationOptions,
        message: i18nValidationMessage(ValidateErrors.MAX as never, {
            num: maxValue,
        }),
    })
