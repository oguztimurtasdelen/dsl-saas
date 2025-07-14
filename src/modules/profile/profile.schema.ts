import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, model } from "mongoose";


@Schema({timestamps: true})
export class Profile extends Document {

    @Prop({required: true, unique: true, ref: 'User'})
    user: Types.ObjectId;

    @Prop({required: false})
    avatar: string;

    @Prop({required: true, default: true})
    isActive: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)

export const ProfileModel = model<Profile>('Profile', ProfileSchema);