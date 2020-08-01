import { Document, SchemaTypes } from "mongoose";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Todo } from "../todos/schemas/todo.schema";

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop([
    {
      type: SchemaTypes.ObjectId,
      ref: Todo.name,
    },
  ])
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
