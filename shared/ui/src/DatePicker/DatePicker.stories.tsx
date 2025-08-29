"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "./DatePicker";
import { useState } from "react";

/**
 * DatePicker component provides a styled date input with calendar dropdown.
 * 
 * Features:
 * - Multiple variants (outlined, filled)
 * - Multiple sizes (small, medium, large)
 * - Controlled and uncontrolled modes
 * - Date validation and constraints
 * - Keyboard navigation
 * - Accessibility support
 * - SSR compatible
 */
const meta: Meta<typeof DatePicker> = {
  title: "Pickers/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A date picker component with calendar dropdown for selecting dates with validation and formatting options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Label text for the date picker",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text when no date is selected",
    },
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled"],
      description: "Visual variant of the date picker",
      table: {
        defaultValue: { summary: "outlined" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size of the date picker",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the date picker is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the date picker is required",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    error: {
      control: { type: "boolean" },
      description: "Whether the date picker has an error state",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether the date picker takes full width",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text displayed below the input",
    },
    name: {
      control: { type: "text" },
      description: "Name attribute for the input",
    },
    dateFormat: {
      control: { type: "text" },
      description: "Date format string",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the date changes",
      table: {
        type: { summary: "(date: Date | null) => void" },
      },
    },
  },
  args: {
    label: "Select date",
    placeholder: "Choose a date...",
    variant: "outlined",
    size: "medium",
    disabled: false,
    required: false,
    error: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultDatePicker(args) {
    const [value, setValue] = useState<Date | undefined>(args.defaultValue || undefined);

    return (
      <div style={{ width: 300 }}>
        <DatePicker 
          {...args} 
          value={value}
          onChange={newValue => setValue(newValue || undefined)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Default date picker with outlined variant and medium size.",
      },
    },
  },
};

export const Playground: Story = {
  render: function PlaygroundDatePicker(args) {
    const [value, setValue] = useState<Date | undefined>(args.defaultValue || undefined);

    return (
      <div style={{ width: args.fullWidth ? "100%" : 350 }}>
        <DatePicker 
          {...args} 
          value={value}
          onChange={newValue => setValue(newValue || undefined)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all date picker props and controls.",
      },
    },
  },
};

export const WithSx: Story = {
  render: function WithSxDatePicker(args) {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "400px" }}>
        <DatePicker
          {...args}
          label="Mixed sx properties"
          value={value}
          onChange={d => setValue(d || undefined)}
          sx={{ 
            border: t => `1px solid ${t.color.primary.main}`, 
            borderRadius: "8px", 
            padding: t => t.spacing[2],
            "&:hover": {
              boxShadow: t => t.shadows.md,
              borderColor: t => t.color.primary.dark,
            }
          }}
        />
        <DatePicker
          {...args}
          label="Theme functions"
          variant="filled"
          sx={{
            backgroundColor: t => t.color.background.subtle,
            borderRadius: t => t.borderRadius.lg,
            padding: "12px",
            "&:focus-within": {
              backgroundColor: t => t.color.primary.light,
              transform: "scale(1.02)",
            }
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "New sx system: each property can be a function (receives theme) or direct value, with pseudo-selectors."
      }
    }
  },
};

