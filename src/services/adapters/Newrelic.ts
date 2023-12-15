export type NewrelicServer = typeof import("newrelic");
export type NewrelicBrowser = typeof window.newrelic;

export interface LoggerType {
  sendError(
    error: Error,
    customAttributes?: { [key: string]: string | number },
    expected?: boolean,
  ): void;

  sendEvent(
    eventType: string,
    attributes: { [keys: string]: number | string },
  ): void;
}

class Newrelic implements LoggerType {
  get logger():
    | { type: "server"; logger: NewrelicServer }
    | { type: "browser"; logger: NewrelicBrowser } {
    /**
     * Server environment with newrelic module
     * */
    if (typeof window === "undefined") {
      return { type: "server", logger: require("newrelic") };
    }

    /**
     * Browser environment with window newrelic
     * */
    return { type: "browser", logger: window?.newrelic };
  }

  public sendError: LoggerType["sendError"] = (
    error,
    customAttributes,
    expected,
  ) => {
    const { type, logger } = this.logger;

    if (type === "server")
      return logger?.noticeError(error, customAttributes, expected);

    return logger?.noticeError(error, customAttributes);
  };

  public sendEvent: LoggerType["sendEvent"] = (eventType, attributes) => {
    const { type, logger } = this.logger;

    if (type === "server")
      return logger?.recordCustomEvent(eventType, attributes);

    return logger?.addPageAction(eventType, attributes);
  };
}

export default Newrelic;
