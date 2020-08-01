import {
  Controller,
  Get,
  Inject,
  Post,
  Param,
  Body,
  NotFoundException,
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
}
