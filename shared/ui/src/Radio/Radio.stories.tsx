import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";
import { useState } from "react";

const meta: Meta<typeof Radio> = {
  title: "UI Components/Radio",
  component: Radio,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    color: {
      control: { type: "select" },
      options: [
        "primary", 
        "secondary", 
        "success", 
        "error", 
        "warning", 
        "info"
      ],
    },
    checked: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
    value: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const RadioWithState = (args: any) => {
  const [selectedValue, setSelectedValue] = useState(args.checked ? args.value : "");
  
  return (
    <Radio
      {...args}
      checked={selectedValue === args.value}
      onChange={value => setSelectedValue(value.toString())}
    />
  );
};

export const Default: Story = {
  render: RadioWithState,
  args: {
    label: "Default radio",
    value: "default",
  },
};

export const Checked: Story = {
  render: RadioWithState,
  args: {
    label: "Checked radio",
    value: "checked",
    checked: true,
  },
};

export const WithoutLabel: Story = {
  render: RadioWithState,
  args: {
    value: "no-label",
  },
};

const SizesExample = () => {
  const [selectedValue, setSelectedValue] = useState("medium");

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px" 
      }}
    >
      <Radio
        label="Small radio"
        value="small"
        size="small"
        checked={selectedValue === "small"}
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Medium radio"
        value="medium"
        size="medium"
        checked={selectedValue === "medium"}
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Large radio"
        value="large"
        size="large"
        checked={selectedValue === "large"}
        onChange={value => setSelectedValue(value.toString())}
      />
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesExample />,
};

const ColorsExample = () => {
  const [selectedValue, setSelectedValue] = useState("primary");

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px" 
      }}
    >
      <Radio
        label="Primary"
        value="primary"
        color="primary"
        checked={selectedValue === "primary"}
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Secondary"
        value="secondary"
        color="secondary"
        checked={selectedValue === "secondary"}
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Success"
        value="success"
        color="success"
        checked={selectedValue === "success"}
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Error"
        value="error"
        color="error"
        checked={selectedValue === "error"}
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Warning"
        value="warning"
        color="warning"
        checked={selectedValue === "warning"}
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Info"
        value="info"
        color="info"
        checked={selectedValue === "info"}
        onChange={value => setSelectedValue(value.toString())}
      />
    </div>
  );
};

export const Colors: Story = {
  render: () => <ColorsExample />,
};

const StatesExample = () => {
  const [selectedValue, setSelectedValue] = useState("normal");

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px" 
      }}
    >
      <Radio
        label="Normal"
        value="normal"
        checked={selectedValue === "normal"}
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Checked"
        value="checked"
        checked={selectedValue === "checked"}
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Disabled"
        value="disabled"
        disabled
        checked={false}
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Disabled checked"
        value="disabled-checked"
        disabled
        checked
        onChange={value => setSelectedValue(value.toString())}
      />
      <Radio
        label="Required"
        value="required"
        required
        checked={selectedValue === "required"}
        onChange={value => setSelectedValue(value.toString())}
      />
    </div>
  );
};

export const States: Story = {
  render: () => <StatesExample />,
};
