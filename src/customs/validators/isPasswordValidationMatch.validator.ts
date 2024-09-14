import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'isPasswordValidationMatch', async: false })
export class IsPasswordValidationMatchConstraint implements ValidatorConstraintInterface {
    validate(value: string, validationArguments: ValidationArguments): boolean {
        return value === validationArguments.object['password'];
    }
}