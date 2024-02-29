import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsCompletelyName', async: false })
export class IsCompletelyNameContraint {
  validate(name: string) {
    if (typeof name !== 'string') {
      return false;
    }
    const splitName = name.split(' ');
    if (splitName.length < 2 || splitName.some(value => value.length < 3)) {
      return false;
    }
    return true;
  }

  defaultMessage(validationArguments?: any) {
    return `The ${validationArguments.property} must be a complete name, not use abreviation`;
  }
}

export function IsCompletelyName(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsCompletelyNameContraint, validationOptions)(object, property);
  };
}
