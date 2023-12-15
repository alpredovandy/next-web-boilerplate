/** TODO: Remove this file after use this example */
import { MOCK_EXAMPLE_RESPONSE_SUCCESS } from "@domains/__mocks__/Example";
import { exampleSchema } from "@domains/Example";

describe("Test domains: Example", () => {
  it("exampleSchema: should return response correctly", () => {
    expect(exampleSchema.parse(MOCK_EXAMPLE_RESPONSE_SUCCESS));
  });
});
