import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "./health/health.module";
import { configPattern, configValidation } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configPattern],
      validationSchema: configValidation,
      envFilePath: [".env"],
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
