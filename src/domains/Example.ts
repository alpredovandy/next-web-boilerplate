/** TODO: Remove this file after use this example */
import { z } from "zod";

export const exampleSchema = z.object({
  id: z.string(),
  foo: z.string(),
});
export type ExampleType = z.infer<typeof exampleSchema>;
