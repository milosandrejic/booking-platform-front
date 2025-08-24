import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "./Radio";
import { useState } from "react";

const meta: Meta<typeof RadioGroup> = {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
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
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const RadioGroupWithState = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  
  return (
    <RadioGroup
      {...args}
      value={value}
      onChange={newValue => setValue(newValue.toString())}
    >
      <Radio 
        label="Option 1" 
        value="option1" 
      />
      <Radio 
        label="Option 2" 
        value="option2" 
      />
      <Radio 
        label="Option 3" 
        value="option3" 
      />
    </RadioGroup>
  );
};

export const Default: Story = {
  render: RadioGroupWithState,
  args: {},
};

export const WithDefaultValue: Story = {
  render: RadioGroupWithState,
  args: {
    value: "option2",
  },
};

export const Horizontal: Story = {
  render: RadioGroupWithState,
  args: {
    direction: "horizontal",
  },
};

export const Vertical: Story = {
  render: RadioGroupWithState,
  args: {
    direction: "vertical",
  },
};

const SizesExample = () => {
  const [value, setValue] = useState("medium");
  const handleChange = (newValue: string | number) => setValue(newValue.toString());

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "24px" 
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Small</h4>
        <RadioGroup
          value={value}
          onChange={handleChange}
          size="small"
        >
          <Radio 
            label="Small option 1" 
            value="small1" 
          />
          <Radio 
            label="Small option 2" 
            value="small2" 
          />
        </RadioGroup>
      </div>

      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Medium</h4>
        <RadioGroup
          value={value}
          onChange={handleChange}
          size="medium"
        >
          <Radio 
            label="Medium option 1" 
            value="medium" 
          />
          <Radio 
            label="Medium option 2" 
            value="medium2" 
          />
        </RadioGroup>
      </div>

      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Large</h4>
        <RadioGroup
          value={value}
          onChange={handleChange}
          size="large"
        >
          <Radio 
            label="Large option 1" 
            value="large1" 
          />
          <Radio 
            label="Large option 2" 
            value="large2" 
          />
        </RadioGroup>
      </div>
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesExample />,
};

const ColorsExample = () => {
  const [value, setValue] = useState("primary");
  const handleChange = (newValue: string | number) => setValue(newValue.toString());

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "24px" 
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Primary</h4>
        <RadioGroup
          value={value}
          onChange={handleChange}
          color="primary"
        >
          <Radio 
            label="Primary option" 
            value="primary" 
          />
          <Radio 
            label="Another option" 
            value="primary2" 
          />
        </RadioGroup>
      </div>

      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Success</h4>
        <RadioGroup
          value={value}
          onChange={handleChange}
          color="success"
        >
          <Radio 
            label="Success option" 
            value="success" 
          />
          <Radio 
            label="Another option" 
            value="success2" 
          />
        </RadioGroup>
      </div>

      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Error</h4>
        <RadioGroup
          value={value}
          onChange={handleChange}
          color="error"
        >
          <Radio 
            label="Error option" 
            value="error" 
          />
          <Radio 
            label="Another option" 
            value="error2" 
          />
        </RadioGroup>
      </div>
    </div>
  );
};

export const Colors: Story = {
  render: () => <ColorsExample />,
};

const StatesExample = () => {
  const [value, setValue] = useState("normal");
  const handleChange = (newValue: string | number) => setValue(newValue.toString());

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "24px" 
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Normal</h4>
        <RadioGroup
          value={value}
          onChange={handleChange}
        >
          <Radio 
            label="Normal option 1" 
            value="normal" 
          />
          <Radio 
            label="Normal option 2" 
            value="normal2" 
          />
        </RadioGroup>
      </div>

      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Disabled</h4>
        <RadioGroup
          value={value}
          onChange={handleChange}
          disabled
        >
          <Radio 
            label="Disabled option 1" 
            value="disabled1" 
          />
          <Radio 
            label="Disabled option 2" 
            value="disabled2" 
          />
        </RadioGroup>
      </div>

      <div>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Required</h4>
        <RadioGroup
          value={value}
          onChange={handleChange}
          required
        >
          <Radio 
            label="Required option 1" 
            value="required1" 
          />
          <Radio 
            label="Required option 2" 
            value="required2" 
          />
        </RadioGroup>
      </div>
    </div>
  );
};

export const States: Story = {
  render: () => <StatesExample />,
};

const InteractiveExample = () => {
  const [preference, setPreference] = useState("email");
  const [theme, setTheme] = useState("light");
  const [size, setSize] = useState("medium");
  
  const handlePreferenceChange = (value: string | number) => setPreference(value.toString());
  const handleThemeChange = (value: string | number) => setTheme(value.toString());
  const handleSizeChange = (value: string | number) => setSize(value.toString());

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "32px" 
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Notification Preference
        </h4>
        <RadioGroup
          value={preference}
          onChange={handlePreferenceChange}
          color="primary"
        >
          <Radio 
            label="Email notifications" 
            value="email" 
          />
          <Radio 
            label="Push notifications" 
            value="push" 
          />
          <Radio 
            label="SMS notifications" 
            value="sms" 
          />
          <Radio 
            label="No notifications" 
            value="none" 
          />
        </RadioGroup>
      </div>

      <div>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Theme Selection
        </h4>
        <RadioGroup
          value={theme}
          onChange={handleThemeChange}
          direction="horizontal"
          color="secondary"
        >
          <Radio 
            label="Light" 
            value="light" 
          />
          <Radio 
            label="Dark" 
            value="dark" 
          />
          <Radio 
            label="Auto" 
            value="auto" 
          />
        </RadioGroup>
      </div>

      <div>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Display Size
        </h4>
        <RadioGroup
          value={size}
          onChange={handleSizeChange}
          color="success"
          size="small"
        >
          <Radio 
            label="Small (compact view)" 
            value="small" 
          />
          <Radio 
            label="Medium (default)" 
            value="medium" 
          />
          <Radio 
            label="Large (comfortable)" 
            value="large" 
          />
        </RadioGroup>
      </div>

      <div 
        style={{ 
          padding: "16px", 
          background: "#f5f5f5", 
          borderRadius: "8px", 
          fontSize: "14px" 
        }}
      >
        <strong>Current Selection:</strong>
        <br />
        Notifications: {preference}
        <br />
        Theme: {theme}
        <br />
        Size: {size}
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveExample />,
};
