import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user/user.schema";
import { UserRole } from "src/customs/userrole.enum";

@Schema()
export class Profile extends Document {

    @Prop({required: true, unique: true, ref: User.name})
    userId: Types.ObjectId;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    surname: string;

    @Prop({
        type: String,
        enum: UserRole, 
        default: UserRole.Athlete
    })
    userRole: UserRole;

    @Prop({required: true})
    isActive: Boolean;
    
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)