export const Interactive: Story = {
  render: function InteractiveDatePicker() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    
    const formatDate = (date: Date | null) => {
      if (!date) {
        return "None";
      }
      return date.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      });
    };
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ width: 300 }}>
          <DatePicker
            label="Interactive Date Picker"
            value={selectedDate || undefined}
            onChange={setSelectedDate}
            placeholder="Select your date"
          />
        </div>
        
        <p style={{ margin: 0, color: "#666", fontSize: "0.875rem" }}>
          Selected date: {formatDate(selectedDate)}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive date picker demonstrating controlled state management.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: function AllVariantsDatePicker() {
    const defaultDate = new Date("2024-01-15");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Outlined (Default)</h4>
          <div style={{ width: 300 }}>
            <DatePicker
              variant="outlined"
              label="Outlined Date Picker"
              defaultValue={defaultDate}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Filled</h4>
          <div style={{ width: 300 }}>
            <DatePicker
              variant="filled"
              label="Filled Date Picker"
              defaultValue={defaultDate}
            />
          </div>
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
  render: function AllSizesDatePicker() {
    const defaultDate = new Date("2024-01-15");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Small</h4>
          <div style={{ width: 250 }}>
            <DatePicker
              size="small"
              label="Small Date Picker"
              defaultValue={defaultDate}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Medium (Default)</h4>
          <div style={{ width: 300 }}>
            <DatePicker
              size="medium"
              label="Medium Date Picker"
              defaultValue={defaultDate}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Large</h4>
          <div style={{ width: 350 }}>
            <DatePicker
              size="large"
              label="Large Date Picker"
              defaultValue={defaultDate}
            />
          </div>
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

export const AllStates: Story = {
  render: function AllStatesDatePicker() {
    const sampleDate = new Date("2024-01-15");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Normal States</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ width: 300 }}>
              <DatePicker label="Empty date picker" />
            </div>
            <div style={{ width: 300 }}>
              <DatePicker 
                label="With value" 
                defaultValue={sampleDate}
              />
            </div>
            <div style={{ width: 300 }}>
              <DatePicker 
                label="Required date picker" 
                required
              />
            </div>
            <div style={{ width: 300 }}>
              <DatePicker 
                label="With helper text" 
                helperText="Select your birth date"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Error State</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ width: 300 }}>
              <DatePicker 
                label="Date with error" 
                error
                helperText="This field is required"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Disabled State</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ width: 300 }}>
              <DatePicker 
                label="Disabled empty" 
                disabled
              />
            </div>
            <div style={{ width: 300 }}>
              <DatePicker 
                label="Disabled with value" 
                disabled 
                defaultValue={sampleDate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different date picker states: normal, error, disabled, and variations.",
      },
    },
  },
};

export const InForm: Story = {
  render: function InFormDatePicker() {
    const [formData, setFormData] = useState({
      birthDate: null as Date | null,
      startDate: null as Date | null,
      endDate: null as Date | null,
    });

    const [errors, setErrors] = useState({
      birthDate: false,
      startDate: false,
      endDate: false,
    });

    const handleDateChange = (field: keyof typeof formData) => (date: Date | null) => {
      setFormData(prev => ({ ...prev, [field]: date }));
      setErrors(prev => ({ ...prev, [field]: !date }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newErrors = {
        birthDate: !formData.birthDate,
        startDate: !formData.startDate,
        endDate: !formData.endDate,
      };
      
      setErrors(newErrors);
      
      if (!Object.values(newErrors).some(Boolean)) {
        alert("Form submitted successfully!");
      }
    };

    const formatDate = (date: Date | null) => {
      if (!date) {
        return "Not selected";
      }
      return date.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "short", 
        day: "numeric" 
      });
    };

    return (
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 2rem 0" }}>Personal Information Form</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <DatePicker
              label="Birth Date"
              value={formData.birthDate || undefined}
              onChange={handleDateChange("birthDate")}
              required
              error={errors.birthDate}
              helperText={errors.birthDate ? "Birth date is required" : "Enter your date of birth"}
              fullWidth
            />
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <DatePicker
                label="Start Date"
                value={formData.startDate || undefined}
                onChange={handleDateChange("startDate")}
                required
                error={errors.startDate}
                helperText={errors.startDate ? "Start date is required" : "Project start date"}
              />
              
              <DatePicker
                label="End Date"
                value={formData.endDate || undefined}
                onChange={handleDateChange("endDate")}
                required
                error={errors.endDate}
                helperText={errors.endDate ? "End date is required" : "Project end date"}
              />
            </div>
            
            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#e3f2fd", borderRadius: "4px" }}>
              <h5 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem" }}>Selected Dates:</h5>
              <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.8rem" }}>
                <li>Birth Date: {formatDate(formData.birthDate)}</li>
                <li>Start Date: {formatDate(formData.startDate)}</li>
                <li>End Date: {formatDate(formData.endDate)}</li>
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
              Submit Information
            </button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example of date pickers in a personal information form with validation.",
      },
    },
  },
};
