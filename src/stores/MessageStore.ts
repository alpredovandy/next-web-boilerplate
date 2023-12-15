import { devtools } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import type { MessageStoreType } from "@stores/types/MessageStoreType";

export const useMessageStore = createWithEqualityFn<MessageStoreType>()(
  devtools((set) => ({
    message: null,

    show: (message) =>
      set((state) => ({ ...state, message: { ...message, open: true } })),

    showSuccess: (message) =>
      set((state) => ({
        ...state,
        message: {
          ...message,
          severity: "success",
          color: "success",
          open: true,
        },
      })),

    showError: (message) =>
      set((state) => ({
        ...state,
        message: { ...message, severity: "error", color: "error", open: true },
      })),

    close: () =>
      set((state) => ({
        ...state,
        message: { ...state.message, open: false },
      })),
  })),
  Object.is,
);
