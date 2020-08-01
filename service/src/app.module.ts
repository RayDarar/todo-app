import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { configPattern, configValidation } from "./config";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configPattern],
      validationSchema: configValidation,
      envFilePath: [".env"],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        uri: configService.get<string>("db.uri"),
      }),
    }),
    HealthModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
