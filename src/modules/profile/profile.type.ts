import { Types } from "mongoose";

export type ProfileType = {
    userId: Types.ObjectId;
    name: string;
    surname: string;
    userRole: string;
}