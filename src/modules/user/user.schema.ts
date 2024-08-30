import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "src/customs/userrole.enum";


@Schema()
export class User extends Document {
    /*@ObjectIdColumn()
    _id: string; */

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({
        type: String,
        enum: UserRole, 
        default: UserRole.Athlete
    })
    userRole: UserRole;

    @Prop({default: false})
    isEmailVerified: boolean;

    @Prop({default: true})
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);