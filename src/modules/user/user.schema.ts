import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "src/customs/userrole.enum";
import { TermsAndConditions } from "./dto/termsAndConditions.dto";

@Schema({timestamps: true})
export class User extends Document {

    @Prop({
        type: String,
        enum: UserRole,
        default: UserRole.Athlete,
    })
    userRole: UserRole;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: false})
    phoneNumber: string;

    @Prop({default: true})
    isEmailVerified: boolean;

    @Prop({required: true})
    isPhoneNumberVerified: boolean;

    @Prop({required: true})
    termsAndConditions: TermsAndConditions;

    @Prop({default: true})
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);