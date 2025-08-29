import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "./Button";

/**
 * Button component for user interactions and actions.
 * 
 * Features:
 * - Multiple variants (filled, outlined, text)
 * - Multiple sizes (small, medium, large)
 * - Disabled state
 * - Full width option
 * - Loading state support
 * - Accessible with proper ARIA attributes
 */
const meta = {
  title: "Inputs/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile button component for user interactions with multiple variants, sizes, and states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Button content (text, icons, etc.)",
    },
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "text"],
      description: "Visual style variant of the button",
      table: {
        defaultValue: { summary: "filled" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size of the button",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether the button takes full width of its container",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "HTML button type attribute",
      table: {
        defaultValue: { summary: "button" },
      },
    },
    startIcon: {
      control: false,
      description: "Icon to display at the start of the button",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    endIcon: {
      control: false,
      description: "Icon to display at the end of the button",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Callback fired when button is clicked",
    },
  },
  args: {
    children: "Button",
    variant: "filled",
    size: "medium",
    disabled: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default button with filled variant and medium size.",
      },
    },
  },
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all button props and controls.",
      },
    },
  },
};

export const Interactive: Story = {
  render: function InteractiveButton(args) {
    const [count, setCount] = useState(0);

    return (
      <Button
        {...args}
        onClick={() => setCount(prev => prev + 1)}
      >
        Clicked {count} times
      </Button>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive button that responds to clicks and updates its content.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: function AllVariantsButton(args) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button {...args} variant="filled">
          Filled Button
        </Button>
        <Button {...args} variant="outlined">
          Outlined Button
        </Button>
        <Button {...args} variant="text">
          Text Button
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available button variants: filled, outlined, and text.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: function AllSizesButton(args) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Button {...args} size="small">
          Small
        </Button>
        <Button {...args} size="medium">
          Medium
        </Button>
        <Button {...args} size="large">
          Large
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available button sizes: small, medium, and large.",
      },
    },
  },
};

export const AllStates: Story = {
  render: function AllStatesButton(args) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button {...args}>
          Normal Button
        </Button>
        <Button {...args} disabled>
          Disabled Button
        </Button>
        <Button {...args} fullWidth>
          Full Width Button
        </Button>
        <Button {...args} variant="outlined" disabled>
          Disabled Outlined
        </Button>
        <Button {...args} variant="text" disabled>
          Disabled Text
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different button states: normal, disabled, and full width across variants.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: function IconButtonsStory(args) {
    // Simple icon components for demonstration
    const PlusIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 3.5a.5.5 0 0 1 .5.5v4h4a.5.5 0 0 1 0 1h-4v4a.5.5 0 0 1-1 0v-4h-4a.5.5 0 0 1 0-1h4v-4a.5.5 0 0 1 .5-.5z"/>
      </svg>
    );

    const ArrowIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path 
          fillRule="evenodd" 
          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
        />
      </svg>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <h4 style={{ marginBottom: "0.5rem" }}>Start Icons</h4>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button {...args} startIcon={<PlusIcon />}>
              Add Item
            </Button>
            <Button {...args} variant="outlined" startIcon={<PlusIcon />}>
              Create New
            </Button>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "0.5rem" }}>End Icons</h4>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button {...args} endIcon={<ArrowIcon />}>
              Continue
            </Button>
            <Button {...args} variant="text" endIcon={<ArrowIcon />}>
              Learn More
            </Button>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "0.5rem" }}>Both Icons</h4>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button {...args} startIcon={<PlusIcon />} endIcon={<ArrowIcon />}>
              Add & Continue
            </Button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Buttons with start and end icons for enhanced visual communication.",
      },
    },
  },
};

export const InForm: Story = {
  render: function InFormButton(args) {
    const [formData, setFormData] = useState({
      email: "",
      message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Form submitted with: ${JSON.stringify(formData, null, 2)}`);
      setIsSubmitting(false);
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
        <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>Contact Form</h3>
        
        <input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
          required
        />
        
        <textarea
          placeholder="Your message"
          value={formData.message}
          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
          style={{ 
            padding: "0.5rem", 
            border: "1px solid #ccc", 
            borderRadius: "4px",
            minHeight: "80px",
            resize: "vertical",
          }}
          required
        />
        
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            {...args}
            type="submit"
            variant="filled"
            disabled={isSubmitting}
            style={{ flex: 1 }}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          
          <Button
            {...args}
            type="button"
            variant="outlined"
            onClick={() => setFormData({ email: "", message: "" })}
            disabled={isSubmitting}
          >
            Clear
          </Button>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example of buttons in a form context with loading states and different actions.",
      },
    },
  },
};

export const WithSx: Story = {
  render: function ButtonWithSx(args) {
    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button {...args} sx={{ backgroundColor: "var(--color-success-main)" }}>
          Success BG via sx
        </Button>
        <Button
          {...args}
          variant="outlined"
          sx={{
            color: t => t.color.primary.main,
            borderColor: "var(--color-primary-main)",
            padding: t => `${t.spacing[2]} ${t.spacing[4]}`,
            "&:hover": {
              backgroundColor: t => t.color.primary.light,
              borderColor: t => t.color.primary.dark,
            }
          }}
        >
          Mixed functions & values
        </Button>
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
