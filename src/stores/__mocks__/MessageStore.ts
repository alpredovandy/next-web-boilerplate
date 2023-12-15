import type { MessageType } from "../types/MessageStoreType";

type MockMessageStateType = {
  message: MessageType | null;
  show: jest.Mock;
  showSuccess: jest.Mock;
  showError: jest.Mock;
  close: jest.Mock;
};

type MockUseMessageStoreType = {
  (): MockMessageStateType;
  getState(): MockMessageStateType;
};

export const mockMessage = jest.fn().mockReturnValue(null);
export const mockShow = jest.fn();
export const mockShowSuccess = jest.fn();
export const mockShowError = jest.fn();
export const mockClose = jest.fn();

const mockUseMessageStore = jest.fn(() => ({
  message: mockMessage(),
  show: mockShow,
  showSuccess: mockShowSuccess,
  showError: mockShowError,
  close: mockClose,
}));

(mockUseMessageStore as unknown as MockUseMessageStoreType).getState =
  mockUseMessageStore;

export { mockUseMessageStore as useMessageStore };
