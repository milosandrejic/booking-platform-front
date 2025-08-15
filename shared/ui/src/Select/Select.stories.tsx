import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { SelectValue } from "./Select";
import { Select, SelectOption } from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI Components/Select",
  component: Select,
  argTypes: {
    size: { control: { type: "select" }, options: ["small", "medium", "large"] },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Pick fruits…",
    size: "medium",
    multiple: false,
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  render: args => (
    <div style={{ width: 320 }}>
      <Select {...args}>
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="banana">Banana</SelectOption>
        <SelectOption value="cherry">Cherry</SelectOption>
      </Select>
    </div>
  ),
};

export const NoInitialSelection: Story = {
  args: {
    placeholder: "Select an option…",
    size: "medium",
    multiple: false,
    disabled: false,
    loading: false,
    fullWidth: false,
    // No value prop - component starts with no selection
  },
  render: args => (
    <div style={{ width: 320 }}>
      <Select {...args}>
        <SelectOption value="option1">Option 1</SelectOption>
        <SelectOption value="option2">Option 2</SelectOption>
        <SelectOption value="option3">Option 3</SelectOption>
        <SelectOption value="option4">Option 4</SelectOption>
      </Select>
    </div>
  ),
};

export const ControlledNoInitialSelection: Story = {
  render: function ControlledComponent() {
    const [selectedValue, setSelectedValue] = useState<string>("");
    
    return (
      <div style={{ width: 320 }}>
        <p style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          Selected value: {selectedValue === "" ? "\"\" (empty string)" : `"${selectedValue}"`}
        </p>
        <Select 
          placeholder="Choose a category…"
          size="medium"
          value={selectedValue}
          onChange={value => setSelectedValue(value as string)}
        >
          <SelectOption value="frontend">Frontend Development</SelectOption>
          <SelectOption value="backend">Backend Development</SelectOption>
          <SelectOption value="design">UI/UX Design</SelectOption>
          <SelectOption value="devops">DevOps</SelectOption>
        </Select>
        <button 
          style={{ 
            marginTop: "16px", 
            padding: "8px 16px", 
            border: "1px solid #ccc", 
            borderRadius: "4px",
            background: "#f5f5f5",
            cursor: "pointer"
          }}
          onClick={() => setSelectedValue("")}
        >
          Reset to empty string
        </button>
      </div>
    );
  },
};

export const Multiple: Story = {
  args: {
    placeholder: "Pick fruits…",
    multiple: true,
    size: "medium",
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  render: args => (
    <div style={{ width: 320 }}>
      <Select {...args}>
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="banana">Banana</SelectOption>
        <SelectOption value="cherry">Cherry</SelectOption>
        <SelectOption value="date">Date</SelectOption>
        <SelectOption value="elderberry">Elderberry</SelectOption>
      </Select>
    </div>
  ),
};

export const SizeVariants: Story = {
  args: {
    placeholder: "Select option",
    size: "medium",
    multiple: false,
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  render: args => (
    <div style={{ display: "grid", gap: 12, width: 320 }}>
      <Select {...args} size="small" placeholder="Small">
        <SelectOption value="option1">Option 1</SelectOption>
        <SelectOption value="option2">Option 2</SelectOption>
      </Select>
      <Select {...args} size="medium" placeholder="Medium">
        <SelectOption value="option1">Option 1</SelectOption>
        <SelectOption value="option2">Option 2</SelectOption>
      </Select>
      <Select {...args} size="large" placeholder="Large">
        <SelectOption value="option1">Option 1</SelectOption>
        <SelectOption value="option2">Option 2</SelectOption>
      </Select>
    </div>
  ),
};

export const WithObjectValues: Story = {
  args: {
    placeholder: "Select a user",
    size: "medium",
    multiple: false,
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  render: args => (
    <div style={{ width: 320 }}>
      <Select {...args}>
        <SelectOption value={{ id: 1, name: "John Doe", email: "john@example.com" }}>
          John Doe
        </SelectOption>
        <SelectOption value={{ id: 2, name: "Jane Smith", email: "jane@example.com" }}>
          Jane Smith
        </SelectOption>
        <SelectOption value={{ id: 3, name: "Bob Johnson", email: "bob@example.com" }}>
          Bob Johnson
        </SelectOption>
      </Select>
    </div>
  ),
};

export const WithCustomComparator: Story = {
  render: () => {
    const user1 = { id: 1, name: "John Doe", email: "john@example.com" };
    const user2 = { id: 2, name: "Jane Smith", email: "jane@different.com" };
    const user3 = { id: 3, name: "Bob Johnson", email: "bob@example.com" };

    const customCompareValue = (a: any, b: any) => {
      // Compare objects by ID only
      if (typeof a === "object" && typeof b === "object" && a?.id && b?.id) {
        return a.id === b.id;
      }
      return a === b;
    };

    let selectedValue: SelectValue = user1;

    return (
      <div style={{ width: 320 }}>
        <Select 
          placeholder="Select a user (compare by ID only)"
          size="medium"
          value={selectedValue}
          compareValue={customCompareValue}
          onChange={(value) => {
            selectedValue = value;
          }}
        >
          <SelectOption value={selectedValue}>
            John Doe
          </SelectOption>
          <SelectOption value={user2}>
            Jane Smith (Different Email)
          </SelectOption>
          <SelectOption value={user3}>
            Bob Johnson
          </SelectOption>
        </Select>
      </div>
    );
  },
};
