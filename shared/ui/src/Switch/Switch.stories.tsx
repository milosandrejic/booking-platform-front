"use client";

"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "./Switch";

/**
 * Switch component allows users to toggle between two states (on/off, enabled/disabled, etc.).
 * 
 * Features:
 * - Multiple sizes (small, medium, large)
 * - Multiple colors (primary, secondary, success, error, warning, info)
 * - Controlled and uncontrolled modes
 * - Disabled state
 * - Required state
 * - Accessible with proper ARIA attributes
 */
const meta = {
  title: "UI Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A toggle switch component that allows users to switch between two states (on/off, enabled/disabled, etc.).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size variant of the switch",
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
        "info"
      ],
      description: "Color theme of the switch",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether the switch is checked",
    },
    defaultChecked: {
      control: { type: "boolean" },
      description: "Default checked state for uncontrolled usage",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the switch is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the switch is required",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: { type: "text" },
      description: "Label text for the switch",
    },
    name: {
      control: { type: "text" },
      description: "Name attribute for form handling",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the switch state changes",
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage - show both controlled and uncontrolled
export const Default: Story = {
  render: function DefaultSwitch(args) {
    const [checked, setChecked] = useState(args.defaultChecked || false);

    return (
      <Switch 
        {...args} 
        checked={checked}
        onChange={setChecked}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Default switch with basic configuration.",
      },
    },
  },
};

export const Playground: Story = {
  render: function PlaygroundSwitch(args) {
    const [checked, setChecked] = useState(args.defaultChecked || false);

    return (
      <Switch 
        {...args} 
        checked={checked}
        onChange={setChecked}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all switch props and controls.",
      },
    },
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultChecked: true,
    checked: undefined,
    onChange: undefined,
    label: "Uncontrolled switch (defaultChecked: true)",
  },
  parameters: {
    docs: {
      description: {
        story: "Uncontrolled switch using defaultChecked prop.",
      },
    },
  },
};

export const Interactive: Story = {
  render: function InteractiveSwitch(args) {
    const [checked, setChecked] = useState(args.checked ?? false);

    return (
      <Switch
        {...args}
        checked={checked}
        onChange={setChecked}
      />
    );
  },
  args: {
    label: "Toggle me",
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive switch that you can toggle. This shows controlled usage with state management.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: function AllSizesSwitch(args) {
    const [checkedStates, setCheckedStates] = useState({
      small: false,
      medium: true,
      large: false,
    });

    const handleChange = (size: keyof typeof checkedStates) => (checked: boolean) => {
      setCheckedStates(prev => ({ ...prev, [size]: checked }));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Switch
          {...args}
          size="small"
          label="Small switch"
          checked={checkedStates.small}
          onChange={handleChange("small")}
        />
        <Switch
          {...args}
          size="medium"
          label="Medium switch"
          checked={checkedStates.medium}
          onChange={handleChange("medium")}
        />
        <Switch
          {...args}
          size="large"
          label="Large switch"
          checked={checkedStates.large}
          onChange={handleChange("large")}
        />
      </div>
    );
  },
  args: {
    color: "primary",
  },
  parameters: {
    docs: {
      description: {
        story: "All available size variants: small, medium, and large.",
      },
    },
  },
};

export const AllColors: Story = {
  render: function AllColorsSwitch(args) {
    const colors = [
      "primary", 
      "secondary", 
      "success", 
      "error", 
      "warning", 
      "info"
    ] as const;
    const [checkedStates, setCheckedStates] = useState(
      Object.fromEntries(colors.map((color, index) => [color, index % 2 === 0]))
    );

    const handleChange = (color: string) => (checked: boolean) => {
      setCheckedStates(prev => ({ ...prev, [color]: checked }));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {
          colors.map(color => (
            <Switch
              key={color}
              {...args}
              color={color}
              label={`${color.charAt(0).toUpperCase() + color.slice(1)} switch`}
              checked={checkedStates[color]}
              onChange={handleChange(color)}
            />
          ))
        }
      </div>
    );
  },
  args: {
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story: "All available color variants with different checked states to show the color differences.",
      },
    },
  },
};

export const AllStates: Story = {
  render: function AllStatesSwitch(args) {
    const [interactiveValues, setInteractiveValues] = useState({
      normal: false,
      checked: true,
      required: false,
    });

    const updateValue = (key: keyof typeof interactiveValues) => (value: boolean) => {
      setInteractiveValues(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Switch
          {...args}
          label="Normal switch"
          checked={interactiveValues.normal}
          onChange={updateValue("normal")}
        />
        <Switch
          {...args}
          label="Checked switch"
          checked={interactiveValues.checked}
          onChange={updateValue("checked")}
        />
        <Switch
          {...args}
          label="Required switch *"
          required={true}
          checked={interactiveValues.required}
          onChange={updateValue("required")}
        />
        <Switch
          {...args}
          label="Disabled unchecked"
          disabled={true}
          checked={false}
        />
        <Switch
          {...args}
          label="Disabled checked"
          disabled={true}
          checked={true}
        />
      </div>
    );
  },
  args: {
    size: "medium",
    color: "primary",
  },
  parameters: {
    docs: {
      description: {
        story: "Different states: normal, checked, required, and disabled (both checked and unchecked).",
      },
    },
  },
};

export const WithoutLabel: Story = {
  render: function WithoutLabelSwitch(args) {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Switch
          {...args}
          checked={checked}
          onChange={setChecked}
        />
        <span style={{ fontSize: "0.875rem", color: "#666" }}>
          Switch without label (checked: {checked.toString()})
        </span>
      </div>
    );
  },
  args: {
    label: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "Switch without a label. Useful when the switch is part of a larger component or when the context provides sufficient labeling.",
      },
    },
  },
};

// Form usage example
export const InForm: Story = {
  render: function InFormSwitch(args) {
    const [formData, setFormData] = useState({
      notifications: true,
      marketing: false,
      analytics: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Form submitted with: ${JSON.stringify(formData, null, 2)}`);
    };

    return (
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "1rem",
          padding: "1rem",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          maxWidth: "300px",
        }}
      >
        <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>Settings</h3>
        
        <Switch
          {...args}
          name="notifications"
          label="Enable notifications"
          checked={formData.notifications}
          onChange={checked => setFormData(prev => ({ ...prev, notifications: checked }))}
        />
        
        <Switch
          {...args}
          name="marketing"
          label="Marketing emails"
          checked={formData.marketing}
          onChange={checked => setFormData(prev => ({ ...prev, marketing: checked }))}
        />
        
        <Switch
          {...args}
          name="analytics"
          label="Analytics tracking"
          required
          checked={formData.analytics}
          onChange={checked => setFormData(prev => ({ ...prev, analytics: checked }))}
        />
        
        <button 
          type="submit" 
          style={{ 
            marginTop: "0.5rem", 
            padding: "0.5rem 1rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </form>
    );
  },
  args: {
    size: "medium",
    color: "primary",
  },
  parameters: {
    docs: {
      description: {
        story: "Example of using switches in a form context with proper naming and state management.",
      },
    },
  },
};
