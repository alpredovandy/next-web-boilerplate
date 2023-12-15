import {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

export class APIRequestError<T> extends AxiosError<T> {
  constructor(error?: {
    message?: string;
    code?: string;
    config?: InternalAxiosRequestConfig<T>;
    request?: T;
    response?: AxiosResponse<T>;
  }) {
    super(
      "APIRequestError",
      error?.code,
      error?.config,
      error?.request,
      error?.response,
    );
  }

  getMessage(defaultErrorMessage = "Oops, something went wrong!") {
    let errorMessage = "";

    const errorRes = this.response?.data as {
      error_data: Record<string, unknown>;
      error_message: string;
    };

    switch (true) {
      case !!errorRes?.error_data:
        errorMessage = Object.values(errorRes.error_data)?.[0] as string;
        break;

      case !!errorRes?.error_message:
        errorMessage = errorRes.error_message;
        break;

      default:
        errorMessage = defaultErrorMessage;
        break;
    }

    return errorMessage;
  }
}

export class ServerError extends Error {
  constructor(options?: ErrorOptions) {
    super("ServerError", options);
  }
}

export class ClientError extends Error {
  constructor(options?: ErrorOptions) {
    super("ClientError", options);
  }
}
