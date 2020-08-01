import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { configPattern, configValidation } from "./config";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configPattern],
      validationSchema: configValidation,
      envFilePath: [".env"],
    }),
    HealthModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
