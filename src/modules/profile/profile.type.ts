import { Types } from "mongoose";

export type ProfileType = {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    avatar: string;
    isActive: boolean;
}