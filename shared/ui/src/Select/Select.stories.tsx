"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { SelectValue } from "./Select";
import { Select, SelectOption } from "./Select";

/**
 * Select component provides a styled dropdown for selecting from a list of options.
 * 
 * Features:
 * - Single and multiple selection modes
 * - Multiple sizes (small, medium, large)
 * - Object value support with custom comparison
 * - Search/filter functionality
 * - Loading and disabled states
 * - Keyboard navigation
 * - Accessibility support
 * - SSR compatible
 */
const meta: Meta<typeof Select> = {
  title: "Inputs/Select",
  component: Select,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A select dropdown component for choosing from a list of options with support for single/multiple selection and custom value types.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text when no option is selected",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size of the select component",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    multiple: {
      control: { type: "boolean" },
      description: "Whether multiple options can be selected",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the select is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    loading: {
      control: { type: "boolean" },
      description: "Whether the select is in a loading state",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether the select takes full width of its container",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    value: {
      control: false,
      description: "Currently selected value(s)",
      table: {
        type: { summary: "SelectValue | SelectValue[]" },
      },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when selection changes",
      table: {
        type: { summary: "(value: SelectValue | SelectValue[]) => void" },
      },
    },
    compareValue: {
      control: false,
      description: "Custom function to compare values for selection state",
      table: {
        type: { summary: "(a: SelectValue, b: SelectValue) => boolean" },
      },
    },
  },
  args: {
    placeholder: "Select an option...",
    size: "medium",
    multiple: false,
    disabled: false,
    loading: false,
    fullWidth: false,
    children: (
      <>
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="banana">Banana</SelectOption>
        <SelectOption value="cherry">Cherry</SelectOption>
        <SelectOption value="date">Date</SelectOption>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultSelect(args) {
    const [value, setValue] = useState<SelectValue | SelectValue[] | undefined>(
      args.multiple ? [] : undefined
    );

    return (
      <div style={{ width: args.fullWidth ? "100%" : 300 }}>
        <Select 
          {...args} 
          value={value}
          onChange={setValue}
        >
          {args.children}
        </Select>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Default select with basic options.",
      },
    },
  },
};

export const Playground: Story = {
  render: function PlaygroundSelect(args) {
    const [value, setValue] = useState<SelectValue | SelectValue[] | undefined>(
      args.multiple ? [] : undefined
    );

    return (
      <div style={{ width: args.fullWidth ? "100%" : 350 }}>
        <Select 
          {...args} 
          value={value}
          onChange={setValue}
        >
          {args.children}
        </Select>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all select props and controls.",
      },
    },
  },
};

