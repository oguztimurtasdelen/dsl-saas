import { Types } from "mongoose";

export type ProfileType = {
    user: Types.ObjectId;
    userRole: string;
    name: string;
    surname: string;
    birthDate: string;
    avatar: string;
    isActive: boolean;
}