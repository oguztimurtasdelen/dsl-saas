import { IsBoolean, Validate } from "class-validator";
import { IsRequiredTrueConstraint } from "src/customs/validators/isRequiredTrue.validator";


export class TermsAndConditionsDto {
    @IsBoolean({message: 'termsAndConditions is not valid!'})
    @Validate(IsRequiredTrueConstraint, {message: 'termsAndConditions must be true!'})
    termsAndConditions: boolean;

    @IsBoolean({message: 'dataProcessing is not valid!'})
    @Validate(IsRequiredTrueConstraint, {message: 'dataProcessing must be true!'})
    dataProcessing: boolean;

    @IsBoolean({message: 'emailSubscription is not valid!'})
    emailSubscription: boolean;
}