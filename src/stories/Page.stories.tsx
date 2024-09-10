import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { CombinedBudget, NotificationList, Page } from "@/components";

const meta = {
  title: "Pages/Page",
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

export const LoggedOut: Story = {
  args: {
    loggedIn: false,
    footerProps: {
      sticky: false,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    activeNavLocation: "dashboard",
  },
};

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const LoggedIn: Story = {
  args: {
    loggedIn: true,
    footerProps: {
      sticky: true,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    activeNavLocation: "dashboard",
  },
};

export const WithStepper: Story = {
  args: {
    loggedIn: true,
    footerProps: {
      sticky: true,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    stepper: true,
    activeStep: 1,
    activeNavLocation: "dashboard",
  },
};

export const Notifications: Story = {
  args: {
    loggedIn: true,
    footerProps: {
      sticky: true,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    stepper: true,
    activeStep: 1,
    activeNavLocation: "dashboard",
    children: (
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
    ),
  },
};

export const Dashboard: Story = {
  args: {
    loggedIn: true,
    footerProps: {
      sticky: true,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    stepper: true,
    activeStep: 1,
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
    stepper: true,
    activeStep: 1,
    activeNavLocation: "dashboard",
    children: (
      <div className="flex flex-col">
        <div className="w-[900px]">
          <NotificationList notifications={[]} />
        </div>
        <div className="mt-14">
          <CombinedBudget refineBudgetValue={92} publicBudgetValue={97} />
        </div>
      </div>
    ),
  },
};
