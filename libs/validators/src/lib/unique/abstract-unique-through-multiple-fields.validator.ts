// import {
//   ValidationArguments,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// import { DataSource, EntitySchema, Not, ObjectType } from 'typeorm';

// interface UniqueValidationArguments<E> extends ValidationArguments {
//   constraints: [ObjectType<E> | EntitySchema<E> | string, keyof E, [string]];
// }

// export abstract class UniqueMultipleValidator
//   implements ValidatorConstraintInterface
// {
//   protected constructor(protected readonly dataSource: DataSource) {}

//   public async validate<E>(value: string, args: UniqueValidationArguments<E>) {
//     const [EntityClass, property, otherProperties] = args.constraints;

//     const conditions = {};

//     otherProperties.forEach((prop: string) => {
//       conditions[prop] = args.object[prop];
//     });

//     //for update
//     const exceptCurrentId = args.object['id']
//       ? { id: Not(args.object['id']) }
//       : {};

//     const check = await this.dataSource.getRepository(EntityClass).count({
//       withDeleted: true,
//       where: {
//         ...conditions,
//         [args.property]: value,
//         ...exceptCurrentId,
//       },
//     });

//     return check == 0;
//   }

//   public defaultMessage(args: ValidationArguments) {
//     const [EntityClass, property, otherProperties] = args.constraints;
//     const entity = EntityClass.name || 'Entity';
//     let properties = args.property;
//     otherProperties.forEach((prop) => {
//       properties += `,${prop}`;
//     });
//     return `${entity} with the same '${properties}' already exist`;
//   }
// }
