import { act, renderHook } from "@testing-library/react";

import { useMessageStore } from "../MessageStore";

describe("Test stores: MessageStore", () => {
  it("show & close: should be return message correctly", () => {
    const { result } = renderHook(() => useMessageStore());

    act(() => {
      result.current.show({ message: "test" });
    });

    expect(result.current.message).toStrictEqual({
      message: "test",
      open: true,
    });

    act(() => {
      result.current.close();
    });

    expect(result.current.message).toStrictEqual({
      message: "test",
      open: false,
    });
  });

  it("showSuccess: should be return message correctly", () => {
    const { result } = renderHook(() => useMessageStore());

    act(() => {
      result.current.showSuccess({ message: "test" });
    });

    expect(result.current.message).toStrictEqual({
      message: "test",
      severity: "success",
      color: "success",
      open: true,
    });
  });

  it("showError: should be return message correctly", () => {
    const { result } = renderHook(() => useMessageStore());

    act(() => {
      result.current.showError({ message: "test" });
    });

    expect(result.current.message).toStrictEqual({
      message: "test",
      severity: "error",
      color: "error",
      open: true,
    });
  });
});
