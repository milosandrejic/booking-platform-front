import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Theme } from "@booking-platform-shared/theme";
import { Box } from "./Box";

const meta = {
  title: "Layout/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Box p={4} bgcolor="background.paper" borderRadius={12} sx={{ border: "1px solid var(--color-border-main)" }}>
      Basic Box with padding, background, and border radius.
    </Box>
  ),
};

export const FlexLayout: Story = {
  render: () => (
    <Box display="flex" gap={3} p={3} bgcolor="background.subtle" borderRadius={12}>
      <Box p={2} bgcolor="primary.main" color="primary.contrastText" borderRadius={8}>A</Box>
      <Box p={2} bgcolor="success.main" color="success.contrastText" borderRadius={8}>B</Box>
      <Box p={2} bgcolor="warning.main" color="warning.contrastText" borderRadius={8}>C</Box>
    </Box>
  ),
};

export const AsElement: Story = {
  render: () => (
    <Box component="section" p={3} sx={{ border: "1px dashed var(--color-border-dark)" }}>
      Rendered as a semantic {"<section>"} element
    </Box>
  ),
};

export const SxFunction: Story = {
  render: () => (
  <Box sx={(t: Theme) => ({ padding: t.spacing[6], background: t.color.primary.light, color: t.color.primary.contrastText, borderRadius: t.borderRadius.lg })}>
      sx(theme) as function
    </Box>
  ),
};
