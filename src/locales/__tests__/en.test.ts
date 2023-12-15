import commonEn from "../en";

describe("Test locales: en", () => {
  it("Snapshot", () => {
    expect(commonEn).toMatchSnapshot();
  });
});
