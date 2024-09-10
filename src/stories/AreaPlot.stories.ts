import AreaPlot from "@/components/Plot/AreaPlot";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Base Components/AreaPlot",
  component: AreaPlot,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof AreaPlot>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    data: [
      {
        x: 0,
        y0: 99.97,
        y1: 100.03,
        error: 0.03,
        estimate: 100,
      },
      {
        x: 1,
        y0: 99.975,
        y1: 100.025,
        error: 0.025,
        estimate: 100,
      },
      {
        x: 2,
        y0: 99.9875,
        y1: 100.0125,
        error: 0.0125,
        estimate: 100,
      },
      {
        x: 3,
        y0: 99.991,
        y1: 100.009,
        error: 0.009,
        estimate: 100,
      },
    ],
    xAxisTitle: "Privacy cost (epsilon)",
    yAxisTitle: "Privacy error",
    currentLabel: "Current value",
    proposedLabel: "Proposed value",
    currentValue: 1,
    proposedValue: 1.05,
  },
};
