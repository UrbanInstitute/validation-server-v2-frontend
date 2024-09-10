import { PropsWithChildren, createContext, useContext } from "react";

type FeatureFlag = {
  name: string;
  enabled: boolean;
};

type FeatureFlagContextType = {
  features: Array<FeatureFlag>;
  featureEnabled: (name: string) => boolean;
};

const featuresGenerator = () => {
  const features = Object.keys(import.meta.env).filter((key) =>
    key.includes("VITE_FEATURE_")
  );
  return features.map((key) => ({
    name: key.replace("VITE_FEATURE_", "").toLowerCase(),
    enabled: import.meta.env[key] === "true",
  })) as Array<FeatureFlag>;
};

const FeatureFlagContextInitialValues: FeatureFlagContextType = {
  features: featuresGenerator(),
  featureEnabled: (name: string) => {
    const feature = featuresGenerator().find((f) => f.name === name);

    if (!feature) return false;

    return feature.enabled;
  },
};

export const FeatureFlagContext = createContext<FeatureFlagContextType>(
  FeatureFlagContextInitialValues
);

export const FeatureFlagProvider = ({ children }: PropsWithChildren) => {
  return (
    <FeatureFlagContext.Provider value={FeatureFlagContextInitialValues}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFeatureFlagContext = () => useContext(FeatureFlagContext);
