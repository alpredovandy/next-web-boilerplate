import { z } from "zod";

export const authSchema = z.object({
  lifetime: z.number(),
  token: z.string(),
  refresh_token: z.string(),
});
export type AuthSchemaType = z.infer<typeof authSchema>;
