import * as createCache from "@emotion/cache";

import { createEmotionCache } from "@helpers/cache";

const spyEmotionCache = jest.spyOn(createCache, "default");

describe("Test helpers: cache", () => {
  it("createEmotionCache should generate cache correctly", () => {
    createEmotionCache();

    expect(spyEmotionCache).toHaveBeenCalledWith({
      insertionPoint: undefined,
      key: "mui-style",
    });
  });
});
