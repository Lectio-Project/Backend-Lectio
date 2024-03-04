import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotDigitAndSpecialChar', async: false })
export class IsIncludedInOptionsConstraint {
  validate(value: any | Array<any>, options: { constraints: Array<any> }) {
    const { constraints } = options;
    if (Array.isArray(value)) {
      if (value.every(item => constraints.includes(item))) {
        return true;
      }
    } else if (constraints.includes(value)) {
      return true;
    }
    return;
  }

  defaultMessage(validationArguments?: any) {
    return `The ${validationArguments.property} is not included in the options: ${validationArguments.constraints.join(
      ', ',
    )}`;
  }
}

export function IsIncludedInOptions(
  options: Array<any>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, property: string) {
    Validate(
      IsIncludedInOptionsConstraint,
      options,
      validationOptions,
    )(object, property);
  };
}
