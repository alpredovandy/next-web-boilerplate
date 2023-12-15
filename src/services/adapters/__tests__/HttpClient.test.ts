import axios from "axios";

import MockNewRelic from "../__mocks__/Newrelic";
import HttpClient from "../HttpClient";

jest.mock("axios");

const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockPatch = jest.fn();
const mockDelete = jest.fn();
(axios as { create: () => void }).create = jest.fn(() => ({
  interceptors: { response: { use: jest.fn() } },
  get: mockGet,
  post: mockPost,
  put: mockPut,
  patch: mockPatch,
  delete: mockDelete,
}));

type TestCases = [
  "get" | "post" | "put" | "patch" | "delete",
  string,
  jest.Mock,
];

describe("Test services/adapters: HTTPClient", () => {
  const httpClient = () =>
    new HttpClient(new MockNewRelic(), {
      baseURL: "mock-base-url/",
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("constructor: should initialize client", () => {
    httpClient();

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "mock-base-url/",
    });
  });

  const DELETE_CASES: TestCases[] = [
    ["get", "GET", mockGet],
    ["delete", "DELETE", mockDelete],
  ];
  it.each(DELETE_CASES)(
    "%s: should call api with method %s",
    (fn, _, mockFn) => {
      httpClient()[fn]("mock-path", {
        params: { id: "mock-id" },
      });

      expect(mockFn).toHaveBeenCalledWith("mock-base-url/mock-path", {
        params: { id: "mock-id" },
      });
    },
  );

  const POST_PUT_PATCH_CASES: TestCases[] = [
    ["post", "POST", mockPost],
    ["put", "PUT", mockPut],
    ["patch", "PATCH", mockPatch],
  ];
  it.each(POST_PUT_PATCH_CASES)(
    "%s: should call api with method %s",
    (fn, _, mockFn) => {
      httpClient()[fn](
        "mock-path",
        { data: "mock-data" },
        { params: { id: "mock-id" } },
      );

      expect(mockFn).toHaveBeenCalledWith(
        "mock-base-url/mock-path",
        { data: "mock-data" },
        { params: { id: "mock-id" } },
      );
    },
  );
});
