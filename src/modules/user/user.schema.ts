import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{
    @Prop()
    _id : string;
    //unique is closed on purpose testing.
    @Prop({uppercase:true, /*unique: true,*/ required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    userRole: string;

    isEmailVerified: boolean;

    @Prop()
    isActive: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);



 
  
  
  
