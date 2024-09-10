import { useFeatureFlagContext } from "@/context/FeatureFlagContext";
import { PropsWithChildren } from "react";

interface FeatureProps extends PropsWithChildren {
  name: string;
}
export const Feature = ({ name, children }: FeatureProps) => {
  const { featureEnabled } = useFeatureFlagContext();
  const enabled = featureEnabled(name);

  if (!enabled) return null;

  return <div>{children}</div>;
};
