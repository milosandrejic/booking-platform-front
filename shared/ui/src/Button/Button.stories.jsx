import { Button } from "./Button";

export default {
  title: "UI Components/Button",
  component: Button,
  argTypes: {
    variant: { control: { type: "select" }, options: ["filled", "outlined", "text"] },
    size: { control: { type: "select" }, options: ["small", "medium", "large"] },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export const Default = {
  args: { children: "Button", variant: "filled" },
};

export const Outlined = {
  args: { children: "Outlined Button", variant: "outlined" },
};

export const Text = {
  args: { children: "Text Button", variant: "text" },
};

export const Disabled = {
  args: { children: "Disabled", variant: "filled", disabled: true },
};
