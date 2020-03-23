import { ExceptionFilter, ArgumentsHost, Catch } from "@nestjs/common";
import { Response } from "express";

import { BaseError } from "./error";

@Catch(BaseError)
export class CustomExceptionFilter implements ExceptionFilter<BaseError> {
  catch(exception: BaseError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(200).json({
      message: exception.message,
      type: exception.name,
      // 開発時のみ
      trace: exception.stack
    });
  }
}
