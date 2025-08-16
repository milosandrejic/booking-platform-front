import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker } from "./DateRangePicker";
import type { DateRange } from "./DateRangePicker";
import dayjs from "dayjs";
import { useState } from "react";

const meta: Meta<typeof DateRangePicker> = {
  title: "UI Components/DateRangePicker",
  component: DateRangePicker,
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
    dateFormat: {
      control: { type: "text" },
    },
    separator: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
    fullWidth: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DateRangePickerWithState = (args: any) => {
  const [value, setValue] = useState<DateRange | null>(args.value || null);
  
  return (
    <DateRangePicker
      {...args}
      value={value}
      onChange={setValue}
      style={{ width: 300 }}
    />
  );
};

export const Default: Story = {
  render: DateRangePickerWithState,
  args: {
    label: "Select date range",
    placeholder: "Choose dates...",
  },
};

export const WithValue: Story = {
  render: DateRangePickerWithState,
  args: {
    label: "Booking period",
    value: {
      start: dayjs(),
      end: dayjs().add(7, "day"),
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <DateRangePickerWithState
        label="Outlined (default)"
        variant="outlined"
        placeholder="Select dates..."
      />
      <DateRangePickerWithState
        label="Filled"
        variant="filled"
        placeholder="Select dates..."
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <DateRangePickerWithState
        label="Small"
        size="small"
        placeholder="Select dates..."
      />
      <DateRangePickerWithState
        label="Medium (default)"
        size="medium"
        placeholder="Select dates..."
      />
      <DateRangePickerWithState
        label="Large"
        size="large"
        placeholder="Select dates..."
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <DateRangePickerWithState
        label="Normal"
        placeholder="Select dates..."
      />
      <DateRangePickerWithState
        label="Required"
        placeholder="Select dates..."
        required
      />
      <DateRangePickerWithState
        label="Disabled"
        placeholder="Select dates..."
        disabled
        value={{
          start: dayjs(),
          end: dayjs().add(3, "day"),
        }}
      />
      <DateRangePickerWithState
        label="Error state"
        placeholder="Select dates..."
        error
        helperText="Please select a valid date range"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: DateRangePickerWithState,
  args: {
    label: "Travel dates",
    placeholder: "When are you traveling?",
    helperText: "Select your check-in and check-out dates",
  },
};

export const CustomFormat: Story = {
  render: DateRangePickerWithState,
  args: {
    label: "Custom format",
    placeholder: "Select dates...",
    dateFormat: "MMM DD, YYYY",
    separator: " to ",
  },
};

export const FullWidth: Story = {
  render: DateRangePickerWithState,
  args: {
    label: "Full width",
    placeholder: "Select dates...",
    fullWidth: true,
  },
};
