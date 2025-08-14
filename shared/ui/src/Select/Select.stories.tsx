import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta = {
  title: "UI Components/Select",
  component: Select,
  args: {
    options: [{ label: "Apple", value: "apple" }, { label: "Banana", value: "banana" }, { label: "Cherry", value: "cherry" }],
    placeholder: "Pick fruits…",
    size: "medium",
    multiple: false,
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  argTypes: {
    size: { control: { type: "select" }, options: ["small", "medium", "large"] },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <div style={{ width: 320 }}>
      <Select {...args} />
    </div>
  ),
};

export const Multiple: Story = {
  args: { multiple: true },
  render: args => (
    <div style={{ width: 320 }}>
      <Select {...args} />
    </div>
  ),
};

export const SizeVariants: Story = {
  render: args => (
    <div style={{ display: "grid", gap: 12, width: 320 }}>
      <Select {...args} size="small" placeholder="Small" />
      <Select {...args} size="medium" placeholder="Medium" />
      <Select {...args} size="large" placeholder="Large" />
    </div>
  ),
};
