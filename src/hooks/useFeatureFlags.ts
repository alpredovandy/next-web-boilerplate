import { useQuery, useQueryClient } from "@tanstack/react-query";

import { featureFlagService } from "@services";

import { FEATURE_FLAGS } from "@constants/featureFlags";

export const useFeatureFlagsQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["featureFlagService.getAll"],
    queryFn: async () => await featureFlagService.getAll(),
    staleTime: 5 * (60 * 1000),
  });

  return { data: data ?? FEATURE_FLAGS, ...rest };
};

export const useFeatureFlagData = () => {
  const queryClient = useQueryClient();

  return (
    queryClient.getQueryData<Record<keyof typeof FEATURE_FLAGS, boolean>>([
      "featureFlagService.getAll",
    ]) ?? FEATURE_FLAGS
  );
};
