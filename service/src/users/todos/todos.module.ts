import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TodosController } from "./controller/todos.controller";
import { TodosService } from "./services/todos.service";
import { Todo, TodoSchema } from "./schemas/todo.schema";
import { User, UserSchema } from "../schemas/users.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
