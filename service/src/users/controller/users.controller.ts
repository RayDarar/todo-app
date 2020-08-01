import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  BadRequestException,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserCreateDto } from "../dto/user-create.dto";
import { UserCreatePipe } from "../pipes/user-create.pipe";

@Controller("/users")
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @Get("/")
  public index() {
    return this.service.getAllUsers();
  }

  @Get("/:user_id")
  public async getUserById(@Param("user_id") userId: string) {
    const user = await this.service.getUserById(userId);

    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  @Post("/")
  public async create(@Body(UserCreatePipe) userInfo: UserCreateDto) {
    const userId = await this.service.createUser(userInfo);

    if (!userId) throw new BadRequestException("User already exists");
    return userId;
  }
}
