import { IsBoolean, Validate } from "class-validator";
import { IsRequiredTrueConstraint } from "src/customs/validators/isRequiredTrue.validator";


export class TermsAndConditions {
    @IsBoolean({message: 'termsAndConditions is not valid!'})
    @Validate(IsRequiredTrueConstraint, {message: 'termsAndConditions must be true!'})
    termsAndConditions: boolean;

    @IsBoolean({message: 'dataProcessing is not valid!'})
    @Validate(IsRequiredTrueConstraint, {message: 'termsAndConditions must be true!'})
    dataProcessing: boolean;

    @IsBoolean({message: 'emailSubscription is not valid!'})
    emailSubscription: boolean;
}