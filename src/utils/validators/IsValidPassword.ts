import {
  Validate,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidPassword', async: false })
export class IsValidPasswordContraint {
  validate(password: string): boolean {
    const re = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$',
    );
    return re.test(password);
  }

  defaultMessage(validationArguments?: any) {
    return `The ${validationArguments.property} must have at least one uppercase letter, one lowercase letter, one special character and one number`;
  }
}

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsValidPasswordContraint, validationOptions)(object, property);
  };
}
