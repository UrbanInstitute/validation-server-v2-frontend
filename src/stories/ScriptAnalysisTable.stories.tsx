import { ScriptAnalysisTable } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Composite Components/Script Analysis Table",
  component: ScriptAnalysisTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [
    function Component(Story, ctx) {
      const [pendingRefinement, setPendingRefinement] = useState<number>();

      return (
        <div className="w-[950px]">
          <Story
            args={{
              ...ctx.args,
              pendingRefinement,
              setPendingRefinement,
            }}
          />
        </div>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ScriptAnalysisTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    budget: {
      id: 1,
      release: 99,
      review: 89,
    },
    pendingRefinement: 0,
    setPendingRefinement: () => {},
    setRefinement: () => {},
    rows: [
      {
        statistic_id: 1,
        analysis_id: "1",
        variable: "Variable 1",
        statistic: "Statistic 1",
        chi: 17414472.35,
        epsilon: 1.0,
        noise_90: 8000,
        value_sanitized: 1200,
        analysis_type: "mean",
        analysis_name: "Analysis 1",
      },
      {
        statistic_id: 2,
        analysis_id: "2",
        variable: "Variable 2",
        statistic: "Statistic 2",
        chi: 30750,
        epsilon: 0.8,
        noise_90: 8000,
        value_sanitized: 1200,
        analysis_type: "mean",
        analysis_name: "Intercept 1",
      },
    ],
    serverRows: [
      {
        statistic_id: 1,
        analysis_id: "1",
        variable: "Variable 1",
        statistic: "Statistic 1",
        chi: 17414472.35,
        epsilon: 1.0,
        noise_90: 8000,
        value_sanitized: 1200,
        analysis_type: "mean",
        analysis_name: "Analysis 1",
      },
      {
        statistic_id: 2,
        analysis_id: "2",
        variable: "Variable 2",
        statistic: "Statistic 2",
        chi: 30750,
        epsilon: 0.8,
        noise_90: 8000,
        value_sanitized: 1200,
        analysis_type: "mean",
        analysis_name: "Intercept 1",
      },
    ],
  },
};
