import TextField from "./TextField";

export default {
  title: "UI Components/TextField",
  component: TextField,
};

export const Default = {
  args: {
    label: "Default TextField",
    placeholder: "Enter text here",
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

export const Email = {
  args: {
    type: "email",
    label: "Email",
    placeholder: "Enter email address",
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
