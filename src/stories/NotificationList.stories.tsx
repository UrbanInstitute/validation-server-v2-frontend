import type { Meta, StoryObj } from "@storybook/react";
import { NotificationList } from "@/components";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Composite Components/Notification List",
  component: NotificationList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [
    function Component(Story, ctx) {
      return (
        <div className="w-[900px]">
          <Story args={{ ...ctx.args }} />
        </div>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    notifications: [
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
    ],
  },
};
