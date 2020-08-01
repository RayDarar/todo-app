import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export enum TodoStatus {
  ACTIVE = "active",
  DONE = "done",
}

@Schema()
export class Todo extends Document {
  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: String,
  })
  status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
