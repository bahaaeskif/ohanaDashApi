import { ValidationOptions, Length as _Length } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

import { ValidateErrors } from '../validate-error'

export const Length = (
    min: number,
    max: number,
    validationOptions?: ValidationOptions,
): PropertyDecorator =>
    _Length(min, max, {
        ...validationOptions,
        message: i18nValidationMessage(ValidateErrors.LENGTH as never, {
            num1: min,
            num2: max,
        }),
    })

// export interface ValidatorConstraintInterfaceCustom {
//   validate(
//     value: any,
//     validationArguments?: ValidationArguments
//   ): Promise<boolean> | boolean;
//   defaultMessage?(validationArguments?: ValidationArguments): string;
// }

// @ValidatorConstraint({ name: 'Length', async: true })
// @Injectable()
// class LengthRole implements ValidatorConstraintInterfaceCustom {
//   constructor(
//     private errorMessage: { error: string; constraint: number }[] = []
//   ) {}

//   async validate(value: string, args: ValidationArguments): Promise<boolean> {
//     this.errorMessage = [];
//     const length = value.length;
//     const minLength = args.constraints[0];
//     const maxLength = args.constraints[1];

//     if (length < minLength)
//       this.errorMessage = [
//         ...this.errorMessage,
//         { error: 'LengthMin', constraint: minLength },
//       ];

//     if (length > maxLength)
//       this.errorMessage = [
//         ...this.errorMessage,
//         { error: 'LengthMax', constraint: maxLength },
//       ];

//     if (this.errorMessage.length) return false;
//     return true;
//   }

//   defaultMessage(args: ValidationArguments): string {
//     // var errors = '';
//     // for (let i = 0; i < this.errorMessage.length; i++) {
//     //   const error = 'validation.' + this.errorMessage[i].error;
//     //   errors += await i18n.t(error, {
//     //     args: {
//     //       num: this.errorMessage[i].constraint,
//     //     },
//     //   });
//     // }
//     return 'Length({num: 1})';
//   }
// }

// export function Length(
//   min: number,
//   max?: number,
//   validationOptions?: ValidationOptions
// ) {
//   return function (object: any, propertyName: string) {
//     registerDecorator({
//       name: 'Length',
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [min, max],
//       options: validationOptions,
//       validator: LengthRole,
//     });
//   };
// }
