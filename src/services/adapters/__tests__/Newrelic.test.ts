import Newrelic, { type NewrelicBrowser } from "../Newrelic";

describe("Test services/adapters: Newrelic Browser Environtment", () => {
  const mockNoticeError = jest.fn();
  const mockAddPageAction = jest.fn();
  let ogNewrelic: NewrelicBrowser;

  beforeEach(() => {
    /** Save original @newrelic window */
    ogNewrelic = window.newrelic;

    /** mock @newrelic */
    window.newrelic = {
      noticeError: mockNoticeError,
      addPageAction: mockAddPageAction,
    } as unknown as NewrelicBrowser;
  });

  afterEach(() => {
    /** Restore original @newrelic window */
    window.newrelic = ogNewrelic;
  });

  it("sendError: should send error log correctly", () => {
    new Newrelic().sendError(new Error("MockError"), {
      message: "mock-message",
    });

    expect(mockNoticeError).toHaveBeenCalledWith(Error("MockError"), {
      message: "mock-message",
    });
  });

  it("sendEvent: should send log event correctly", () => {
    new Newrelic().sendEvent("MockAddPageAction", {
      message: "mock-message",
    });

    expect(mockAddPageAction).toHaveBeenCalledWith("MockAddPageAction", {
      message: "mock-message",
    });
  });
});

describe("Test services/adapters: Newrelic Server Environtment", () => {
  const spyWindow = jest.spyOn(global, "window", "get");
  const mockNoticeError = jest.fn();
  const mockRecordCustomEvent = jest.fn();

  /** mock @newrelic module */
  jest.mock("newrelic", () => ({
    noticeError: mockNoticeError,
    recordCustomEvent: mockRecordCustomEvent,
  }));

  beforeEach(() => {
    /** Set @window to undefined to make a mock server environtment */
    spyWindow.mockImplementation(
      () => undefined as unknown as Window & typeof globalThis,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sendError: should send error log correctly", () => {
    new Newrelic().sendError(
      new Error("MockError"),
      { message: "mock-message" },
      true,
    );

    expect(mockNoticeError).toHaveBeenCalledWith(
      Error("MockError"),
      { message: "mock-message" },
      true,
    );
  });

  it("sendEvent: should send log event correctly", () => {
    new Newrelic().sendEvent("MockAddPageAction", {
      message: "mock-message",
    });

    expect(mockRecordCustomEvent).toHaveBeenCalledWith("MockAddPageAction", {
      message: "mock-message",
    });
  });
});
