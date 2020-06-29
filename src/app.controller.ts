import { Controller, Get } from "@nestjs/common";
import { CustomError, UnexpectedError } from "./error";
import { UserNotFound, TodoNotFound } from "./errors";

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

  @Get("unexpected-error")
  unexpectedError(): string {
    throw new UnexpectedError("予期せぬエラー");
  }

  @Get("user")
  user(): string {
    throw new UserNotFound();
  }
  @Get("todo")
  todo(): string {
    throw new TodoNotFound();
  }
}
