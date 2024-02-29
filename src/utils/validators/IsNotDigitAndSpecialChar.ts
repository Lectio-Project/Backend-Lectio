import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotDigitAndSpecialChar', async: false })
export class IsNotDigitAndSpecialCharContraint {
  validate(text: string) {
    return /^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$/.test(text);
  }

  defaultMessage(validationArguments?: any) {
    return `The ${validationArguments.property} must not contain digits or special character`;
  }
}

export function IsNotDigitAndSpecialChar(
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsNotDigitAndSpecialCharContraint, validationOptions)(
      object,
      property,
    );
  };
}
