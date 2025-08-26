import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack, type StackGap } from "./Stack";

// Helper component for consistent demo items
const StackItem = ({ children, color = "#e3f2fd", ...props }: { 
  children: React.ReactNode; 
  color?: string;
  [key: string]: any;
}) => (
  <div 
    style={{ 
      padding: "1rem", 
      backgroundColor: color, 
      borderRadius: "6px",
      textAlign: "center",
      minWidth: "80px",
      border: "1px solid rgba(0,0,0,0.1)",
    }} 
    {...props}
  >
    {children}
  </div>
);

/**
 * Stack component provides a flexible container for arranging child elements in a row or column.
 * 
 * Features:
 * - Flexible direction (row, column, reverse options)
 * - Justification and alignment control
 * - Spacing system with design tokens (0-8 scale)
 * - Wrap control for responsive layouts
 * - Polymorphic component (customizable element type)
 * - SSR compatible
 */
const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A flexible layout component for arranging child elements with consistent spacing and alignment options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: { 
      control: { type: "select" }, 
      options: [
        "row", 
        "column", 
        "row-reverse", 
        "column-reverse",
      ],
      description: "The direction of the stack (row or column with reverse options)",
      table: {
        defaultValue: { summary: "column" },
      },
    },
    justify: { 
      control: { type: "select" }, 
      options: [
        "flex-start", 
        "flex-end", 
        "center", 
        "space-between", 
        "space-around", 
        "space-evenly",
      ],
      description: "How to justify content along the main axis",
      table: {
        defaultValue: { summary: "flex-start" },
      },
    },
    align: { 
      control: { type: "select" }, 
      options: [
        "flex-start", 
        "flex-end", 
        "center", 
        "baseline", 
        "stretch",
      ],
      description: "How to align items along the cross axis",
      table: {
        defaultValue: { summary: "stretch" },
      },
    },
    wrap: { 
      control: { type: "select" }, 
      options: [
        "nowrap", "wrap", "wrap-reverse",
      ],
      description: "Whether flex items should wrap",
      table: {
        defaultValue: { summary: "nowrap" },
      },
    },
    gap: { 
      control: { type: "range", min: 0, max: 8, step: 1 }, 
      description: "Spacing scale from 0-8 (maps to design system spacing tokens)",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    as: { 
      control: { type: "text" },
      description: "The HTML element type to render",
      table: {
        defaultValue: { summary: "div" },
      },
    },
    children: {
      description: "Content to be arranged within the stack",
      control: false,
    },
  },
  args: {
    direction: "column",
    justify: "flex-start",
    align: "stretch",
    wrap: "nowrap",
    gap: 3,
    as: "div",
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem color="#e8f5e8">Item 2</StackItem>
        <StackItem color="#fff3e0">Item 3</StackItem>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default stack layout with column direction and medium spacing.",
      },
    },
  },
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all stack props and controls.",
      },
    },
  },
};

export const WithSx: Story = {
  render: () => (
    <Stack direction="row" gap={3} sx={{ padding: 12, background: "var(--color-background-subtle)", borderRadius: 8 }}>
      <StackItem>One</StackItem>
      <StackItem color="#e8f5e8">Two</StackItem>
      <StackItem color="#fff3e0">Three</StackItem>
    </Stack>
  ),
};

