import { Module } from "@nestjs/common";

import { AuthController } from "./controllers/auth.controller";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./services/auth.service";

@Module({
  controllers: [AuthController],
  imports: [UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
