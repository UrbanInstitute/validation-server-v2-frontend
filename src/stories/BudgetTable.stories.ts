import { BudgetTable } from "@/components/Budget/BudgetTable";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Composite Components/Budget Table",
  component: BudgetTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof BudgetTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    publicRemainingBudget: 100,
    reviewRemainingBudget: 97,
    pendingRefinementCost: 3.1,
  },
};

export const PublicRelease: Story = {
  args: {
    publicRemainingBudget: 100,
    reviewRemainingBudget: 97,
    pendingReleaseCost: 3.1,
  },
};
