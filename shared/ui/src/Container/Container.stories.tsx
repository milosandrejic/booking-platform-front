import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

const meta = {
  title: "Layout/Container",
  component: Container,
  argTypes: {
    maxWidth: {
      control: { type: "select" },
      options: [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl"
      ],
    },
    fixed: { control: "boolean" },
    disableGutters: { control: "boolean" },
    spacing: {
      control: { type: "select" },
      options: ["compact", "default", "comfortable"],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxWidth: "md",
    spacing: "default",
    disableGutters: false
  },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>Container Content</div>
    </Container>
  ),
};

export const Fixed: Story = {
  args: {
    maxWidth: "md",
    spacing: "default",
    fixed: true,
    disableGutters: false,
  },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>Fixed width Container</div>
    </Container>
  ),
};

export const NoGutters: Story = {
  args: {
    maxWidth: "md",
    spacing: "default",
    disableGutters: true,
  },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>No gutters</div>
    </Container>
  ),
};

export const Compact: Story = {
  args: {
    maxWidth: "md",
    spacing: "compact",
    disableGutters: false,
  },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>Compact spacing</div>
    </Container>
  ),
};

export const Comfortable: Story = {
  args: {
    maxWidth: "md",
    spacing: "comfortable",
    disableGutters: false,
  },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>Comfortable spacing</div>
    </Container>
  ),
};

export const Wide: Story = {
  args: {
    maxWidth: "2xl",
    spacing: "default",
    disableGutters: false,
  },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>Wide (2xl) container</div>
    </Container>
  ),
};
