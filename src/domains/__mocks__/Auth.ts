import type { AuthSchemaType } from "@domains/Auth";

export const MOCK_AUTH_RESPONSE_SUCCESS: AuthSchemaType = {
  lifetime: 1000,
  refresh_token: "mock-refresh-token",
  token: "mock-token",
};
