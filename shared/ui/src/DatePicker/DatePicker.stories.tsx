import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import { DatePicker } from "./DatePicker";

const meta = {
  title: "UI Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    value: {
      control: { type: "date" },
    },
    defaultValue: {
      control: { type: "date" },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Select Date",
    placeholder: "MM/DD/YYYY",
  },
};

export const WithValue: Story = {
  args: {
    label: "Birth Date",
    value: dayjs("2024-01-15"),
  },
};

export const ModernFeatures: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: 320 }}>
      <DatePicker
        label="Basic Date Picker"
        placeholder="MM/DD/YYYY"
      />
      <DatePicker
        label="Custom Format"
        placeholder="DD/MM/YYYY"
        dateFormat="DD/MM/YYYY"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: 320 }}>
      <DatePicker
        label="Outlined (Default)"
        variant="outlined"
        placeholder="MM/DD/YYYY"
      />
      <DatePicker
        label="Filled"
        variant="filled"
        placeholder="MM/DD/YYYY"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <DatePicker
        label="Small"
        size="small"
        placeholder="MM/dd/yyyy"
      />
      <DatePicker
        label="Medium (Default)"
        size="medium"
        placeholder="MM/dd/yyyy"
      />
      <DatePicker
        label="Large"
        size="large"
        placeholder="MM/dd/yyyy"
      />
    </div>
  ),
};

export const WithConstraints: Story = {
  args: {
    label: "Event Date",
    placeholder: "MM/DD/YYYY",
    helperText: "Please select a date",
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: 320 }}>
      <DatePicker
        label="Normal"
        placeholder="MM/DD/YYYY"
      />
      <DatePicker
        label="Required"
        placeholder="MM/DD/YYYY"
        required
      />
      <DatePicker
        label="Error"
        placeholder="MM/DD/YYYY"
        error
        helperText="This field is required"
      />
      <DatePicker
        label="Disabled"
        placeholder="MM/DD/YYYY"
        disabled
        value={dayjs("2024-01-15")}
      />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    label: "Full Width Date Picker",
    placeholder: "MM/DD/YYYY",
    fullWidth: true,
    helperText: "This date picker takes the full width of its container",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Event Date",
    placeholder: "MM/DD/YYYY",
    helperText: "Select the date for your event",
  },
};
