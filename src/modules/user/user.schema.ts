import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({default: false})
    isEmailVerified: boolean;

    @Prop({default: true})
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);