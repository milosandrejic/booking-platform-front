import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./Radio";
import { useState } from "react";

/**
 * Radio component provides a styled radio input for single-choice selection within a group.
 * 
 * Features:
 * - Multiple sizes (small, medium, large)
 * - Color variants (primary, secondary, success, error, warning, info)
 * - Controlled state management
 * - Label support with proper accessibility
 * - Disabled state
 * - Required field indication
 * - SSR compatible
 */
const meta: Meta<typeof Radio> = {
  title: "UI Components/Radio",
  component: Radio,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A radio input component for single-choice selection with multiple sizes, colors, and states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Label text for the radio button",
    },
    value: {
      control: { type: "text" },
      description: "Value of the radio button",
    },
    name: {
      control: { type: "text" },
      description: "Name attribute for grouping radio buttons",
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether the radio button is checked",
    },
    defaultChecked: {
      control: { type: "boolean" },
      description: "Default checked state for uncontrolled mode",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size of the radio button",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    color: {
      control: { type: "select" },
      options: [
        "primary", 
        "secondary", 
        "success", 
        "error", 
        "warning", 
        "info",
      ],
      description: "Color variant of the radio button",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the radio button is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the radio button is required (shows visual indicator)",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the radio state changes",
      table: {
        type: { summary: "(value: string | number, event: React.ChangeEvent<HTMLInputElement>) => void" },
      },
    },
  },
  args: {
    label: "Default radio button",
    value: "default",
    name: "radio-group",
    checked: false,
    size: "medium",
    color: "primary",
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultRadio(args) {
    return <Radio {...args} value={args.value || "default"} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Default radio button with primary color and medium size.",
      },
    },
  },
};

export const Playground: Story = {
  render: function PlaygroundRadio(args) {
    return <Radio {...args} value={args.value || "playground"} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all radio button props and controls.",
      },
    },
  },
};

export const Interactive: Story = {
  render: function InteractiveRadio() {
    const [selectedValue, setSelectedValue] = useState<string>("");
    
    const options = [
      { value: "option1", label: "First option" }, { value: "option2", label: "Second option" }, { value: "option3", label: "Third option" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Choose an option:</h4>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {options.map(option => (
            <Radio
              key={option.value}
              label={option.label}
              value={option.value}
              name="interactive-demo"
              checked={selectedValue === option.value}
              onChange={value => setSelectedValue(value.toString())}
            />
          ))}
        </div>
        
        <p style={{ margin: "1rem 0 0 0", color: "#666", fontSize: "0.875rem" }}>
          Selected: {selectedValue || "None"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive radio buttons demonstrating controlled state management within a group.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: function AllSizesRadio() {
    const [selectedValue, setSelectedValue] = useState<string>("medium");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <h4 style={{ marginBottom: "0.5rem" }}>Small</h4>
          <Radio
            size="small"
            label="Small radio button"
            value="small"
            name="size-demo"
            checked={selectedValue === "small"}
            onChange={value => setSelectedValue(value.toString())}
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "0.5rem" }}>Medium (Default)</h4>
          <Radio
            size="medium"
            label="Medium radio button"
            value="medium"
            name="size-demo"
            checked={selectedValue === "medium"}
            onChange={value => setSelectedValue(value.toString())}
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "0.5rem" }}>Large</h4>
          <Radio
            size="large"
            label="Large radio button"
            value="large"
            name="size-demo"
            checked={selectedValue === "large"}
            onChange={value => setSelectedValue(value.toString())}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available sizes: small, medium, and large.",
      },
    },
  },
};

