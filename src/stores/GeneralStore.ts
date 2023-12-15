import { devtools } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import type { GeneralState } from "@stores/types/GeneralType";

import { FEATURE_FLAGS } from "@constants/featureFlags";

export const useGeneralStore = createWithEqualityFn<GeneralState>()(
  devtools((set) => ({
    loading: true,
    featureFlag: FEATURE_FLAGS,

    setInitializeGeneral: (initialize) => {
      const { featureFlag } = initialize;
      set((state) => ({
        featureFlag: { ...state.featureFlag, ...featureFlag },
        loading: false,
      }));
    },
    setFeatureFlag: (featureFlag) => {
      set((state) => ({
        featureFlag: { ...state.featureFlag, ...featureFlag },
      }));
    },
  })),
  Object.is,
);
