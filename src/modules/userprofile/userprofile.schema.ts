import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class UserProfile extends Document {

    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    surname: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile)
