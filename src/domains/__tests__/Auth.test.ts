import { MOCK_AUTH_RESPONSE_SUCCESS } from "@domains/__mocks__/Auth";
import { authSchema } from "@domains/Auth";

describe("Test domains: Auth", () => {
  it("authSchema: should return response correctly", () => {
    expect(authSchema.parse(MOCK_AUTH_RESPONSE_SUCCESS));
  });
});
