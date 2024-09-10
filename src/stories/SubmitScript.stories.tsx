import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import {
  AnalysisCardList,
  Button,
  Error,
  FileUpload,
  Input,
  NewScriptMain,
  Page,
} from "@/components";

const meta = {
  title: "Pages/Submit Script",
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [
    function Component(Story, ctx) {
      const [{ loggedIn }, setArgs] = useArgs<typeof ctx.args>();

      const handleLogin = () => {
        ctx.args.handleLogin?.();

        // Check if the component is controlled
        if (ctx.args.loggedIn !== undefined) {
          setArgs({ loggedIn: !loggedIn });
        }
      };

      return <Story args={{ ...ctx.args, handleLogin }} />;
    },
  ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step1: Story = {
  args: {
    loggedIn: true,
    footerProps: {
      sticky: true,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    stepper: true,
    activeStep: 0,
    activeNavLocation: "dashboard",
    children: (
      <NewScriptMain
        instructionProps={{
          instructions:
            "To begin, please submit an R script that contains one or more analyses. Submitting a script will cost 1 epsilon unit from your Review & Refine budget.",
        }}
        titleProps={{ title: "Submit an R Script" }}
      >
        <div className="w-[45rem]">
          <div>
            <FileUpload id={"scriptFile"} label="1. Upload a script" />
          </div>
          <div className="mt-4"></div>
          <div className="mt-[1.9rem]">
            <Input id={"scriptName"} label="2. Name a script" />
          </div>

          <div className="mt-6">
            <Button
              color="actionYellow"
              label="SUBMIT"
              variant="filled"
              size="large"
              buttonStyle="hover:scale-105 duration-200"
            />
          </div>
        </div>
      </NewScriptMain>
    ),
  },
};

export const Step1Error: Story = {
  args: {
    loggedIn: true,
    footerProps: {
      sticky: true,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    stepper: true,
    activeStep: 0,
    activeNavLocation: "dashboard",
    children: (
      <NewScriptMain
        instructionProps={{
          instructions:
            "To begin, please submit an R script that contains one or more analyses. Submitting a script will cost 1 epsilon unit from your Review & Refine budget.",
        }}
        titleProps={{ title: "Submit an R Script" }}
      >
        <div className="w-[45rem]">
          <div>
            <FileUpload id={"scriptFile"} label="1. Upload a script" />
          </div>
          <div className="mt-4">
            <Error
              error={
                "You must have at least 1.0 privacy budget units in your Review & Refine budget to upload a new script"
              }
            />
          </div>
          <div className="mt-[1.9rem]">
            <Input id={"scriptName"} label="2. Name a script" />
          </div>

          <div className="mt-6">
            <Button
              color="actionYellow"
              label="SUBMIT"
              variant="filled"
              size="large"
              buttonStyle="hover:scale-105 duration-200"
            />
          </div>
        </div>
      </NewScriptMain>
    ),
  },
};

export const Step2ResultsInProgress: Story = {
  args: {
    loggedIn: true,
    footerProps: {
      sticky: true,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    footer: true,
    stepper: true,
    activeStep: 1,
    activeNavLocation: "dashboard",
    children: (
      <NewScriptMain
        instructionProps={{
          instructions: (
            <div>
              <p>
                Initial results for your analyses are currently in progress. You
                will receive a notification to your email address and dashboard
                when the results become available.
              </p>
              <p className="mt-2 text-sm italic">
                Note: If you don't receive a notification with [timeframe].
                Contact [email address].
              </p>
            </div>
          ),
        }}
        titleProps={{ title: "Submit an R Script" }}
      >
        <div className="w-[70rem]">
          <AnalysisCardList
            scriptName="Script Name 1"
            analyses={[
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
            ]}
          />
        </div>
      </NewScriptMain>
    ),
  },
};

export const Step2ResultsAvailable: Story = {
  args: {
    loggedIn: true,
    footerProps: {
      sticky: true,
      refineBudgetValue: 95,
      publicBudgetValue: 100,
    },
    footer: true,
    stepper: true,
    activeStep: 1,
    activeNavLocation: "dashboard",
    children: (
      <NewScriptMain
        instructionProps={{
          instructions: (
            <div>
              <p>
                Initial results for your analyses are currently in progress. You
                will receive a notification to your email address and dashboard
                when the results become available.
              </p>
              <p className="mt-2 text-sm italic">
                Note: If you don't receive a notification with [timeframe].
                Contact [email address].
              </p>
            </div>
          ),
        }}
        titleProps={{ title: "Submit an R Script" }}
      >
        <div className="w-[70rem]">
          <AnalysisCardList
            scriptName="Script Name 1"
            analyses={[
              {
                title: "First Analysis",
                status: "available",
                handleReviewClick: () => console.log("Clicked #1"),
              },
              {
                title: "Second Analysis v1",
                status: "available",
                handleReviewClick: () => console.log("Clicked #2"),
              },
            ]}
          />
        </div>
      </NewScriptMain>
    ),
  },
};
