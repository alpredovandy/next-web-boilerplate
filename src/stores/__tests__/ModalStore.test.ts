import { act, renderHook } from "@testing-library/react";

import { useModalStore } from "../ModalStore";

describe("Test stores: ModalStore", () => {
  it("show & closeMessage: should be return modal correctly", () => {
    const { result } = renderHook(() => useModalStore());

    act(() => {
      result.current.show({ type: "mock-type", data: "mock-data" });
    });

    expect(result.current.isShow).toBeTruthy();
    expect(result.current.type).toBe("mock-type");
    expect(result.current.data).toBe("mock-data");

    act(() => {
      result.current.close();
    });

    expect(result.current.isShow).toBeFalsy();
    expect(result.current.type).toBeUndefined();
    expect(result.current.data).toBeNull();
  });
});
