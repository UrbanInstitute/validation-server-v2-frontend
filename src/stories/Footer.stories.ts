import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "@/components";

const meta = {
  title: "Base Components/Footer",
  component: Footer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sticky: Story = {
  args: {
    refineBudgetValue: 97,
    publicBudgetValue: 100,
  },
};
