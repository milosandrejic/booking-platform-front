import { Select } from "./Select.jsx";

export default {
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
};

export const Default = {
  render: args => (
    <div style={{ width: 320 }}>
      <Select {...args} />
    </div>
  ),
};

export const Multiple = {
  args: {
    multiple: true,
  },
  render: args => (
    <div style={{ width: 320 }}>
      <Select {...args} />
    </div>
  ),
};

export const SizeVariants = {
  render: args => (
    <div style={{ display: "grid", gap: 12, width: 320 }}>
      <Select {...args} size="small" placeholder="Small" />
      <Select {...args} size="medium" placeholder="Medium" />
      <Select {...args} size="large" placeholder="Large" />
    </div>
  ),
};
