import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type CreateAxiosDefaults,
} from "axios";
import type { ZodError, ZodSchema } from "zod";

import { API_URL } from "@constants/configs";

import { APIRequestError } from "@helpers/error";

import { type LoggerType } from "./Newrelic";

interface RequestConfig extends AxiosRequestConfig {
  responseSchema?: ZodSchema;
  throwError?: boolean;
}

/**
 * HttpClient for communication with API
 * @constructor {AxiosInstance} options . Http options
 */
class HttpClient {
  private _baseUrl: string;
  private _logger: LoggerType;
  protected client: AxiosInstance;

  constructor(logger: LoggerType, options?: CreateAxiosDefaults) {
    this.client = axios.create(options);
    this._baseUrl = options?.baseURL ?? API_URL ?? "";
    this._logger = logger;

    this._initializeResponseInterceptor();
  }

  protected logError(error: AxiosError) {
    const apiRequestError = new APIRequestError(error);

    this._logger.sendError(apiRequestError, {
      url: error.response?.config.url ?? "",
      params: error.response?.config.params,
      method: error.response?.config.method ?? "",
      http_status_code: error.response?.status ?? "",
    });
  }

  protected _initializeResponseInterceptor() {
    this.client.interceptors.response.use(
      (response) => response?.data,
      (error) => {
        if (error.response.status >= 400) {
          this.logError(error);
        }

        return Promise.reject(error);
      },
    );
  }
  private createUrl(baseUrl: string, path: string): string {
    return baseUrl + path;
  }

  private parseResponse<T>(response: T, schema: ZodSchema): T {
    if (process.env.NODE_ENV !== "production") return schema.parse(response);

    const parsed = schema.safeParse(response);

    if (!parsed.success) {
      const errorData = (parsed as { error: ZodError }).error;

      this._logger.sendEvent("DataTypeNotMatch", {
        data: JSON.stringify(errorData),
      });
    }

    return response;
  }

  async get<T>(path: string, config?: RequestConfig): Promise<T> {
    const url = this.createUrl(this._baseUrl, path);
    const response: T = await this.client.get(url, config);

    if (config?.responseSchema)
      return this.parseResponse(response, config.responseSchema);

    return response;
  }

  post<T>(path: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const url = this.createUrl(this._baseUrl, path);
    return this.client.post(url, data, config);
  }

  put<T>(path: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const url = this.createUrl(this._baseUrl, path);
    return this.client.put(url, data, config);
  }

  patch<T>(path: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const url = this.createUrl(this._baseUrl, path);
    return this.client.patch(url, data, config);
  }

  delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const url = this.createUrl(this._baseUrl, path);
    return this.client.delete(url, config);
  }
}

export default HttpClient;
