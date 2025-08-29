"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker } from "./DateRangePicker";
import type { DateRange } from "./DateRangePicker";
import { useState } from "react";
import dayjs from "dayjs";

/**
 * DateRangePicker component provides a styled date range input with calendar dropdown.
 * 
 * Features:
 * - Multiple variants (outlined, filled)
 * - Multiple sizes (small, medium, large)
 * - Controlled and uncontrolled modes
 * - Date range validation and constraints
 * - Custom date formats and separators
 * - Visual range selection feedback
 * - Keyboard navigation
 * - Accessibility support
 * - SSR compatible
 */
const meta: Meta<typeof DateRangePicker> = {
  title: "Pickers/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A date range picker component with calendar dropdown for selecting date ranges with validation and formatting options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Label text for the date range picker",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text when no date range is selected",
    },
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled"],
      description: "Visual variant of the date range picker",
      table: {
        defaultValue: { summary: "outlined" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size of the date range picker",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the date range picker is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the date range picker is required",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    error: {
      control: { type: "boolean" },
      description: "Whether the date range picker has an error state",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether the date range picker takes full width",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text displayed below the input",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the date range changes",
      table: {
        type: { summary: "(dateRange: DateRange | null) => void" },
      },
    },
  },
  args: {
    label: "Select date range",
    placeholder: "Choose dates...",
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
  render: function DefaultDateRangePicker(args) {
    const [value, setValue] = useState<DateRange | null>(args.defaultValue || null);

    return (
      <div style={{ width: args.fullWidth ? "100%" : 350 }}>
        <DateRangePicker 
          {...args} 
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Default date range picker with outlined variant and medium size.",
      },
    },
  },
};

export const Playground: Story = {
  render: function PlaygroundDateRangePicker(args) {
    const [value, setValue] = useState<DateRange | null>(args.defaultValue || null);

    return (
      <div style={{ width: args.fullWidth ? "100%" : 400 }}>
        <DateRangePicker 
          {...args} 
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all date range picker props and controls.",
      },
    },
  },
};

export const WithSx: Story = {
  render: function WithSxDateRangePicker(args) {
    const [value, setValue] = useState<any>(null);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "500px" }}>
        <DateRangePicker
          {...args}
          label="Mixed sx properties"
          value={value}
          onChange={v => setValue(v)}
          sx={{
            border: t => `1px solid ${t.color.secondary.main}`,
            borderRadius: "8px",
            padding: t => t.spacing[2],
            backgroundColor: "var(--color-background-paper)",
            "&:hover": {
              boxShadow: t => t.shadows.md,
              borderColor: t => t.color.secondary.dark,
            }
          }}
        />
        <DateRangePicker
          {...args}
          label="Theme functions with effects"
          variant="filled"
          sx={{
            backgroundColor: t => t.color.background.subtle,
            borderRadius: t => t.borderRadius.lg,
            padding: "12px",
            "&:focus-within": {
              backgroundColor: t => t.color.secondary.light,
              transform: "scale(1.01)",
              boxShadow: t => t.shadows.lg,
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
  render: function InteractiveDateRangePicker() {
    const [dateRange, setDateRange] = useState<DateRange | null>(null);
    
    const formatRange = (range: DateRange | null) => {
      if (!range || (!range.start && !range.end)) {
        return "None";
      }
      
      const start = range.start ? range.start.format("MM/DD/YYYY") : "Not set";
      const end = range.end ? range.end.format("MM/DD/YYYY") : "Not set";
      
      return `${start} — ${end}`;
    };
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ width: 350 }}>
          <DateRangePicker
            label="Interactive Date Range Picker"
            value={dateRange}
            onChange={setDateRange}
            placeholder="Select your date range"
          />
        </div>
        
        <p style={{ margin: 0, color: "#666", fontSize: "0.875rem" }}>
          Selected range: {formatRange(dateRange)}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive date range picker demonstrating controlled state management.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: function AllVariantsDateRangePicker() {
    const defaultRange = {
      start: dayjs("2024-01-15"),
      end: dayjs("2024-01-20"),
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Outlined (Default)</h4>
          <div style={{ width: 350 }}>
            <DateRangePicker
              variant="outlined"
              label="Outlined Date Range Picker"
              defaultValue={defaultRange}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Filled</h4>
          <div style={{ width: 350 }}>
            <DateRangePicker
              variant="filled"
              label="Filled Date Range Picker"
              defaultValue={defaultRange}
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
  render: function AllSizesDateRangePicker() {
    const defaultRange = {
      start: dayjs("2024-01-15"),
      end: dayjs("2024-01-20"),
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Small</h4>
          <div style={{ width: 300 }}>
            <DateRangePicker
              size="small"
              label="Small Date Range Picker"
              defaultValue={defaultRange}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Medium (Default)</h4>
          <div style={{ width: 350 }}>
            <DateRangePicker
              size="medium"
              label="Medium Date Range Picker"
              defaultValue={defaultRange}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Large</h4>
          <div style={{ width: 400 }}>
            <DateRangePicker
              size="large"
              label="Large Date Range Picker"
              defaultValue={defaultRange}
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
  render: function AllStatesDateRangePicker() {
    const sampleRange = {
      start: dayjs("2024-01-15"),
      end: dayjs("2024-01-20"),
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Normal States</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ width: 350 }}>
              <DateRangePicker label="Empty date range picker" />
            </div>
            <div style={{ width: 350 }}>
              <DateRangePicker 
                label="With value" 
                defaultValue={sampleRange}
              />
            </div>
            <div style={{ width: 350 }}>
              <DateRangePicker 
                label="Required date range picker" 
                required
              />
            </div>
            <div style={{ width: 350 }}>
              <DateRangePicker 
                label="With helper text" 
                helperText="Select your travel dates"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Error State</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ width: 350 }}>
              <DateRangePicker 
                label="Date range with error" 
                error
                helperText="This field is required"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Disabled State</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ width: 350 }}>
              <DateRangePicker 
                label="Disabled empty" 
                disabled
              />
            </div>
            <div style={{ width: 350 }}>
              <DateRangePicker 
                label="Disabled with value" 
                disabled 
                defaultValue={sampleRange}
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
        story: "Different date range picker states: normal, error, disabled, and variations.",
      },
    },
  },
};

