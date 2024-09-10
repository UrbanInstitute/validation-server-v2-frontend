import { useFeatureFlagContext } from "@/context/FeatureFlagContext";

export const useFeatureEnabled = (name: string) => {
  const { featureEnabled } = useFeatureFlagContext();
  const enabled = featureEnabled(name);

  return enabled;
};
