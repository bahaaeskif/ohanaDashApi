// import {
//   isUUID,
//   ValidationArguments,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// import {
//   DataSource,
//   EntitySchema,
//   FindOptionsWhere,
//   In,
//   ObjectType,
// } from 'typeorm';

// interface ExistValidationArguments<E> extends ValidationArguments {
//   constraints: [
//     ObjectType<E> | EntitySchema<E> | string,
//     (
//       | ((validationArguments: ValidationArguments) => FindOptionsWhere<E>)
//       | keyof E
//     )
//   ];
// }

// export abstract class ExistValidator implements ValidatorConstraintInterface {
//   protected constructor(protected readonly dataSource: DataSource) {}

//   public async validate<E>(
//     value: string | string[],
//     args: ExistValidationArguments<E>
//   ) {
//     const [EntityClass, findCondition = args.property] = args.constraints;

//     if (typeof value === 'string') {
//       const count = await this.dataSource.getRepository(EntityClass).count({
//         where:
//           typeof findCondition === 'function'
//             ? findCondition(args)
//             : {
//                 [args.constraints[1] as string]: value,
//               },
//       });
//       return count >= 1;
//     } else if (value?.length > 0) {
//       for (let i = 0; i < value.length; i++) {
//         const item = value[i];
//         if (!isUUID(item)) return false;
//       }
//       return (
//         (await this.dataSource.getRepository(EntityClass).count({
//           where:
//             typeof findCondition === 'function'
//               ? findCondition(args)
//               : {
//                   [findCondition || args.property]: In(value),
//                 },
//         })) === value.length
//       );
//     }
//     return false;
//   }

//   public defaultMessage(args: ValidationArguments) {
//     const [EntityClass] = args.constraints;
//     const entity = EntityClass.name || 'Entity';
//     return `${args.property} Not Exist In ${entity}`;
//   }
// }
