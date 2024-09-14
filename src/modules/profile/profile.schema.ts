import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user/user.schema";

@Schema({timestamps: true})
export class Profile extends Document {

    @Prop({required: true, unique: true, ref: User.name})
    userId: Types.ObjectId;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    surname: string;

    @Prop({required: false})
    birthDate: string;

    @Prop({required: false})
    profilePhoto: string;

    @Prop({required: true})
    isActive: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)