import { AnalysisCardList } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Composite Components/Analysis Card List",
  component: AnalysisCardList,
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
} satisfies Meta<typeof AnalysisCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const InProgress: Story = {
  args: {
    scriptName: "SCRIPT: Script Name 1",
    analyses: [
      {
        title: "First Analysis",
        status: "inProgress",
        handleReviewClick: () => console.log("Clicked #1"),
      },
      {
        title: "Second Analysis v1",
        status: "inProgress",
        handleReviewClick: () => console.log("Clicked #2"),
      },
    ],
  },
};

export const Available: Story = {
  args: {
    scriptName: "SCRIPT: Script Name 1",
    analyses: [
      {
        title: "First Analysis",
        status: "available",
        handleReviewClick: () => console.log("Clicked #1"),
      },
      {
        title: "Second Analysis v1",
        status: "inProgress",
        handleReviewClick: () => console.log("Clicked #2"),
      },
    ],
  },
};

export const Error: Story = {
  args: {
    scriptName: "SCRIPT: Script Name 1",
    analyses: [
      {
        title: "First Analysis",
        status: "available",
        handleReviewClick: () => console.log("Clicked #1"),
      },
      {
        title: "Second Analysis v1",
        status: "error",
        handleReviewClick: () => console.log("Clicked #2"),
      },
    ],
  },
};

export const NoScripts: Story = {
  args: {
    scriptName: "SCRIPT: Script Name 2",
    analyses: [],
  },
};
