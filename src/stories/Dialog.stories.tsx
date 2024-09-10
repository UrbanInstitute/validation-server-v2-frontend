import type { Meta, StoryObj } from "@storybook/react";
import { BudgetTable, Dialog, Input } from "@/components";
import { useArgs } from "@storybook/preview-api";
import { PrivacyGraph } from "@/components/Plot/PrivacyGraph";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Base Components/Dialog",
  component: Dialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },

  decorators: [
    function Component(Story, ctx) {
      const [{ actionButtons }, setArgs] = useArgs<typeof ctx.args>();

      const handleSetOpen = (state: boolean) => {
        ctx.args.setOpen?.(state);
        setArgs({ open: state });
      };

      return (
        <Story
          args={{
            ...ctx.args,
            setOpen: handleSetOpen,
            actionButtons:
              actionButtons?.map((buttonProps) => ({
                ...buttonProps,
                onClick: () => handleSetOpen(false),
              })) ?? ctx.args.actionButtons,
          }}
        />
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    open: false,
    description: "Dialog Content",
    title: "Dialog Title",
    actionButtons: [
      {
        size: "large",
        label: "Apply",
        buttonStyle: "w-full flex-grow uppercase text-base",
        variant: "filled",
      },
    ],
  },
};

export const EditEpsilon: Story = {
  args: {
    open: false,
    title: "Edit Entry for Multiple Cells",
    actionButtons: [
      {
        size: "large",
        label: "Apply",
        buttonStyle: "w-full flex-grow uppercase text-base",
        variant: "filled",
      },
    ],
    children: <Input label="EPSILON" id="epsilon" />,
  },
};

export const PrivacyGraphModal: Story = {
  args: {
    open: false,
    title: "Cell 1",
    actionButtons: [],
    children: (
      <PrivacyGraph
        theta={0.000480000731834798}
        noise_90={366138.3489331}
        currentValue={1}
        proposedValue={1.05}
      />
    ),
  },
};

export const SubmitRefinements: Story = {
  args: {
    open: false,
    title: "Submit Refinements?",
    contentStyle: "max-w-5xl",
    actionButtons: [
      {
        label: "CANCEL",
        color: "primary",
        variant: "outlined",
        size: "large",
        buttonStyle: "min-w-[194px]",
      },
      {
        label: "SAVE",
        color: "primary",
        size: "large",
        variant: "filled",
        buttonStyle: "min-w-[194px]",
      },
    ],
    children: (
      <div className="flex flex-col text-grayText">
        <div className="flex flex-row">
          <div>
            <div className="text-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <div className="text-lg">
              If you submit these refinements, your dataset will be altered and
              your current remaining privacy budget will decrease to reflect the
              "<span className="font-bold">New Remaining Privacy Budget</span>”
              figure below.
            </div>
            <div className="italic text-base mt-[1.125rem]">
              As a reminder:
              <ul className="mt-2 space-y-2 list-disc ml-3">
                <li>
                  Your privacy budget is shared across all analyses in your
                  dashboard
                </li>
                <li>
                  Refinement costs are deducted from your “Review & Refine”
                  budget.
                </li>
                <li>
                  Your “Public Release” budget will not be impacted until you
                  release your final results in the next step.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 mb-8">
          <BudgetTable
            reviewRemainingBudget={97}
            publicRemainingBudget={100}
            pendingRefinementCost={3.1}
          />
        </div>
      </div>
    ),
  },
};
