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
  args: { maxWidth: "md", spacing: "default" },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>Container Content</div>
    </Container>
  ),
};
