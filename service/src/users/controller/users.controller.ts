import { Controller, Get, Inject } from "@nestjs/common";
import { UsersService } from "../services/users.service";

@Controller("/users")
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @Get("/")
  public index() {
    return this.service.getAllUsers();
  }
}