export const InForm: Story = {
  render: function InFormDateRangePicker() {
    const [formData, setFormData] = useState({
      travelDates: null as DateRange | null,
      projectDates: null as DateRange | null,
    });

    const [errors, setErrors] = useState({
      travelDates: false,
      projectDates: false,
    });

    const handleRangeChange = (field: keyof typeof formData) => (dateRange: DateRange | null) => {
      setFormData(prev => ({ ...prev, [field]: dateRange }));
      setErrors(prev => ({ ...prev, [field]: !dateRange || !dateRange.start || !dateRange.end }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newErrors = {
        travelDates: !formData.travelDates || !formData.travelDates.start || !formData.travelDates.end,
        projectDates: !formData.projectDates || !formData.projectDates.start || !formData.projectDates.end,
      };
      
      setErrors(newErrors);
      
      if (!Object.values(newErrors).some(Boolean)) {
        alert("Form submitted successfully!");
      }
    };

    const formatRange = (range: DateRange | null) => {
      if (!range || !range.start || !range.end) {
        return "Not selected";
      }
      return `${range.start.format("MM/DD/YYYY")} - ${range.end.format("MM/DD/YYYY")}`;
    };

    return (
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 2rem 0" }}>Travel Planning Form</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <DateRangePicker
              label="Travel Dates"
              value={formData.travelDates}
              onChange={handleRangeChange("travelDates")}
              required
              error={errors.travelDates}
              helperText={errors.travelDates ? "Travel dates are required" : "Select your travel period"}
              fullWidth
            />
            
            <DateRangePicker
              label="Project Timeline"
              value={formData.projectDates}
              onChange={handleRangeChange("projectDates")}
              required
              error={errors.projectDates}
              helperText={errors.projectDates ? "Project dates are required" : "Define project start and end dates"}
              fullWidth
            />
            
            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#e3f2fd", borderRadius: "4px" }}>
              <h5 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem" }}>Selected Ranges:</h5>
              <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.8rem" }}>
                <li>Travel: {formatRange(formData.travelDates)}</li>
                <li>Project: {formatRange(formData.projectDates)}</li>
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
              Submit Planning Form
            </button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example of date range pickers in a planning form with validation.",
      },
    },
  },
};
