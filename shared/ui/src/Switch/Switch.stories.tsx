import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "UI Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
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
  },
  args: {
    size: "medium",
    color: "primary",
    checked: false,
    disabled: false,
    required: false,
    label: "Switch label",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Interactive: Story = {
  render: function InteractiveSwitch(args) {
    const [checked, setChecked] = useState(args.checked ?? false);

    return (
      <Switch
        {...args}
        checked={checked}
        onChange={newChecked => setChecked(newChecked)}
      />
    );
  },
  args: {
    label: "Toggle me",
  },
};

export const Sizes: Story = {
  render: function SizesSwitch(args) {
    const [selectedValue, setSelectedValue] = useState("medium");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Switch
          {...args}
          size="small"
          label="Small switch"
          checked={selectedValue === "small"}
          onChange={() => setSelectedValue("small")}
        />
        <Switch
          {...args}
          size="medium"
          label="Medium switch"
          checked={selectedValue === "medium"}
          onChange={() => setSelectedValue("medium")}
        />
        <Switch
          {...args}
          size="large"
          label="Large switch"
          checked={selectedValue === "large"}
          onChange={() => setSelectedValue("large")}
        />
      </div>
    );
  },
  args: {
    color: "primary",
  },
};

export const Colors: Story = {
  render: function ColorsSwitch(args) {
    const [selectedValue, setSelectedValue] = useState("primary");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Switch
          {...args}
          color="primary"
          label="Primary"
          checked={selectedValue === "primary"}
          onChange={() => setSelectedValue("primary")}
        />
        <Switch
          {...args}
          color="secondary"
          label="Secondary"
          checked={selectedValue === "secondary"}
          onChange={() => setSelectedValue("secondary")}
        />
        <Switch
          {...args}
          color="success"
          label="Success"
          checked={selectedValue === "success"}
          onChange={() => setSelectedValue("success")}
        />
        <Switch
          {...args}
          color="error"
          label="Error"
          checked={selectedValue === "error"}
          onChange={() => setSelectedValue("error")}
        />
        <Switch
          {...args}
          color="warning"
          label="Warning"
          checked={selectedValue === "warning"}
          onChange={() => setSelectedValue("warning")}
        />
        <Switch
          {...args}
          color="info"
          label="Info"
          checked={selectedValue === "info"}
          onChange={() => setSelectedValue("info")}
        />
      </div>
    );
  },
  args: {
    size: "medium",
  },
};

export const States: Story = {
  render: function StatesSwitch(args) {
    const [values, setValues] = useState({
      normal: false,
      checked: true,
      disabled: false,
      disabledChecked: true,
      required: false,
    });

    const updateValue = (key: string, value: boolean) => {
      setValues(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Switch
          {...args}
          label="Normal switch"
          checked={values.normal}
          onChange={checked => updateValue("normal", checked)}
        />
        <Switch
          {...args}
          label="Checked switch"
          checked={values.checked}
          onChange={checked => updateValue("checked", checked)}
        />
        <Switch
          {...args}
          label="Disabled switch"
          disabled={true}
          checked={values.disabled}
          onChange={checked => updateValue("disabled", checked)}
        />
        <Switch
          {...args}
          label="Disabled checked switch"
          disabled={true}
          checked={values.disabledChecked}
          onChange={checked => updateValue("disabledChecked", checked)}
        />
        <Switch
          {...args}
          label="Required switch"
          required={true}
          checked={values.required}
          onChange={checked => updateValue("required", checked)}
        />
      </div>
    );
  },
  args: {
    size: "medium",
    color: "primary",
  },
};

export const WithoutLabel: Story = {
  render: function WithoutLabelSwitch(args) {
    const [checked, setChecked] = useState(false);

    return (
      <Switch
        {...args}
        checked={checked}
        onChange={newChecked => setChecked(newChecked)}
      />
    );
  },
  args: {
    label: undefined,
  },
};
