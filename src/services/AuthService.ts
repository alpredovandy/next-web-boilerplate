import type { AuthSchemaType } from "@domains/Auth";

import { REFRESH_TOKEN } from "@constants/storageKey";

import type HttpClient from "./adapters/HttpClient";
import type { StorageType } from "./adapters/LocalStorage";

export interface AuthServiceType {
  refreshToken(): Promise<{ error: boolean; data: null | AuthSchemaType }>;
}

class AuthService implements AuthServiceType {
  private _http: HttpClient;
  private _storage: StorageType;

  constructor(httpClient: HttpClient, storage: StorageType) {
    this._http = httpClient;
    this._storage = storage;
  }

  private _saveAuthData(data: AuthSchemaType) {
    /** TODO: Handling how to save auth Data */
    console.warn(data);
  }

  refreshToken: AuthServiceType["refreshToken"] = async () => {
    try {
      const refreshToken = this._storage.get(REFRESH_TOKEN);

      if (!refreshToken) throw new Error("Refresh token not found!");

      const response: AuthSchemaType = await this._http.post(
        "/v1/auth/refresh",
        { refresh_token: refreshToken },
      );

      this._saveAuthData(response);

      return { error: false, data: response };
    } catch (error) {
      this._storage.clear();
      window.location.replace("/login");
      return { error: true, data: null };
    }
  };
}

export default AuthService;
