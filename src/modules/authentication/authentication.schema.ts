import { SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class Authentication extends Document{

}

export const AuthenticationSchema = SchemaFactory.createForClass(Authentication)