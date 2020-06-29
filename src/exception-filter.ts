import { ExceptionFilter, ArgumentsHost, Catch } from "@nestjs/common";
import { Response } from "express";

import { UnexpectedError } from "./error";

// @Catch で指定したクラスは instanceof で比較される
// https://github.com/nestjs/nest/blob/23f477c73f3de2681498def0f041c3a42b7374b6/packages/core/exceptions/exceptions-handler.ts#L35
@Catch(UnexpectedError)
export class CustomExceptionFilter implements ExceptionFilter<UnexpectedError> {
  catch(exception: UnexpectedError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(500).json({
      message: exception.message,
      error: exception.name,
      // 開発時のみ
      trace: exception.stack,
      statusCode: 500
    });
  }
}
