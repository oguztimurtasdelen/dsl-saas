import { Types } from "mongoose";

export type UserProfileType = {
    userId: Types.ObjectId;
    name: string;
    surname: string;
}