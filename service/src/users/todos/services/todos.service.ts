import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Todo, TodoStatus } from "../schemas/todo.schema";
import { User } from "src/users/schemas/users.schema";

@Injectable()
export class TodosService {
  @InjectModel(Todo.name)
  private readonly TodoModel: Model<Todo>;

  @InjectModel(User.name)
  private readonly UserModel: Model<User>;

  public async getAllTodos(): Promise<Todo[]> {
    return this.TodoModel.find().exec();
  }

  public async createTodo(
    userId: string,
    title: string,
  ): Promise<string | false> {
    const user = await this.UserModel.findOne({
      _id: userId,
    }).exec();

    if (!user) return false;

    const todo = await this.TodoModel.create({
      title,
      status: TodoStatus.ACTIVE,
    });
    user.todos.push(todo);
    
    await user.save();
    return todo._id;
  }
}
