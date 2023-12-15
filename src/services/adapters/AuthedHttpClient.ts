import type { CreateAxiosDefaults } from "axios";

import type { AuthServiceType } from "@services/AuthService";

import { ACCESS_TOKEN } from "@constants/storageKey";

import HttpClient from "./HttpClient";
import type { StorageType } from "./LocalStorage";
import type { LoggerType } from "./Newrelic";

class AuthedHttpClient extends HttpClient {
  private _storage: StorageType;
  private _authService: AuthServiceType;

  constructor(
    logger: LoggerType,
    storage: StorageType,
    authService: AuthServiceType,
    options?: CreateAxiosDefaults,
  ) {
    super(logger, options);

    this._storage = storage;
    this._authService = authService;
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.client.interceptors.request.use(
      async (config) => {
        const token = this._storage.get(ACCESS_TOKEN);

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  protected _initializeResponseInterceptor() {
    this.client.interceptors.response.use(
      (response) => response?.data,
      async (error) => {
        const originalRequest = error.config;

        /**
         * If the error status is 401 and there is no originalRequest._retry flag,
         * it means the token has expired and we need to refresh it
         */
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const { error, data } = await this._authService.refreshToken();

          if (!error && data) {
            /** Assign new headers */
            originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
            /** retry request */

            return this.client(originalRequest);
          }
        } else if (error.response.status >= 400) {
          this.logError(error);
        }

        return Promise.reject(error);
      },
    );
  }
}

export default AuthedHttpClient;
