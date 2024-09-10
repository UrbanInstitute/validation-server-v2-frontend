import type { Preview } from "@storybook/react";
import "../src/index.css";

import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { withRouter } from "./withRouter";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        // nameOfTheme: 'dataAttributeForTheme',
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
    withRouter,
  ],
};

export default preview;
