import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsSame(property: string, options?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSame',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          return value === relatedValue;
        }
      }
    })
  }
}
