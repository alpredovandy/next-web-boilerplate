import { z } from "zod";

import {
  MOCK_META,
  MOCK_PAGINATE_RESPONSE_SUCCESS,
  MOCK_PAGINATION_REQUEST,
  MOCK_RESPONSE_SUCCESS,
} from "@domains/__mocks__/Response";

import {
  baseResponseSchema,
  metaSchema,
  paginateRequestMapper,
  paginateResponseSchema,
} from "../Response";

describe("Test domains: Response", () => {
  it("baseResponseSchema: should return response correctly", () => {
    expect(
      baseResponseSchema(z.object({ result: z.boolean() })).parse(
        MOCK_RESPONSE_SUCCESS,
      ),
    );
  });

  it("metaSchema: should return response correctly", () => {
    expect(metaSchema.parse(MOCK_META));
  });

  it("paginateResponseSchema: should return response correctly", () => {
    expect(
      paginateResponseSchema(z.object({ result: z.boolean() })).parse(
        MOCK_PAGINATE_RESPONSE_SUCCESS,
      ),
    );
  });

  const PAGINATE_REQUEST_MAPPER_TEST: [string, object, object][] = [
    [
      "transform correctly",
      MOCK_PAGINATION_REQUEST,
      {
        page: "1",
        limit: "1",
        search: "mock-search",
        sort: "-updated_at",
      },
    ],
    [
      "return default page and limit correctly",
      {},
      {
        page: "1",
        limit: "10",
      },
    ],
  ];
  it.each(PAGINATE_REQUEST_MAPPER_TEST)(
    "paginateRequestMapper: should %s",
    (_, params, result) => {
      expect(paginateRequestMapper(params)).toMatchObject(result);
    },
  );
});
