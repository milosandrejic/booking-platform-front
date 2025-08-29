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
    <Box 
      sx={{ 
        padding: "16px", 
        borderRadius: "12px",
        backgroundColor: (t: Theme) => t.color.background.paper,
        border: "1px solid var(--color-border-main)" 
      }}
    >
      Basic Box with padding, background, and border radius.
    </Box>
  ),
};

export const FlexLayout: Story = {
  render: () => (
    <Box 
      sx={{ 
        display: "flex", 
        gap: "12px", 
        padding: "12px", 
        borderRadius: "12px",
        backgroundColor: (t: Theme) => t.color.background.subtle 
      }}
    >
      <Box 
        sx={{ 
          padding: "8px", 
          borderRadius: "8px",
          backgroundColor: (t: Theme) => t.color.primary.main,
          color: (t: Theme) => t.color.primary.contrastText 
        }}
      >
        A
      </Box>
      <Box 
        sx={{ 
          padding: "8px", 
          borderRadius: "8px",
          backgroundColor: (t: Theme) => t.color.success.main,
          color: (t: Theme) => t.color.success.contrastText 
        }}
      >
        B
      </Box>
      <Box 
        sx={{ 
          padding: "8px", 
          borderRadius: "8px",
          backgroundColor: (t: Theme) => t.color.warning.main,
          color: (t: Theme) => t.color.warning.contrastText 
        }}
      >
        C
      </Box>
    </Box>
  ),
};

export const AsElement: Story = {
  render: () => (
    <Box 
      component="section" 
      sx={{ 
        padding: "12px",
        border: "1px dashed var(--color-border-dark)" 
      }}
    >
      Rendered as a semantic {"<section>"} element
    </Box>
  ),
};

export const SxFunction: Story = {
  render: () => (
    <Box
      sx={{
        padding: (t: Theme) => t.spacing[6],
        backgroundColor: (t: Theme) => t.color.primary.light,
        color: (t: Theme) => t.color.primary.contrastText,
        borderRadius: "40px",
      }}
    >
      sx with theme functions
    </Box>
  ),
};

export const WithPseudoSelectors: Story = {
  render: () => (
    <Box 
      sx={{
        padding: "16px", 
        borderRadius: "8px", 
        cursor: "pointer",
        transition: "all 0.2s ease",
        backgroundColor: (t: Theme) => t.color.background.paper,
        border: "2px solid transparent",
        ":hover": {
          backgroundColor: (t: Theme) => t.color.primary.light,
          borderColor: (t: Theme) => t.color.primary.main,
          transform: "translateY(-2px)",
        },
        ":active": {
          transform: "translateY(0px)",
          backgroundColor: (t: Theme) => t.color.primary.main,
          color: (t: Theme) => t.color.primary.contrastText,
        },
        ":focus": {
          outline: "none",
          boxShadow: (t: Theme) => `0 0 0 3px ${t.color.primary.light}`,
        }
      }}
      tabIndex={0}
    >
      Hover, focus, or click me to see pseudo-selector styles!
    </Box>
  ),
};

export const ButtonLike: Story = {
  render: () => (
    <Box 
      component="button"
      sx={{ 
        padding: "12px 24px", 
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.15s ease",
        backgroundColor: (t: Theme) => t.color.primary.main,
        color: (t: Theme) => t.color.primary.contrastText,
        ":hover": {
          backgroundColor: (t: Theme) => t.color.primary.dark,
          transform: "translateY(-1px)",
        },
        ":active": {
          transform: "translateY(1px)",
          backgroundColor: (t: Theme) => t.color.primary.dark,
        },
        ":disabled": {
          backgroundColor: "#ccc",
          color: "#666",
          cursor: "not-allowed",
          transform: "none",
        }
      }}
    >
      Interactive Button
    </Box>
  ),
};
