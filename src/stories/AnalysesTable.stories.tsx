import { AnalysesTable } from "@/components/Analyses/AnalysesTable";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Composite Components/Analyses Table",
  component: AnalysesTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [
    function Component(Story) {
      const router = createBrowserRouter(
        createRoutesFromElements(
          <Route>
            <Route
              path="*"
              element={
                <div className="w-[950px]">
                  <Story />
                </div>
              }
            />
          </Route>
        )
      );

      return <RouterProvider router={router} />;
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof AnalysesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    setPendingRefinement: () => {},
    setAnalysesIds: () => {},
    setSubmitDisabled: () => {},
    rows: [
      {
        analysis_id: "1",
        analysis_name: "Example Linear Model",
        epsilon_sum: 0.5555555555555557,
      },
      {
        analysis_id: "0",
        analysis_name: "Example Binomial Model",
        epsilon_sum: 0.4444444444444446,
      },
    ],
    jobId: "6a97c68c59f946f7b2d3d926b23991bb",
    runId: "2",
  },
};
