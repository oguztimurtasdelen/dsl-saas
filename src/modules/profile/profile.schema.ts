import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, model } from "mongoose";


@Schema({timestamps: true, toJSON: { virtuals: true, versionKey: false }, 'id': false})
export class Profile extends Document {

    _id: Types.ObjectId;

    @Prop({type: Types.ObjectId, required: true, unique: true, ref: 'User', immutable: true})
    user: Types.ObjectId;

    @Prop({
        type: String,
        required: true, 
        unique: true, 
        index: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
        match: /^(?=.{3,20}$)[a-zA-Z0-9._-]+$/
    })
    nickname: string;

    @Prop({type: String, required: false})
    avatar: string;

    @Prop({type: Boolean, required: true, default: true})
    isActive: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)

export const ProfileModel = model<Profile>('Profile', ProfileSchema);
ProfileSchema.index({nickname: 1}, {unique: true});