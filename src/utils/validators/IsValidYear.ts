import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidYear', async: false })
export class IsValidYearContraint {
  validate(value: string) {
    if (value.length !== 4) {
      return false;
    }
    const dateCurrent = new Date().getFullYear();
    if (+value > dateCurrent) {
      return false;
    }
    return true;
  }

  defaultMessage(validationArguments?: any) {
    return `The ${validationArguments.property} must be a format YYYY and not greater than ${new Date().getFullYear()}`;
  }
}

export function IsValidYear(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsValidYearContraint, validationOptions)(object, property);
  };
}
