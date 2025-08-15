import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  argTypes: {
    direction: { 
      control: { type: "select" }, 
      options: [
        "row", 
        "column", 
        "row-reverse", 
        "column-reverse"
      ] 
    },
    justify: { 
      control: { type: "select" }, 
      options: [
        "flex-start", 
        "flex-end", 
        "center", 
        "space-between", 
        "space-around", 
        "space-evenly"
      ] 
    },
    align: { 
      control: { type: "select" }, 
      options: [
        "flex-start", 
        "flex-end", 
        "center", 
        "baseline", 
        "stretch"
      ] 
    },
    wrap: { 
      control: { type: "select" }, 
      options: [
        "nowrap", "wrap", "wrap-reverse"
      ] 
    },
    gap: { 
      control: { type: "range", min: 0, max: 8, step: 1 }, 
      description: "Spacing scale from 0-8 (maps to --spacing-0 through --spacing-8)"
    },
    as: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const ItemBox = ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
  <div 
    style={{ 
      padding: "16px", 
      backgroundColor: "#f0f0f0", 
      border: "1px solid #ccc",
      borderRadius: "4px",
      minWidth: "60px",
      textAlign: "center"
    }} 
    {...props}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: {
    direction: "column",
    justify: "flex-start",
    align: "stretch",
    wrap: "nowrap",
    gap: 3,
  },
  render: args => (
    <div style={{ width: 400, height: 300, border: "2px dashed #999", padding: "16px" }}>
      <Stack {...args}>
        <ItemBox>Item 1</ItemBox>
        <ItemBox>Item 2</ItemBox>
        <ItemBox>Item 3</ItemBox>
      </Stack>
    </div>
  ),
};

export const HorizontalStack: Story = {
  args: {
    direction: "row",
    justify: "flex-start",
    align: "center",
    gap: 4,
  },
  render: args => (
    <div style={{ width: 600, height: 200, border: "2px dashed #999", padding: "16px" }}>
      <Stack {...args}>
        <ItemBox>Short</ItemBox>
        <ItemBox>Medium Content</ItemBox>
        <ItemBox>Very Long Content Here</ItemBox>
      </Stack>
    </div>
  ),
};

export const CenteredLayout: Story = {
  args: {
    direction: "column",
    justify: "center",
    align: "center",
    gap: 3,
  },
  render: args => (
    <div style={{ width: 400, height: 300, border: "2px dashed #999", padding: "16px" }}>
      <Stack {...args}>
        <ItemBox>Centered</ItemBox>
        <ItemBox>Content</ItemBox>
      </Stack>
    </div>
  ),
};

export const SpaceBetween: Story = {
  args: {
    direction: "row",
    justify: "space-between",
    align: "center",
    gap: 0,
  },
  render: args => (
    <div style={{ width: 600, height: 200, border: "2px dashed #999", padding: "16px" }}>
      <Stack {...args}>
        <ItemBox>Left</ItemBox>
        <ItemBox>Center</ItemBox>
        <ItemBox>Right</ItemBox>
      </Stack>
    </div>
  ),
};

export const WrappingContent: Story = {
  args: {
    direction: "row",
    justify: "flex-start",
    align: "flex-start",
    wrap: "wrap",
    gap: 2,
  },
  render: args => (
    <div style={{ width: 300, border: "2px dashed #999", padding: "16px" }}>
      <Stack {...args}>
        <ItemBox>Item 1</ItemBox>
        <ItemBox>Item 2</ItemBox>
        <ItemBox>Item 3</ItemBox>
        <ItemBox>Item 4</ItemBox>
        <ItemBox>Item 5</ItemBox>
        <ItemBox>Item 6</ItemBox>
      </Stack>
    </div>
  ),
};

export const SpacingComparison: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", padding: "16px" }}>
      <div>
        <h3 style={{ margin: "0 0 16px 0" }}>Gap: 1 (--spacing-1)</h3>
        <div style={{ border: "2px dashed #999", padding: "16px" }}>
          <Stack direction="column" gap={1}>
            <ItemBox>Item 1</ItemBox>
            <ItemBox>Item 2</ItemBox>
            <ItemBox>Item 3</ItemBox>
          </Stack>
        </div>
      </div>
      <div>
        <h3 style={{ margin: "0 0 16px 0" }}>Gap: 6 (--spacing-6)</h3>
        <div style={{ border: "2px dashed #999", padding: "16px" }}>
          <Stack direction="column" gap={6}>
            <ItemBox>Item 1</ItemBox>
            <ItemBox>Item 2</ItemBox>
            <ItemBox>Item 3</ItemBox>
          </Stack>
        </div>
      </div>
    </div>
  ),
};

export const SpacingScale: Story = {
  render: () => {
    const spacingValues = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ];
    
    return (
      <div style={{ padding: "16px" }}>
        <h3 style={{ margin: "0 0 24px 0" }}>Spacing Scale Demonstration (0-8)</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {spacingValues.map(gapValue => (
            <div key={gapValue}>
              <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
                Gap: {gapValue} (--spacing-{gapValue})
              </h4>
              <div style={{ border: "1px dashed #ccc", padding: "12px", minHeight: "120px" }}>
                <Stack direction="column" gap={gapValue as any}>
                  <ItemBox style={{ padding: "8px", fontSize: "12px" }}>A</ItemBox>
                  <ItemBox style={{ padding: "8px", fontSize: "12px" }}>B</ItemBox>
                  <ItemBox style={{ padding: "8px", fontSize: "12px" }}>C</ItemBox>
                </Stack>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const AsSemanticElement: Story = {
  args: {
    as: "section",
    direction: "column",
    gap: 4,
  },
  render: args => (
    <div style={{ width: 400, border: "2px dashed #999", padding: "16px" }}>
      <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#666" }}>
        Rendered as: &lt;{args.as}&gt;
      </p>
      <Stack {...args}>
        <ItemBox as="article">Article 1</ItemBox>
        <ItemBox as="article">Article 2</ItemBox>
        <ItemBox as="article">Article 3</ItemBox>
      </Stack>
    </div>
  ),
};
