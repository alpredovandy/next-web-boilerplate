import type { FEATURE_FLAGS } from "@constants/featureFlags";

export type GeneralState = {
  loading: boolean;
  featureFlag: GeneralFeatureFlagState;
  setInitializeGeneral: (state: GeneralInitializeState) => void;
  setFeatureFlag: (state: GeneralFeatureFlagState) => void;
};

export type GeneralInitializeState = {
  featureFlag: GeneralFeatureFlagState;
};

export type GeneralFeatureFlagState = Record<
  keyof typeof FEATURE_FLAGS,
  boolean
>;
