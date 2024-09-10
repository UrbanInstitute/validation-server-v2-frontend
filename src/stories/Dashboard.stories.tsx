import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { CombinedBudget, NotificationList, Page } from "@/components";
import { ScriptAccordionList } from "@/components/Scripts";

const meta = {
  title: "Pages/Dashboard",
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [
    function Component(Story, ctx) {
      const [{ loggedIn }, setArgs] = useArgs<typeof ctx.args>();

      const handleLogin = () => {
        ctx.args.handleLogin?.();

        // Check if the component is controlled
        if (ctx.args.loggedIn !== undefined) {
          setArgs({ loggedIn: !loggedIn });
        }
      };

      return <Story args={{ ...ctx.args, handleLogin }} />;
    },
  ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    loggedIn: true,
    footerProps: {
      sticky: true,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    stepper: false,
    activeNavLocation: "dashboard",
    children: (
      <div className="flex flex-col">
        <div className="w-[900px]">
          <NotificationList
            notifications={[
              {
                text: "Results are now available for Script Name 1 Analysis Name 1",
                timestamp: new Date("2022-12-06 16:25"),
                onMarkClick: () => console.log("Click"),
              },
              {
                text: "Results are now released for Script Name 2 Analysis Name 1 - Version 2",
                timestamp: new Date("2022-12-06 15:00"),
                onMarkClick: () => console.log("Click"),
              },
            ]}
          />
        </div>
        <div className="mt-14">
          <CombinedBudget refineBudgetValue={92} publicBudgetValue={97} />
        </div>
        <div className="mt-14">
          <ScriptAccordionList
            scripts={[
              {
                id: "1",
                name: "SCRIPT: Script Name 1",
                newResults: true,
                createdAt: "2023-05-21T12:32:54.015Z",
                analyses: [
                  {
                    analysisName: "First Analysis",
                    status: "available",
                  },
                  {
                    analysisName: "Second Analysis v1",
                    status: "released",
                    reviewValue: 1,
                  },
                  {
                    analysisName: "Second Analysis v2",
                    status: "available",
                    reviewValue: 0.8,
                  },
                ],
              },
              {
                id: "2",
                name: "SCRIPT: Script Name 2",
                createdAt: "2023-05-21T15:39:12.015Z",
                analyses: [
                  {
                    analysisName: "First Analysis v1",
                    status: "available",
                    reviewValue: 0.75,
                  },
                  {
                    analysisName: "First Analysis v2",
                    status: "released",
                    reviewValue: 1,
                    publicValue: 0.64,
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    ),
  },
};

export const DashboardNoNotifications: Story = {
  args: {
    loggedIn: true,
    footerProps: {
      sticky: true,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    activeNavLocation: "dashboard",
    children: (
      <div className="flex flex-col">
        <div className="w-[900px]">
          <NotificationList notifications={[]} />
        </div>
        <div className="mt-14">
          <CombinedBudget refineBudgetValue={92} publicBudgetValue={97} />
        </div>
        <div className="mt-14">
          <ScriptAccordionList />
        </div>
      </div>
    ),
  },
};