export const Interactive: Story = {
  render: function InteractiveSelect() {
    const [singleValue, setSingleValue] = useState<SelectValue>("");
    const [multipleValues, setMultipleValues] = useState<SelectValue[]>([]);

    const handleSingleChange = (value: SelectValue | SelectValue[]) => {
      setSingleValue(Array.isArray(value) ? value[0] || "" : value);
    };

    const handleMultipleChange = (value: SelectValue | SelectValue[]) => {
      setMultipleValues(Array.isArray(value) ? value : [value]);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Single Selection</h4>
          <Select 
            placeholder="Choose a category…"
            value={singleValue}
            onChange={handleSingleChange}
            style={{ width: 320 }}
          >
            <SelectOption value="frontend">Frontend Development</SelectOption>
            <SelectOption value="backend">Backend Development</SelectOption>
            <SelectOption value="design">UI/UX Design</SelectOption>
            <SelectOption value="devops">DevOps</SelectOption>
          </Select>
          <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
            Selected: {singleValue ? String(singleValue) : "None"}
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: "1rem" }}>Multiple Selection</h4>
          <Select 
            placeholder="Choose technologies…"
            multiple
            value={multipleValues}
            onChange={handleMultipleChange}
            style={{ width: 320 }}
          >
            <SelectOption value="react">React</SelectOption>
            <SelectOption value="vue">Vue</SelectOption>
            <SelectOption value="angular">Angular</SelectOption>
            <SelectOption value="svelte">Svelte</SelectOption>
            <SelectOption value="typescript">TypeScript</SelectOption>
          </Select>
          <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
            Selected: {multipleValues.length > 0 ? multipleValues.join(", ") : "None"}
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive select demonstrating controlled single and multiple selection.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: function AllSizesSelect() {
    const options = [
      { value: "option1", label: "Option 1" }, { value: "option2", label: "Option 2" }, { value: "option3", label: "Option 3" }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Small</h4>
          <Select size="small" placeholder="Small select" style={{ width: 280 }}>
            {options.map(option => (
              <SelectOption key={option.value} value={option.value}>
                {option.label}
              </SelectOption>
            ))}
          </Select>
        </div>

        <div>
          <h4 style={{ marginBottom: "1rem" }}>Medium (Default)</h4>
          <Select size="medium" placeholder="Medium select" style={{ width: 320 }}>
            {options.map(option => (
              <SelectOption key={option.value} value={option.value}>
                {option.label}
              </SelectOption>
            ))}
          </Select>
        </div>

        <div>
          <h4 style={{ marginBottom: "1rem" }}>Large</h4>
          <Select size="large" placeholder="Large select" style={{ width: 360 }}>
            {options.map(option => (
              <SelectOption key={option.value} value={option.value}>
                {option.label}
              </SelectOption>
            ))}
          </Select>
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
  render: function AllStatesSelect() {
    const fruits = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
      { value: "date", label: "Date" }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Normal States</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Select placeholder="Default state" style={{ width: 320 }}>
              {fruits.map(fruit => (
                <SelectOption key={fruit.value} value={fruit.value}>
                  {fruit.label}
                </SelectOption>
              ))}
            </Select>

            <Select placeholder="With selected value" value="apple" style={{ width: 320 }}>
              {fruits.map(fruit => (
                <SelectOption key={fruit.value} value={fruit.value}>
                  {fruit.label}
                </SelectOption>
              ))}
            </Select>

            <Select placeholder="Multiple selection" multiple value={["apple", "cherry"]} style={{ width: 320 }}>
              {fruits.map(fruit => (
                <SelectOption key={fruit.value} value={fruit.value}>
                  {fruit.label}
                </SelectOption>
              ))}
            </Select>

            <Select placeholder="Full width" fullWidth>
              {fruits.map(fruit => (
                <SelectOption key={fruit.value} value={fruit.value}>
                  {fruit.label}
                </SelectOption>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "1rem" }}>Loading State</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Select placeholder="Loading options..." loading style={{ width: 320 }}>
              {fruits.map(fruit => (
                <SelectOption key={fruit.value} value={fruit.value}>
                  {fruit.label}
                </SelectOption>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "1rem" }}>Disabled State</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Select placeholder="Disabled empty" disabled style={{ width: 320 }}>
              {fruits.map(fruit => (
                <SelectOption key={fruit.value} value={fruit.value}>
                  {fruit.label}
                </SelectOption>
              ))}
            </Select>

            <Select placeholder="Disabled with value" disabled value="banana" style={{ width: 320 }}>
              {fruits.map(fruit => (
                <SelectOption key={fruit.value} value={fruit.value}>
                  {fruit.label}
                </SelectOption>
              ))}
            </Select>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different select states: normal, loading, disabled, and variations.",
      },
    },
  },
};

export const WithObjectValues: Story = {
  render: function WithObjectValuesSelect() {
    const [selectedUser, setSelectedUser] = useState<SelectValue>("");

    const johnDoe = { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" };
    const janeSmith = { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer" };
    const bobJohnson = { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager" };
    const users = [johnDoe, janeSmith, bobJohnson];

    const handleUserChange = (value: SelectValue | SelectValue[]) => {
      setSelectedUser(Array.isArray(value) ? value[0] || "" : value);
    };

    const formatSelectedUser = (user: any) => {
      if (!user) {
        return "None";
      }
      return `${user.name} (${user.role})`;
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Select 
          placeholder="Select a user"
          value={selectedUser}
          onChange={handleUserChange}
          style={{ width: 320 }}
        >
          {users.map(user => (
            <SelectOption key={user.id} value={user}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "bold" }}>{user.name}</span>
                <span style={{ fontSize: "0.875rem", color: "#666" }}>
                  {user.email} • {user.role}
                </span>
              </div>
            </SelectOption>
          ))}
        </Select>
        
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>
          Selected: {formatSelectedUser(selectedUser)}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Select with complex object values and custom display formatting.",
      },
    },
  },
};

export const InForm: Story = {
  render: function InFormSelect() {
    const [formData, setFormData] = useState({
      category: "",
      priority: "",
      assignees: [] as string[],
      department: ""
    });

    const [errors, setErrors] = useState({
      category: false,
      priority: false,
      assignees: false,
      department: false
    });

    const handleFieldChange = (field: keyof typeof formData) => (value: SelectValue | SelectValue[]) => {
      if (field === "assignees") {
        const newValue = Array.isArray(value) ? value as string[] : [value as string];
        setFormData(prev => ({ ...prev, [field]: newValue }));
        setErrors(prev => ({ ...prev, [field]: newValue.length === 0 }));
      } else {
        const newValue = Array.isArray(value) ? value[0] || "" : value as string;
        setFormData(prev => ({ ...prev, [field]: newValue }));
        setErrors(prev => ({ ...prev, [field]: !newValue }));
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newErrors = {
        category: !formData.category,
        priority: !formData.priority,
        assignees: formData.assignees.length === 0,
        department: !formData.department
      };
      
      setErrors(newErrors);
      
      if (!Object.values(newErrors).some(Boolean)) {
        alert("Task created successfully!");
      }
    };

    const categories = [
      "Bug",
      "Feature",
      "Enhancement",
      "Documentation"
    ];
    const priorities = [
      "Low",
      "Medium",
      "High",
      "Critical"
    ];
    const assignees = [
      "Alice Johnson",
      "Bob Smith",
      "Carol Davis",
      "David Wilson"
    ];
    const departments = [
      "Engineering",
      "Design",
      "Product",
      "QA"
    ];

    return (
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 2rem 0" }}>Create New Task</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Category *
                </label>
                <Select
                  placeholder="Select category"
                  value={formData.category}
                  onChange={handleFieldChange("category")}
                  fullWidth
                >
                  {categories.map(category => (
                    <SelectOption key={category} value={category}>
                      {category}
                    </SelectOption>
                  ))}
                </Select>
                {errors.category && (
                  <span style={{ fontSize: "0.75rem", color: "#d32f2f", marginTop: "0.25rem", display: "block" }}>
                    Category is required
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Priority *
                </label>
                <Select
                  placeholder="Select priority"
                  value={formData.priority}
                  onChange={handleFieldChange("priority")}
                  fullWidth
                >
                  {priorities.map(priority => (
                    <SelectOption key={priority} value={priority}>
                      {priority}
                    </SelectOption>
                  ))}
                </Select>
                {errors.priority && (
                  <span style={{ fontSize: "0.75rem", color: "#d32f2f", marginTop: "0.25rem", display: "block" }}>
                    Priority is required
                  </span>
                )}
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Assignees *
              </label>
              <Select
                placeholder="Select assignees"
                multiple
                value={formData.assignees}
                onChange={handleFieldChange("assignees")}
                fullWidth
              >
                {assignees.map(assignee => (
                  <SelectOption key={assignee} value={assignee}>
                    {assignee}
                  </SelectOption>
                ))}
              </Select>
              {errors.assignees && (
                <span style={{ fontSize: "0.75rem", color: "#d32f2f", marginTop: "0.25rem", display: "block" }}>
                  At least one assignee is required
                </span>
              )}
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Department *
              </label>
              <Select
                placeholder="Select department"
                value={formData.department}
                onChange={handleFieldChange("department")}
                fullWidth
              >
                {departments.map(department => (
                  <SelectOption key={department} value={department}>
                    {department}
                  </SelectOption>
                ))}
              </Select>
              {errors.department && (
                <span style={{ fontSize: "0.75rem", color: "#d32f2f", marginTop: "0.25rem", display: "block" }}>
                  Department is required
                </span>
              )}
            </div>
            
            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#e3f2fd", borderRadius: "4px" }}>
              <h5 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem" }}>Form Data:</h5>
              <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.8rem" }}>
                <li>Category: {formData.category || "Not selected"}</li>
                <li>Priority: {formData.priority || "Not selected"}</li>
                <li>Assignees: {formData.assignees.length > 0 ? formData.assignees.join(", ") : "None"}</li>
                <li>Department: {formData.department || "Not selected"}</li>
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
                marginTop: "1rem"
              }}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example of select components in a task creation form with validation and different selection modes.",
      },
    },
  },
};
