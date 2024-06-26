import {
  Validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isArrayOrString', async: false })
export class IsIdStringConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (typeof value === 'string' && value.length === 24) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain a string or an array of strings with ids in the ObjectId format`;
  }
}

export function IsIdString(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsIdStringConstraint, validationOptions)(object, property);
  };
}
