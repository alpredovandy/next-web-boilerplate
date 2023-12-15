module.exports = (_type, name) => ({
  type: "store",
  content: `import { devtools } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import type { ${name}Type } from "@stores/types/${name}Type";

export const use${name}Store = createWithEqualityFn<${name}Type>()(
  devtools((set) => ({
    foo: "hello",
    bar: true,
    setValue: () => set(() => ({ foo: "world", bar: false })),
  })),
  Object.is,
);
`,
  extension: `${name}Store.ts`,
});
