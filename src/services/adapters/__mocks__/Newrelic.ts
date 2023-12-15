import type { LoggerType } from "../Newrelic";

export const mockSendError = jest.fn();
export const mockSendEvent = jest.fn();

const MockNewRelic = jest.fn().mockImplementation(function (this: LoggerType) {
  this.sendError = mockSendError;
  this.sendEvent = mockSendEvent;

  return this;
});

export default MockNewRelic;
