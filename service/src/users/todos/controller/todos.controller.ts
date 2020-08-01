import {
  Controller,
  Get,
  Inject,
  Post,
  Param,
  Body,
  NotFoundException,
  Put,
  Delete,
} from "@nestjs/common";

import { TodosService } from "../services/todos.service";

@Controller("/users/:user_id/todos")
export class TodosController {
  @Inject(TodosService)
  private readonly service: TodosService;

  @Get("/")
  public getAll() {
    return this.service.getAllTodos();
  }

  @Post("/")
  public async createTodo(
    @Param("user_id") userId: string,
    @Body("title") title: string,
  ) {
    const result = await this.service.createTodo(userId, title);
    if (!result) throw new NotFoundException("User not found");

    return result;
  }

  @Put("/:todo_id")
  public async updateTodo(
    @Param("user_id") userId: string,
    @Param("todo_id") todoId: string,
    @Body("title") title: string,
    @Body("status") status: boolean,
  ) {
    const result = await this.service.updateTodo(userId, todoId, title, status);
    if (result == "user-not-found")
      throw new NotFoundException("User not found");
    if (result == "todo-not-found")
      throw new NotFoundException("Todo not found");
  }

  @Delete("/:todo_id")
  public async deleteTodo(
    @Param("user_id") userId: string,
    @Param("todo_id") todoId: string,
  ) {
    const result = await this.service.deleteTodo(userId, todoId);
    if (result == "user-not-found")
      throw new NotFoundException("User not found");
    if (result == "todo-not-found")
      throw new NotFoundException("Todo not found");
  }
}
