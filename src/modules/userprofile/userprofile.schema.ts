import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export class UserProfile{
    @Prop()
    _id: string;

    @Prop({required: true})
    _userId: string;
    
    @Prop({required: true})
    name: string;
    
    @Prop({required: true})
    surname: string;
    
    @Prop()
    birthdate: Date;
    
    @Prop()
    phoneNumber: string;

    @Prop()
    isPhoneNumberVerified: Boolean;

    @Prop()
    profilePhoto: string;
}

export const userProfileSchema = SchemaFactory.createForClass(UserProfile);




 
  
  
  
