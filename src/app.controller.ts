import { Controller, Get } from "@nestjs/common";
import { CustomError } from "./error";

@Controller()
export class AppController {
  @Get()
  home(): string {
    return "hello";
  }
  @Get("/custom")
  custom(): string {
    throw new CustomError("test error");
    return "hello";
  }
  @Get("/type")
  type(): string {
    throw new TypeError("test type error");
    return "hello";
  }
}
