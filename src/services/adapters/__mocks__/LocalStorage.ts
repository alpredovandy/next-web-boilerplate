export const mockIsReadyStorage = jest.fn(() => true);
export const mockGetStorage = jest.fn(() => "key-storage");
export const mockSetStorage = jest.fn();
export const mockRemoveStorage = jest.fn();

const MockStorage = jest.fn().mockImplementation(function (this: any) {
  this.isReady = mockIsReadyStorage;
  this.get = mockGetStorage;
  this.set = mockSetStorage;
  this.remove = mockRemoveStorage;

  return this;
});

export default MockStorage;
