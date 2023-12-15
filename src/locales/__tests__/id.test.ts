import commonId from "../id";

describe("Test locales: id", () => {
  it("Snapshot", () => {
    expect(commonId).toMatchSnapshot();
  });
});
