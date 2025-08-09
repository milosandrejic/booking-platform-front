import { TextField } from "./TextField";

export default {
  title: "UI Components/TextField",
  component: TextField,
  argTypes: {
    variant: { control: { type: "select" }, options: ["outlined", "filled"] },
    size: { control: { type: "select" }, options: ["small", "medium", "large"] },
    type: { control: { type: "select" }, options: ["text", "password"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export const Default = {
  args: {
    label: "Default TextField",
    placeholder: "Enter text here",
    fullWidth: false
  },
};

export const Filled = {
  args: {
    variant: "filled",
    label: "Filled TextField",
    placeholder: "Enter text here",
  },
};

export const Outlined = {
  args: {
    variant: "outlined",
    label: "Outlined TextField",
    placeholder: "Enter text here",
  },
};

export const Password = {
  args: {
    type: "password",
    label: "Password",
    placeholder: "Enter password",
  },
};

export const WithError = {
  args: {
    label: "TextField with Error",
    placeholder: "Enter text here",
    error: true,
    helperText: "This field has an error",
  },
};
