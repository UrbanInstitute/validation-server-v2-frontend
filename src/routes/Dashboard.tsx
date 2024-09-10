import { BasePage } from "@/components";
import { useProtected } from "@/hooks/useProtected";
import { DashboardMain } from "../components/Dashboard/Main";
import TagManager from "react-gtm-module";
export const DashboardPage = ({ userId }: { userId: string }) => {
  useProtected();
  if (userId === null) {
    return null;
  }

  const tagManagerArgs = {
    dataLayer: {
      userId: userId,
    },
    dataLayerName: "DashboardPage",
  };
  TagManager.dataLayer(tagManagerArgs);

  return (
    <BasePage stepper={false} footer={false}>
      <div className="flex flex-col">
        <DashboardMain userId={userId} />
      </div>
    </BasePage>
  );
};
