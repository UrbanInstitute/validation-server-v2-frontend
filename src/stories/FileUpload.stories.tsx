import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "@/components";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Base Components/File Upload",
  component: FileUpload,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [
    function Component(Story, ctx) {
      return (
        <div className="w-[719px]">
          <Story args={{ ...ctx.args }} />
        </div>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    id: "input",
    label: "Input",
  },
};
