export function add(x: number, y: number): number {
  return x + y;
}

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { CustomExceptionFilter } from "./exception-filter";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(3000);
}
bootstrap();
