import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta = {
  title: "UI Components/TextField",
  component: TextField,
  argTypes: {
    variant: { control: { type: "select" }, options: ["outlined", "filled"] },
    size: { control: { type: "select" }, options: ["small", "medium", "large"] },
    type: { control: { type: "select" }, options: ["text", "password"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default TextField",
    placeholder: "Enter text here",
    fullWidth: false,
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    label: "Filled TextField",
    placeholder: "Enter text here",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Outlined TextField",
    placeholder: "Enter text here",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    label: "Password",
    placeholder: "Enter password",
  },
};

export const WithError: Story = {
  args: {
    label: "TextField with Error",
    placeholder: "Enter text here",
    error: true,
    helperText: "This field has an error",
  },
};
