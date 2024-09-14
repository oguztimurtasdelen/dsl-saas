import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';


@ValidatorConstraint({ name: 'isRequiredTrue', async: false })
export class IsRequiredTrueConstraint implements ValidatorConstraintInterface {
  validate(value: boolean, validationArguments: ValidationArguments): boolean {
    return value === true;
  }
}
