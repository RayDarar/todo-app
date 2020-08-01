import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

@Controller("/health")
export class HealthController {
  @Get("/")
  public index() {
    return "Hello, World!";
  }

  @Get("/increment/:number")
  public increment(@Param("number", ParseIntPipe) num: number) {
    return num + 1;
  }
}
