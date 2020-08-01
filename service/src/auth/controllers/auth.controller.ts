import {
  Controller,
  Post,
  Body,
  Inject,
  BadRequestException,
  NotFoundException,
  HttpCode,
} from "@nestjs/common";

import { UserCreateDto } from "src/users/dto/user-create.dto";
import { UsersService } from "src/users/services/users.service";
import { UserCreatePipe } from "src/users/pipes/user-create.pipe";
import { AuthService } from "../services/auth.service";

@Controller("/auth")
export class AuthController {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  @Inject(AuthService)
  private readonly service: AuthService;

  @HttpCode(200)
  @Post("/authenticate")
  public async authenticate(@Body(UserCreatePipe) userInfo: UserCreateDto) {
    const result = await this.usersService.validateUser(userInfo);
    if (result == "invalid")
      throw new BadRequestException("Password is not correct");
    if (result == "not-found") throw new NotFoundException("User not found");

    return this.service.generateTokenPair(userInfo.username);
  }

  @HttpCode(200)
  @Post("/refresh-token")
  public async refreshToken(@Body("refreshToken") refreshToken: string) {
    const result = await this.service.validateRefreshToken(refreshToken);
    if (!result) throw new BadRequestException("Refresh token is not valid");

    return this.service.generateTokenPair(result);
  }

  @HttpCode(200)
  @Post("/logout")
  public async logout(@Body("refreshToken") refreshToken: string) {
    await this.service.logout(refreshToken);
  }
}
