import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { TermsAndConditions } from "./dto/termsAndConditions.dto";

@Schema({timestamps: true})
export class User extends Document {

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: false})
    termsAndConditions: TermsAndConditions;

    @Prop({required: true, default: false})
    isEmailVerified: boolean;

    @Prop({required: true, default: true})
    isActive: boolean;

    @Prop({unique: true, ref: 'Profile'})
    profile: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);