import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { TermsAndConditionsDto } from "./dto/termsAndConditions.dto";
import { UserRoleEnum } from "src/customs/utils/userrole.enum";
import { UserTypeEnum } from "src/customs/utils/usertype.enum";
import { ProfileModel } from "../profile/profile.schema";


@Schema({timestamps: true})
export class User extends Document {
    
    @Prop({unique: true, ref: 'Profile'})
    profile: Types.ObjectId;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true, enum: UserRoleEnum, default: UserRoleEnum.USER})
    userRole: string;

    @Prop({required: true, enum: UserTypeEnum, default: UserTypeEnum.ATHLETE})
    userType: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    surname: string;

    @Prop({required: true})
    birthDate: string;

    @Prop({required: false})
    phoneNumber: string;

    @Prop({required: false})
    termsAndConditions: TermsAndConditionsDto;

    @Prop({required: true, default: false})
    isEmailVerified: boolean;

    @Prop({required: true, default: true})
    isActive: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.pre('save', function(next) {
    if (this.isNew && !this.profile) {
        this.profile = new Types.ObjectId();
    }

    next();
});