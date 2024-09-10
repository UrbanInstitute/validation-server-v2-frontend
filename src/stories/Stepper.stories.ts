import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "@/components";

const meta = {
  title: "Base Components/Stepper",
  component: Stepper,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    steps: ["Submit Script", "Review & Refine Results", "Release Results"],
    activeStep: 1,
  },
};
