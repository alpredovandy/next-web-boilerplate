module.exports = (_type, name) => ({
  type: "types",
  content: `import type React from "react";

export interface ${name}Props {
  children?: React.ReactNode;
}
`,
  extension: `types.ts`,
});