export const AllDirections: Story = {
  render: function AllDirectionsStack() {
    const directions = [
      { value: "row", label: "Row (horizontal)" },
      { value: "column", label: "Column (vertical)" },
      { value: "row-reverse", label: "Row Reverse" },
      { value: "column-reverse", label: "Column Reverse" },
    ] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {directions.map(({ value, label }) => (
          <div key={value}>
            <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
              {label}
            </h4>
            <div
              style={{ 
                border: "2px dashed #ddd", 
                padding: "1rem", 
                borderRadius: "8px",
                minHeight: value.includes("column") ? "200px" : "auto"
              }}
            >
              <Stack direction={value} gap={2}>
                <StackItem>First</StackItem>
                <StackItem color="#e8f5e8">Second</StackItem>
                <StackItem color="#fff3e0">Third</StackItem>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available direction options: row, column, and their reverse variants.",
      },
    },
  },
};

export const AllJustifications: Story = {
  render: function AllJustificationsStack() {
    const justifications = [
      { value: "flex-start", label: "Flex Start" },
      { value: "flex-end", label: "Flex End" },
      { value: "center", label: "Center" },
      { value: "space-between", label: "Space Between" },
      { value: "space-around", label: "Space Around" },
      { value: "space-evenly", label: "Space Evenly" },
    ] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {justifications.map(({ value, label }) => (
          <div key={value}>
            <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
              {label}
            </h4>
            <div
              style={{ 
                border: "2px dashed #ddd", 
                padding: "1rem", 
                borderRadius: "8px",
                width: "100%",
                minHeight: "120px"
              }}
            >
              <Stack direction="row" justify={value} gap={2} style={{ height: "100%" }}>
                <StackItem>A</StackItem>
                <StackItem color="#e8f5e8">B</StackItem>
                <StackItem color="#fff3e0">C</StackItem>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different justify options showing how items are distributed along the main axis.",
      },
    },
  },
};

export const AllAlignments: Story = {
  render: function AllAlignmentsStack() {
    const alignments = [
      { value: "flex-start", label: "Flex Start" },
      { value: "flex-end", label: "Flex End" },
      { value: "center", label: "Center" },
      { value: "baseline", label: "Baseline" },
      { value: "stretch", label: "Stretch" },
    ] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {alignments.map(({ value, label }) => (
          <div key={value}>
            <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
              {label}
            </h4>
            <div
              style={{ 
                border: "2px dashed #ddd", 
                padding: "1rem", 
                borderRadius: "8px",
                height: "150px"
              }}
            >
              <Stack direction="row" align={value} gap={2} style={{ height: "100%" }}>
                <StackItem style={{ height: "60px", lineHeight: "60px" }}>Short</StackItem>
                <StackItem color="#e8f5e8" style={{ height: "80px", lineHeight: "80px" }}>Medium</StackItem>
                <StackItem color="#fff3e0" style={{ height: "100px", lineHeight: "100px" }}>Tall</StackItem>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different align options showing how items are positioned along the cross axis.",
      },
    },
  },
};

export const AllSpacings: Story = {
  render: function AllSpacingsStack() {
    const spacings = [0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {spacings.map(gap => (
          <div key={gap}>
            <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
              Gap: {gap}
            </h4>
            <div
              style={{ 
                border: "2px dashed #ddd", 
                padding: "1rem", 
                borderRadius: "8px"
              }}
            >
              <Stack direction="row" gap={gap as StackGap}>
                <StackItem>A</StackItem>
                <StackItem color="#e8f5e8">B</StackItem>
                <StackItem color="#fff3e0">C</StackItem>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available spacing values (0-8) showing the gap between stack items.",
      },
    },
  },
};

export const WrapBehavior: Story = {
  render: function WrapBehaviorStack() {
    const wrapOptions = [
      { value: "nowrap", label: "No Wrap" }, { value: "wrap", label: "Wrap" }, { value: "wrap-reverse", label: "Wrap Reverse" },
    ] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {wrapOptions.map(({ value, label }) => (
          <div key={value}>
            <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
              {label}
            </h4>
            <div
              style={{ 
                border: "2px dashed #ddd", 
                padding: "1rem", 
                borderRadius: "8px",
                width: "300px"
              }}
            >
              <Stack direction="row" wrap={value} gap={2}>
                <StackItem style={{ minWidth: "100px" }}>Item 1</StackItem>
                <StackItem color="#e8f5e8" style={{ minWidth: "100px" }}>Item 2</StackItem>
                <StackItem color="#fff3e0" style={{ minWidth: "100px" }}>Item 3</StackItem>
                <StackItem color="#fce4ec" style={{ minWidth: "100px" }}>Item 4</StackItem>
              </Stack>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different wrap behaviors when items exceed container width.",
      },
    },
  },
};

export const InForm: Story = {
  render: function InFormStack() {
    return (
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <form style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 1.5rem 0", textAlign: "center" }}>Contact Form</h3>
          
          <Stack gap={4}>
            {/* Name Fields */}
            <Stack direction="row" gap={3}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
                  First Name
                </label>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                  placeholder="John"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
                  Last Name
                </label>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                  placeholder="Doe"
                />
              </div>
            </Stack>

            {/* Email */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
                Email
              </label>
              <input
                type="email"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }}
                placeholder="john.doe@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
                Message
              </label>
              <textarea
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  minHeight: "100px",
                  resize: "vertical",
                }}
                placeholder="Your message here..."
              />
            </div>

            {/* Actions */}
            <Stack direction="row" justify="space-between" gap={2}>
              <button
                type="button"
                style={{
                  padding: "0.75rem 1.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "0.75rem 1.5rem",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#1976d2",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Send Message
              </button>
            </Stack>
          </Stack>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example using Stack for form layout with proper spacing and alignment.",
      },
    },
  },
};
