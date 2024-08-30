import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user/user.schema";
import { UserprofileModule } from "./userprofile.module";

@Schema()
export class UserProfile extends Document {

    @Prop({required: true, unique: true, ref: User.name})
    userId: Types.ObjectId;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    surname: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile)