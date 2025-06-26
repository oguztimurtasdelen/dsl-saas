import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user/user.schema";

@Schema({timestamps: true})
export class Profile extends Document {
    @Prop({required: true})
    _id: Types.ObjectId;

    @Prop({required: true, unique: true, ref: User.name})
    user: Types.ObjectId;

    @Prop({required: false})
    avatar: string;

    @Prop({required: true, default: true})
    isActive: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)