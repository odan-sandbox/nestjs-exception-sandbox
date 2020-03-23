import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import supertest from "supertest";

import { AppModule } from "./app.module";
import { CustomExceptionFilter } from "./exception-filter";

describe("app", (): void => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new CustomExceptionFilter());
    /* eslint-disable @typescript-eslint/no-empty-function */
    app.useLogger({
      log: () => {},
      error: () => {},
      warn: () => {},
      debug: () => {},
      verbose: () => {}
    });
    /* eslint-enable @typescript-eslint/no-empty-function */
    await app.init();
  });

  describe("GET /custom", () => {
    let server: supertest.Test;
    let response: supertest.Response;
    beforeAll(async () => {
      server = supertest(app.getHttpServer()).get("/custom");
      response = await server;
    });

    it("should be return 200 status code", () => {
      expect(response.status).toBe(200);
    });

    it("should be return custom body", () => {
      expect(response.body.message).toBeDefined();
      expect(response.body.type).toBeDefined();
      expect(response.body.trace).toBeDefined();
      expect(response.body.statusCode).toBeDefined();
    });
  });

  describe("GET /type", () => {
    let server: supertest.Test;
    let response: supertest.Response;
    beforeAll(async () => {
      server = supertest(app.getHttpServer()).get("/type");
      response = await server;
    });

    it("should be return 500 status code", async () => {
      const response = await server;
      expect(response.status).toBe(500);
    });

    it("should be return body", () => {
      expect(response.body.message).toBeDefined();
      expect(response.body.statusCode).toBeDefined();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
