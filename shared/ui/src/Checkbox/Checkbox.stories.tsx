"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

/**
 * Checkbox component provides a styled checkbox input with multiple sizes and colors.
 * 
 * Features:
 * - Multiple sizes (small, medium, large)
 * - Multiple colors (primary, secondary, success, error, warning, info)
 * - Controlled and uncontrolled modes
 * - Disabled and error states
 * - Custom labels and helper text
 * - Accessibility support
 * - SSR compatible
 */
const meta: Meta<typeof Checkbox> = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A checkbox input component with multiple sizes, colors, and states for form interactions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Label text for the checkbox",
    },
    checked: {
      control: { type: "boolean" },
      description: "Whether the checkbox is checked",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    defaultChecked: {
      control: { type: "boolean" },
      description: "Whether the checkbox is checked by default (uncontrolled)",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size of the checkbox",
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
      description: "Color theme of the checkbox",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the checkbox is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the checkbox is required",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    name: {
      control: { type: "text" },
      description: "Name attribute for the checkbox input",
    },
    value: {
      control: { type: "text" },
      description: "Value attribute for the checkbox input",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the checkbox state changes",
      table: {
        type: { summary: "(checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultCheckbox(args) {
    const [checked, setChecked] = useState(args.defaultChecked || false);

    return (
      <Checkbox 
        {...args} 
        checked={checked}
        onChange={setChecked}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Default checkbox with primary color and medium size.",
      },
    },
  },
};

export const Playground: Story = {
  render: function PlaygroundCheckbox(args) {
    const [checked, setChecked] = useState(args.defaultChecked || false);

    return (
      <Checkbox 
        {...args} 
        checked={checked}
        onChange={setChecked}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all checkbox props and controls.",
      },
    },
  },
};

export const Interactive: Story = {
  render: function InteractiveCheckbox() {
    const [checked, setChecked] = useState(false);
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Checkbox
          label="Interactive checkbox"
          checked={checked}
          onChange={setChecked}
        />
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>
          Checked: {checked ? "Yes" : "No"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive checkbox demonstrating controlled state management.",
      },
    },
  },
};

export const WithSx: Story = {
  render: function WithSxCheckbox(args) {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox {...args} checked={checked} onChange={setChecked} sx={{ padding: 8, borderRadius: 8, background: "var(--color-background-subtle)" }} />
    );
  },
};

export const AllSizes: Story = {
  render: function AllSizesCheckbox() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Small</h4>
          <Checkbox size="small" label="Small checkbox" defaultChecked />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Medium (Default)</h4>
          <Checkbox size="medium" label="Medium checkbox" defaultChecked />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Large</h4>
          <Checkbox size="large" label="Large checkbox" defaultChecked />
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
  render: function AllColorsCheckbox() {
    const colors = [
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "info"
    ] as const;
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {colors.map(color => (
          <Checkbox
            key={color}
            color={color}
            label={`${color.charAt(0).toUpperCase() + color.slice(1)} checkbox`}
            defaultChecked
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available colors: primary, secondary, success, error, warning, and info.",
      },
    },
  },
};

export const AllStates: Story = {
  render: function AllStatesCheckbox() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Normal States</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Checkbox label="Unchecked checkbox" />
            <Checkbox label="Checked checkbox" defaultChecked />
            <Checkbox label="Checkbox with long label text that wraps to multiple lines to demonstrate how the component handles longer content" />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Disabled State</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Checkbox label="Disabled unchecked" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different checkbox states: normal, checked, disabled variations.",
      },
    },
  },
};

export const InForm: Story = {
  render: function InFormCheckbox() {
    const [formData, setFormData] = useState({
      newsletter: false,
      terms: false,
      marketing: false,
      notifications: false,
    });

    const [errors, setErrors] = useState({
      terms: false,
    });

    const handleCheckboxChange = (field: keyof typeof formData) => (checked: boolean) => {
      setFormData(prev => ({ ...prev, [field]: checked }));
      if (field === "terms") {
        setErrors(prev => ({ ...prev, terms: !checked }));
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newErrors = {
        terms: !formData.terms,
      };
      
      setErrors(newErrors);
      
      if (!Object.values(newErrors).some(Boolean)) {
        alert("Form submitted successfully!");
      }
    };

    return (
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 2rem 0" }}>Account Preferences</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <Checkbox
              label="Subscribe to newsletter for updates and news"
              checked={formData.newsletter}
              onChange={handleCheckboxChange("newsletter")}
              color="primary"
            />
            
            <Checkbox
              label="Accept terms and conditions *"
              checked={formData.terms}
              onChange={handleCheckboxChange("terms")}
              color={errors.terms ? "error" : "primary"}
            />
            {errors.terms && (
              <span style={{ fontSize: "0.75rem", color: "#d32f2f", marginTop: "-1rem" }}>
                You must accept the terms and conditions to continue
              </span>
            )}
            
            <Checkbox
              label="Receive marketing communications"
              checked={formData.marketing}
              onChange={handleCheckboxChange("marketing")}
              color="secondary"
            />
            
            <Checkbox
              label="Enable push notifications"
              checked={formData.notifications}
              onChange={handleCheckboxChange("notifications")}
              color="info"
            />
            
            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#e3f2fd", borderRadius: "4px" }}>
              <h5 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem" }}>Selected Options:</h5>
              <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.8rem" }}>
                <li>Newsletter: {formData.newsletter ? "Yes" : "No"}</li>
                <li>Terms: {formData.terms ? "Accepted" : "Not accepted"}</li>
                <li>Marketing: {formData.marketing ? "Yes" : "No"}</li>
                <li>Notifications: {formData.notifications ? "Yes" : "No"}</li>
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
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example of checkboxes in an account preferences form with validation and different colors.",
      },
    },
  },
};
