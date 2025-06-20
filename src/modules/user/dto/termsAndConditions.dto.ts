import { IsBoolean, Validate } from "class-validator";
import { IsRequiredTrueConstraint } from "src/customs/validators/isRequiredTrue.validator";


export class TermsAndConditionsDto {
    @IsBoolean({message: 'Terms And Conditions is not valid!'})
    @Validate(IsRequiredTrueConstraint, {message: 'Terms and Conditions must be true!'})
    termsAndConditions: boolean;

    @IsBoolean({message: 'Data Processing is not valid!'})
    @Validate(IsRequiredTrueConstraint, {message: 'Data Processing must be true!'})
    dataProcessing: boolean;

    @IsBoolean({message: 'Email Subscription is not valid!'})
    emailSubscription: boolean;
}