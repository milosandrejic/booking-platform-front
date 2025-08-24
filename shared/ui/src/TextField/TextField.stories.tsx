"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TextField } from "./TextField";

/**
 * TextField component provides a styled input field with various customization options.
 * 
 * Features:
 * - Multiple variants (outlined, filled)
 * - Size options (small, medium, large)
 * - Input types (text, password, email, etc.)
 * - Error states with validation
 * - Helper text support
 * - Full width and responsive options
 * - SSR compatible
 */
const meta = {
  title: "UI Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile text input component with multiple variants, sizes, and states for form building.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { 
      control: { type: "select" }, 
      options: ["outlined", "filled"],
      description: "Visual style variant of the text field",
      table: {
        defaultValue: { summary: "outlined" },
      },
    },
    size: { 
      control: { type: "select" }, 
      options: ["small", "medium", "large"],
      description: "Size of the text field",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    type: { 
      control: { type: "select" }, 
      options: ["text", "password"],
      description: "HTML input type",
      table: {
        defaultValue: { summary: "text" },
      },
    },
    label: {
      control: { type: "text" },
      description: "Label text for the input field",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text when input is empty",
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text displayed below the input",
    },
    disabled: { 
      control: "boolean",
      description: "Whether the input is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    error: { 
      control: "boolean",
      description: "Whether the input is in error state",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    required: { 
      control: "boolean",
      description: "Whether the input is required",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: { 
      control: "boolean",
      description: "Whether the input takes full width of container",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    value: {
      control: { type: "text" },
      description: "Controlled value of the input",
    },
    defaultValue: {
      control: { type: "text" },
      description: "Default value for uncontrolled input",
    },
  },
  args: {
    label: "Default TextField",
    placeholder: "Enter text here",
    helperText: "This is a helper text",
    variant: "outlined",
    size: "medium",
    type: "text",
    disabled: false,
    error: false,
    required: false,
    fullWidth: false,
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultTextField(args) {
    const [value, setValue] = useState(args.defaultValue || "");

    return (
      <TextField 
        {...args} 
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Default text field with outlined variant and medium size.",
      },
    },
  },
};

export const Playground: Story = {
  render: function PlaygroundTextField(args) {
    const [value, setValue] = useState(args.defaultValue || "");

    return (
      <TextField 
        {...args} 
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all text field props and controls.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: function AllVariantsTextField() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "300px" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Outlined (Default)</h4>
          <TextField
            variant="outlined"
            label="Outlined TextField"
            placeholder="Enter text here"
            helperText="Helper text for outlined variant"
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Filled</h4>
          <TextField
            variant="filled"
            label="Filled TextField"
            placeholder="Enter text here"
            helperText="Helper text for filled variant"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available variants: outlined and filled.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: function AllSizesTextField() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "300px" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Small</h4>
          <TextField
            size="small"
            label="Small TextField"
            placeholder="Small size"
            helperText="Small size helper text"
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Medium (Default)</h4>
          <TextField
            size="medium"
            label="Medium TextField"
            placeholder="Medium size"
            helperText="Medium size helper text"
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Large</h4>
          <TextField
            size="large"
            label="Large TextField"
            placeholder="Large size"
            helperText="Large size helper text"
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

export const AllTypes: Story = {
  render: function AllTypesTextField() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "300px" }}>
        <TextField
          type="text"
          label="Text Input"
          placeholder="Enter text"
          helperText="Standard text input"
        />
        
        <TextField
          type="password"
          label="Password"
          placeholder="Enter password"
          helperText="Password input (hidden text)"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different input types: text and password.",
      },
    },
  },
};

export const AllStates: Story = {
  render: function AllStatesTextField() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "300px" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Normal State</h4>
          <TextField
            label="Normal TextField"
            placeholder="Enter text here"
            helperText="This is normal state"
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Required</h4>
          <TextField
            label="Required TextField"
            placeholder="This field is required"
            helperText="Required field indicator"
            required
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Error State</h4>
          <TextField
            label="Error TextField"
            placeholder="Enter text here"
            helperText="This field has an error"
            error
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Disabled</h4>
          <TextField
            label="Disabled TextField"
            placeholder="This field is disabled"
            helperText="Disabled state"
            disabled
            defaultValue="Disabled value"
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Full Width</h4>
          <TextField
            label="Full Width TextField"
            placeholder="Full width input"
            helperText="Takes full width of container"
            fullWidth
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different states: normal, required, error, disabled, and full width.",
      },
    },
  },
};

export const InForm: Story = {
  render: function InFormTextField() {
    return (
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <form style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 1.5rem 0", textAlign: "center" }}>User Registration</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <TextField
                label="First Name"
                placeholder="John"
                required
                fullWidth
              />
              <TextField
                label="Last Name"
                placeholder="Doe"
                required
                fullWidth
              />
            </div>
            
            <TextField
              label="Email Address"
              placeholder="john.doe@example.com"
              helperText="We'll never share your email"
              required
              fullWidth
            />
            
            <TextField
              type="password"
              label="Password"
              placeholder="Enter a strong password"
              helperText="At least 8 characters with numbers and symbols"
              required
              fullWidth
            />
            
            <TextField
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              fullWidth
            />
            
            <TextField
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              helperText="Optional - for account recovery"
              fullWidth
            />
            
            <TextField
              label="Company (Optional)"
              placeholder="Acme Corp"
              fullWidth
            />
            
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <button
                type="button"
                style={{
                  padding: "0.75rem 1.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Cancel
              </button>
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
                }}
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example of text fields in a user registration form with various types and validation.",
      },
    },
  },
};
