module.exports = (_type, name) => ({
  type: "configs",
  content: `import { z } from "zod";

export const ${name}ResponseSchema = z.object({
  foo: z.string(),
});
`,
  extension: `${name}.ts`,
});
