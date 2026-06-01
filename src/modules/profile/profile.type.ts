import { Types } from "mongoose";

export type ProfileType = {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    nickname: string;
    avatar: string;
    isActive: boolean;
}