import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function ConverToRegex(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: RegexConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'ConverToRegex' })
export class RegexConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    (args.object as any)[relatedPropertyName] = new RegExp(
      `.*${relatedValue}.*`,
      'i',
    );
    return true;
  }
}
