import { ScriptAccordionList } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Composite Components/Script Accordion List",
  component: ScriptAccordionList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ScriptAccordionList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    scripts: [
      {
        id: "1",
        name: "SCRIPT: Script Name 1",
        createdAt: "2021-11-28T16:00:00.000Z",
        newResults: true,
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
        createdAt: "2022-10-28T16:00:00.000Z",
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
    ],
  },
};

export const NoScripts: Story = {
  args: {},
};
