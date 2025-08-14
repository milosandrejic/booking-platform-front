import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "UI Components/Button",
  component: Button,
  argTypes: {
    variant: { control: { type: "select" }, options: ["filled", "outlined", "text"] },
    size: { control: { type: "select" }, options: ["small", "medium", "large"] },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Button", variant: "filled" },
};

export const Outlined: Story = {
  args: { children: "Outlined Button", variant: "outlined" },
};

export const Text: Story = {
  args: { children: "Text Button", variant: "text" },
};

export const Disabled: Story = {
  args: { children: "Disabled", variant: "filled", disabled: true },
};
