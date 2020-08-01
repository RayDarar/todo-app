import { Document } from "mongoose";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { string } from "@hapi/joi";

export class User extends Document {
  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: string,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
