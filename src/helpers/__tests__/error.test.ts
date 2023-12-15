import { APIRequestError, ClientError, ServerError } from "@helpers/error";

describe("Test helpers: errors", () => {
  it("ApiRequestError should throw error correctly", () => {
    function fn() {
      throw new APIRequestError();
    }

    expect(fn).toThrow("APIRequestError");
  });

  it("ServerError should throw error correctly", () => {
    function fn() {
      throw new ServerError();
    }

    expect(fn).toThrow("ServerError");
  });

  it("ClientError should throw error correctly", () => {
    function fn() {
      throw new ClientError();
    }

    expect(fn).toThrow("ClientError");
  });
});
