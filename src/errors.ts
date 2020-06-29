import { BadRequestException } from "@nestjs/common";

export class UserNotFound extends BadRequestException {
  constructor() {
    super("ユーザーが見つかりません", new.target.name);
  }
}

export class TodoNotFound extends BadRequestException {
  constructor() {
    super("TODOが見つかりません", new.target.name);
  }
}