export const AllColors: Story = {
  render: function AllColorsRadio() {
    const [selectedValue, setSelectedValue] = useState<string>("primary");
    
    const colors = [
      { value: "primary", label: "Primary" },
      { value: "secondary", label: "Secondary" },
      { value: "success", label: "Success" },
      { value: "error", label: "Error" },
      { value: "warning", label: "Warning" },
      { value: "info", label: "Info" },
    ] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {colors.map(({ value, label }) => (
          <Radio
            key={value}
            color={value}
            label={`${label} radio button`}
            value={value}
            name="color-demo"
            checked={selectedValue === value}
            onChange={value => setSelectedValue(value.toString())}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available color variants: primary, secondary, success, error, warning, and info.",
      },
    },
  },
};

export const AllStates: Story = {
  render: function AllStatesRadio() {
    const [selectedValue, setSelectedValue] = useState<string>("normal");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Normal States</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Radio 
              label="Unchecked" 
              value="unchecked" 
              name="normal-demo"
              checked={selectedValue === "unchecked"}
              onChange={value => setSelectedValue(value.toString())}
            />
            <Radio 
              label="Checked" 
              value="normal"
              name="normal-demo"
              checked={selectedValue === "normal"}
              onChange={value => setSelectedValue(value.toString())}
            />
            <Radio 
              label="Required radio button" 
              value="required"
              name="normal-demo"
              required
              checked={selectedValue === "required"}
              onChange={value => setSelectedValue(value.toString())}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Disabled States</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Radio label="Disabled unchecked" value="disabled1" name="disabled-demo" disabled />
            <Radio label="Disabled checked" value="disabled2" name="disabled-demo" disabled checked />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Without Labels</h4>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Radio value="no-label1" name="no-label-demo" />
            <Radio value="no-label2" name="no-label-demo" checked />
            <Radio value="no-label3" name="no-label-demo" disabled />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different radio button states: normal, disabled, required, and label variations.",
      },
    },
  },
};

export const InForm: Story = {
  render: function InFormRadio() {
    const [formData, setFormData] = useState({
      plan: "standard",
      payment: "monthly",
      delivery: "standard",
    });

    const handleChange = (field: keyof typeof formData) => (value: string | number) => {
      setFormData(prev => ({ ...prev, [field]: value.toString() }));
    };

    return (
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <form style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 2rem 0" }}>Subscription Options</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h4 style={{ margin: "0 0 1rem 0", fontSize: "1rem" }}>Choose a Plan</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Radio
                  label="Basic Plan - $9/month"
                  value="basic"
                  name="plan"
                  checked={formData.plan === "basic"}
                  onChange={handleChange("plan")}
                  color="primary"
                />
                <Radio
                  label="Standard Plan - $19/month"
                  value="standard"
                  name="plan"
                  checked={formData.plan === "standard"}
                  onChange={handleChange("plan")}
                  color="success"
                />
                <Radio
                  label="Premium Plan - $39/month"
                  value="premium"
                  name="plan"
                  checked={formData.plan === "premium"}
                  onChange={handleChange("plan")}
                  color="warning"
                />
              </div>
            </div>
            
            <div>
              <h4 style={{ margin: "0 0 1rem 0", fontSize: "1rem" }}>Billing Frequency</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Radio
                  label="Monthly billing"
                  value="monthly"
                  name="payment"
                  checked={formData.payment === "monthly"}
                  onChange={handleChange("payment")}
                />
                <Radio
                  label="Annual billing (10% discount)"
                  value="annual"
                  name="payment"
                  checked={formData.payment === "annual"}
                  onChange={handleChange("payment")}
                  color="success"
                />
              </div>
            </div>
            
            <div>
              <h4 style={{ margin: "0 0 1rem 0", fontSize: "1rem" }}>Delivery Method</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Radio
                  label="Standard delivery (5-7 days)"
                  value="standard"
                  name="delivery"
                  checked={formData.delivery === "standard"}
                  onChange={handleChange("delivery")}
                />
                <Radio
                  label="Express delivery (1-2 days) - $5 extra"
                  value="express"
                  name="delivery"
                  checked={formData.delivery === "express"}
                  onChange={handleChange("delivery")}
                  color="info"
                />
                <Radio
                  label="Overnight delivery - $15 extra"
                  value="overnight"
                  name="delivery"
                  checked={formData.delivery === "overnight"}
                  onChange={handleChange("delivery")}
                  color="error"
                />
              </div>
            </div>
            
            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#e3f2fd", borderRadius: "4px" }}>
              <h5 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem" }}>Summary:</h5>
              <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.8rem" }}>
                <li>Plan: {formData.plan}</li>
                <li>Billing: {formData.payment}</li>
                <li>Delivery: {formData.delivery}</li>
              </ul>
            </div>
            
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#1976d2",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem",
                marginTop: "1rem",
              }}
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example of radio buttons in a subscription form with multiple sections and visual feedback.",
      },
    },
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
