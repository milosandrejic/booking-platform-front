import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "./Typography";

/**
 * Typography component provides consistent text styling across the application.
 * 
 * Features:
 * - Semantic typography variants (display, headline, title, body, label)
 * - Multiple sizes for each variant
 * - Consistent spacing and line heights
 * - Customizable colors
 * - SSR compatible
 * - Accessible text rendering
 */
const meta = {
  title: "Data Display/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A typography component that provides consistent text styling with semantic variants and sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "displayLarge",
        "displayMedium",
        "displaySmall",
        "headlineLarge",
        "headlineMedium",
        "headlineSmall",
        "titleLarge",
        "titleMedium",
        "titleSmall",
        "bodyLarge",
        "bodyMedium",
        "bodySmall",
        "labelLarge",
        "labelMedium",
        "labelSmall",
      ],
      description: "Typography variant that determines the visual style and semantic meaning",
      table: {
        defaultValue: { summary: "bodyMedium" },
      },
    },
    color: {
      control: { type: "text" },
      description: "Text color (CSS color value or design token)",
      table: {
        defaultValue: { summary: "onSurface" },
      },
    },
    component: {
      control: { type: "text" },
      description: "HTML element to render (h1, h2, p, span, etc.)",
    },
    children: {
      control: { type: "text" },
      description: "Text content to display",
    },
  },
  args: {
    variant: "bodyMedium",
    children: "Typography text",
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default typography with bodyMedium variant.",
      },
    },
  },
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all typography props and controls.",
      },
    },
  },
};

export const AllDisplayVariants: Story = {
  render: function AllDisplayVariantsTypography() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="displayLarge">
          Display Large - Hero headlines
        </Typography>
        <Typography variant="displayMedium">
          Display Medium - Important headlines
        </Typography>
        <Typography variant="displaySmall">
          Display Small - Section headlines
        </Typography>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Display variants are used for large, prominent text like hero headlines.",
      },
    },
  },
};

export const AllHeadlineVariants: Story = {
  render: function AllHeadlineVariantsTypography() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="headlineLarge">
          Headline Large - Page titles
        </Typography>
        <Typography variant="headlineMedium">
          Headline Medium - Section titles
        </Typography>
        <Typography variant="headlineSmall">
          Headline Small - Subsection titles
        </Typography>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Headline variants are used for page and section titles.",
      },
    },
  },
};

export const AllTitleVariants: Story = {
  render: function AllTitleVariantsTypography() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="titleLarge">
          Title Large - Card headers
        </Typography>
        <Typography variant="titleMedium">
          Title Medium - Component titles
        </Typography>
        <Typography variant="titleSmall">
          Title Small - Subheadings
        </Typography>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Title variants are used for component titles and card headers.",
      },
    },
  },
};

export const AllBodyVariants: Story = {
  render: function AllBodyVariantsTypography() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="bodyLarge">
          Body Large - Emphasized body text for important content that needs to stand out.
        </Typography>
        <Typography variant="bodyMedium">
          Body Medium - Standard body text for regular content and descriptions.
        </Typography>
        <Typography variant="bodySmall">
          Body Small - Secondary text for captions and supporting information.
        </Typography>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Body variants are used for regular content and text blocks.",
      },
    },
  },
};

export const AllLabelVariants: Story = {
  render: function AllLabelVariantsTypography() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="labelLarge">
          Label Large - Button text
        </Typography>
        <Typography variant="labelMedium">
          Label Medium - Form labels
        </Typography>
        <Typography variant="labelSmall">
          Label Small - Helper text
        </Typography>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Label variants are used for buttons, form labels, and helper text.",
      },
    },
  },
};

export const SemanticHierarchy: Story = {
  render: function SemanticHierarchyTypography() {
    return (
      <article style={{ maxWidth: "600px", lineHeight: 1.6 }}>
        <Typography variant="displayLarge" component="h1">
          Article Title
        </Typography>
        
        <Typography variant="bodyMedium" style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          This article demonstrates the semantic hierarchy of typography variants 
          and how they work together to create clear information architecture.
        </Typography>

        <Typography variant="headlineMedium" component="h2" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          Main Section Heading
        </Typography>
        
        <Typography variant="bodyMedium" style={{ marginBottom: "1rem" }}>
          This is regular body text that provides the main content. It uses the 
          bodyMedium variant which is optimized for readability.
        </Typography>

        <Typography variant="titleMedium" component="h3" style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>
          Subsection Title
        </Typography>

        <Typography variant="bodyMedium" style={{ marginBottom: "1rem" }}>
          More body content continues here with consistent spacing and typography.
        </Typography>

        <Typography variant="labelMedium" style={{ marginTop: "1rem", fontWeight: "600" }}>
          Tags: React, TypeScript, Design System
        </Typography>
      </article>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example showing proper semantic hierarchy with appropriate HTML elements and typography variants.",
      },
    },
  },
};

export const ColorVariations: Story = {
  render: function ColorVariationsTypography() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Typography variant="titleMedium">
          Default Color (onSurface)
        </Typography>
        <Typography variant="titleMedium" color="primary">
          Primary Blue
        </Typography>
        <Typography variant="titleMedium" color="#dc004e">
          Error Red
        </Typography>
        <Typography variant="titleMedium" color="#00c853">
          Success Green
        </Typography>
        <Typography variant="titleMedium" color="secondary">
          Secondary
        </Typography>
        <Typography variant="titleMedium" color="warning">
          Warning
        </Typography>
        <Typography variant="titleMedium" color="info">
          Info
        </Typography>
        <Typography variant="titleMedium" color="onSurfaceVariant">
          On Surface Variant
        </Typography>
        <Typography variant="titleMedium" color="outline">
          Outline Color
        </Typography>
        <Typography variant="bodyMedium" color="#666">
          Muted text in gray
        </Typography>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Typography supports semantic colors (primary, secondary, success, warning, error, info, onSurface, onSurfaceVariant, outline) and direct CSS values like hex, rgb, hsl, or var().",
      },
    },
  },
};

export const WithSx: Story = {
  render: function TypographyWithSx() {
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <Typography variant="titleLarge" sx={{ padding: 8, background: "var(--color-primary-light)", borderRadius: 8, color: "var(--color-primary-contrast-text)" }}>
          Boxed Title with sx
        </Typography>
        <Typography variant="bodyMedium" sx={(t) => ({ color: t.color.text.secondary })}>
          Theme-driven secondary text via sx(theme)
        </Typography>
      </div>
    );
  },
};
