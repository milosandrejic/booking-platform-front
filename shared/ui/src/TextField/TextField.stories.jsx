import TextField from "./TextField";

export default {
  title: "UI Components/TextField",
  component: TextField,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the input field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when input is empty",
    },
    type: {
      control: "select",
      options: ["text",
        "email",
        "password",
        "number",
        "tel",
        "url"],
      description: "HTML input type",
    },
    variant: {
      control: "select",
      options: ["outlined", "filled"],
      description: "Visual style variant of the text field",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the text field",
    },
    error: {
      control: "boolean",
      description: "If true, the input will display in error state",
    },
    disabled: {
      control: "boolean",
      description: "If true, the input will be disabled",
    },
    required: {
      control: "boolean",
      description: "If true, the input will be required",
    },
    fullWidth: {
      control: "boolean",
      description: "If true, the input will take the full width of its container",
    },
    multiline: {
      control: "boolean",
      description: "If true, the input will be a textarea",
    },
    rows: {
      control: "number",
      description: "Number of rows for multiline input",
    },
    helperText: {
      control: "text",
      description: "Helper text to display below the input",
    },
  },
};

export const Default = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px" }}>
      <TextField
        label="Outlined (Default)"
        placeholder="Enter text"
        variant="outlined"
      />
      <TextField
        label="Filled"
        placeholder="Enter text"
        variant="filled"
      />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px" }}>
      <TextField
        label="Small"
        placeholder="Small input"
        size="small"
      />
      <TextField
        label="Medium (Default)"
        placeholder="Medium input"
        size="medium"
      />
      <TextField
        label="Large"
        placeholder="Large input"
        size="large"
      />
    </div>
  ),
};

export const States = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px" }}>
      <TextField
        label="Normal"
        placeholder="Normal state"
        value="Sample text"
      />
      <TextField
        label="Error"
        placeholder="Error state"
        error={true}
        helperText="This field has an error"
        value="Invalid input"
      />
      <TextField
        label="Disabled"
        placeholder="Disabled state"
        disabled={true}
        value="Disabled input"
      />
      <TextField
        label="Required"
        placeholder="Required field"
        required={true}
        helperText="This field is required"
      />
    </div>
  ),
};

export const InputTypes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px" }}>
      <TextField
        label="Text"
        placeholder="Enter text"
        type="text"
      />
      <TextField
        label="Email"
        placeholder="Enter email"
        type="email"
      />
      <TextField
        label="Password"
        placeholder="Enter password"
        type="password"
      />
      <TextField
        label="Number"
        placeholder="Enter number"
        type="number"
      />
      <TextField
        label="Phone"
        placeholder="Enter phone"
        type="tel"
      />
    </div>
  ),
};

export const Multiline = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "400px" }}>
      <TextField
        label="Description"
        placeholder="Enter description"
        multiline={true}
        rows={4}
        helperText="You can enter multiple lines of text"
      />
      <TextField
        label="Comments"
        placeholder="Enter comments"
        multiline={true}
        rows={6}
        variant="filled"
      />
    </div>
  ),
};

export const FullWidth = {
  render: () => (
    <div style={{ width: "100%" }}>
      <TextField
        label="Full Width Input"
        placeholder="This input takes the full width"
        fullWidth={true}
        helperText="This input spans the entire container width"
      />
    </div>
  ),
};
