import LocalStorage from "../LocalStorage";

const mockSetItem = jest.fn();
const mockGetItem = jest.fn().mockReturnValue("mock-data");
const mockRemoveItem = jest.fn();
const mockClear = jest.fn();

const spyWindow = jest.spyOn(global, "window", "get");

describe("Test services/adapters: LocalStorage", () => {
  beforeEach(() => {
    spyWindow.mockImplementation(
      () =>
        ({
          localStorage: {
            setItem: mockSetItem,
            getItem: mockGetItem,
            removeItem: mockRemoveItem,
            clear: mockClear,
          },
        }) as unknown as Window & typeof globalThis,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("storage: should return null if @window undefined", () => {
    spyWindow.mockImplementation(
      () => undefined as unknown as Window & typeof globalThis,
    );

    expect(new LocalStorage().storage).toBeNull();
  });

  const SET_CASES: [string | number | object, string][] = [
    ["mock-value", "mock-value"],
    [12345, "12345"],
    [{ value: "mock-value" }, '{"value":"mock-value"}'],
  ];
  it.each(SET_CASES)(
    "set: should set item to local storage correcly",
    (value, payload) => {
      new LocalStorage().set("mock-key", value);

      expect(mockSetItem).toHaveBeenCalledWith("mock-key", payload);
    },
  );

  it("get: should get item from local storage correcly", () => {
    expect(new LocalStorage().get("mock-key")).toBe("mock-data");
  });

  it("remove: should remove item from local storage correcly", () => {
    new LocalStorage().remove("mock-key");

    expect(mockRemoveItem).toHaveBeenCalledWith("mock-key");
  });

  it("clear: should clear local storage correcly", () => {
    new LocalStorage().clear();

    expect(mockClear).toHaveBeenCalled();
  });
});
