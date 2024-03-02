import {
  Validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isArrayOrString', async: false })
export class IsArrayOfStringsOrStringConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string | Array<string>) {
    if (typeof value === 'string') {
      return true;
    }
    if (Array.isArray(value)) {
      if (
        value.every(
          item =>
            item.length === 24 && value.every(item => typeof item === 'string'),
        )
      ) {
        return true;
      }
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a string or an array of strings`;
  }
}

export function IsArrayOfStringsOrString(
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsArrayOfStringsOrStringConstraint, validationOptions)(
      object,
      property,
    );
  };
}
