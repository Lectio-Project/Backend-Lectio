import {
  Validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isArrayOrString', async: false })
export class IsArrayOfIdStringsConstraint
  implements ValidatorConstraintInterface
{
  validate(value: Array<string> | undefined) {
    if (Array.isArray(value)) {
      return value.every(
        item => typeof item === 'string' && item.length === 24,
      );
    }
    if (!value) {
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain a string or an array of strings with ids in the ObjectId format`;
  }
}

export function IsArrayOfIdStrings(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsArrayOfIdStringsConstraint, validationOptions)(object, property);
  };
}
