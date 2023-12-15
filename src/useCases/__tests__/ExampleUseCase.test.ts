/** TODO: Remove this file after use this example */
import type * as MockAuthedHttpClient from "@services/adapters/__mocks__/AuthedHttpClient";
import * as AuthedHttpClient from "@services/adapters/AuthedHttpClient";

import {
  MOCK_EXAMPLE_PAGINATE_RESPONSE_SUCCESS,
  MOCK_EXAMPLE_RESPONSE_SUCCESS,
} from "@domains/__mocks__/Example";

import { exampleUseCase } from "..";

jest.mock("@services/adapters/AuthedHttpClient");
const { mockGet } = AuthedHttpClient as unknown as typeof MockAuthedHttpClient;

describe("Test useCases: Example", () => {
  it("getAll: should return success response", async () => {
    mockGet.mockImplementation(() =>
      Promise.resolve(MOCK_EXAMPLE_PAGINATE_RESPONSE_SUCCESS),
    );

    expect(await exampleUseCase.getAll()).toStrictEqual(
      MOCK_EXAMPLE_PAGINATE_RESPONSE_SUCCESS,
    );
  });

  it("getById: should return success response", async () => {
    mockGet.mockImplementation(() =>
      Promise.resolve({ data: MOCK_EXAMPLE_RESPONSE_SUCCESS }),
    );

    expect(await exampleUseCase.getById("1")).toStrictEqual(
      MOCK_EXAMPLE_RESPONSE_SUCCESS,
    );
  });
});
