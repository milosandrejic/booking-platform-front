import type { Preview } from "@storybook/react-vite";
import { ThemeProvider } from "@booking-platform-shared/theme";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      description: {
        component: "Material Design 3 components for the booking platform",
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider applyCssReset>
          <div style={{ padding: "20px" }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
