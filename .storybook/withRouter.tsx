import React from "react";
import { StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

export const withRouter = (Story: StoryFn) => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Story />
    </MemoryRouter>
  );
};
