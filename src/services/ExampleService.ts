/** TODO: Remove this file after use this example */
import { z } from "zod";

import type HttpClient from "@services/adapters/HttpClient";

import { exampleSchema, type ExampleType } from "@domains/Example";
import {
  baseResponseSchema,
  type BaseResponseType,
  type PaginateRequestType,
  paginateResponseSchema,
  type PaginateResponseType,
} from "@domains/Response";

export interface ExampleServiceType {
  getAll(
    params: PaginateRequestType,
  ): Promise<PaginateResponseType<ExampleType[]>>;

  getById(id: string): Promise<BaseResponseType<ExampleType>>;
}

class ExampleService implements ExampleServiceType {
  private _http: HttpClient;

  constructor(httpClient: HttpClient) {
    this._http = httpClient;
  }

  getAll: ExampleServiceType["getAll"] = ({
    page = 1,
    limit = 10,
    ...params
  }) => {
    return this._http.get("/v1/example", {
      params: { ...params, page, limit },
      responseSchema: paginateResponseSchema(z.array(exampleSchema)),
    });
  };

  getById: ExampleServiceType["getById"] = (id) => {
    return this._http.get("/v1/example/" + id, {
      responseSchema: baseResponseSchema(exampleSchema),
    });
  };
}

export default ExampleService;
