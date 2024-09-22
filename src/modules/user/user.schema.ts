import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "src/customs/userrole.enum";
import { TermsAndConditions } from "./dto/termsAndConditions.dto";

@Schema({timestamps: true})
export class User extends Document {

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    termsAndConditions: TermsAndConditions;

    @Prop({required: true, default: false})
    isEmailVerified: boolean;

    @Prop({required: true, default: true})
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);