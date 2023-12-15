import { devtools } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import type { ModalState, ModalStore } from "./types/ModalStoreTypes";

const initialState: ModalState = { isShow: false, type: undefined, data: null };

export const useModalStore = createWithEqualityFn<ModalStore>()(
  devtools((set) => ({
    ...initialState,

    show: (value) =>
      set((state) => ({
        ...state,
        isShow: true,
        ...value,
      })),

    close: () => set((state) => ({ ...state, ...initialState })),
  })),
  Object.is,
);
