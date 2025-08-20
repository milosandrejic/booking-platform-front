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

export const WithShouldDisableDate: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <DateRangePickerWithState
        label="Disable weekends"
        placeholder="Weekdays only..."
        shouldDisableDate={(date: any) => {
          const dayOfWeek = date.day();
          return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
        }}
        helperText="Weekends are disabled"
      />
      <DateRangePickerWithState
        label="Disable past dates"
        placeholder="Future dates only..."
        shouldDisableDate={(date: any) => date.isBefore(dayjs(), "day")}
        helperText="Past dates are disabled"
      />
      <DateRangePickerWithState
        label="Disable holidays (example)"
        placeholder="No holidays..."
        shouldDisableDate={(date: any) => {
          // Example: disable Christmas and New Year
          const dateStr = date.format("MM-DD");
          return dateStr === "12-25" || dateStr === "01-01";
        }}
        helperText="Christmas and New Year are disabled"
      />
    </div>
  ),
};

export const WithMaxSelectedRange: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <DateRangePickerWithState
        label="Max 3 days"
        placeholder="Select up to 3 days..."
        maxSelectedRange={3}
        helperText="Maximum 3 days can be selected"
      />
      <DateRangePickerWithState
        label="Max 7 days"
        placeholder="Select up to 7 days..."
        maxSelectedRange={7}
        helperText="Maximum 7 days can be selected"
      />
      <DateRangePickerWithState
        label="Max 14 days"
        placeholder="Select up to 14 days..."
        maxSelectedRange={14}
        helperText="Maximum 14 days can be selected"
      />
    </div>
  ),
};

export const CombinedRestrictions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <DateRangePickerWithState
        label="Weekdays only, max 5 days"
        placeholder="Business trip dates..."
        shouldDisableDate={(date: any) => {
          const dayOfWeek = date.day();
          return dayOfWeek === 0 || dayOfWeek === 6; // Disable weekends
        }}
        maxSelectedRange={5}
        helperText="Weekdays only, maximum 5 days"
      />
      <DateRangePickerWithState
        label="Future dates, max 30 days"
        placeholder="Vacation dates..."
        shouldDisableDate={(date: any) => date.isBefore(dayjs(), "day")}
        maxSelectedRange={30}
        helperText="Future dates only, maximum 30 days"
      />
    </div>
  ),
};
