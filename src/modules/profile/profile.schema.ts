import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user/user.schema";
import { UserRole } from "src/customs/userrole.enum";

@Schema({timestamps: true})
export class Profile extends Document {

    @Prop({required: true, unique: true, ref: User.name})
    userId: Types.ObjectId;

    @Prop({
        required: true,
        type: String,
        enum: UserRole,
        default: UserRole.Athlete,
    })
    userRole: UserRole;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    surname: string;

    @Prop({required: false})
    birthDate: string;

    @Prop({required: false})
    avatar: string;

    @Prop({required: true, default: true})
    isActive: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)