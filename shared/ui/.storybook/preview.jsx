import { ThemeProvider } from "@booking-platform-shared/theme";

/** @type { import('@storybook/react').Preview } */
const preview = {
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
    Story => (
      <ThemeProvider>
        <div style={{ padding: "20px" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
