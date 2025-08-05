import Button from "./Button";

export default {
  title: "UI Components/Button",
  component: Button,
};

export const Default = {
  args: {
    children: "Button",
  },
};

export const Filled = {
  args: {
    variant: "filled",
    children: "Filled Button",
  },
};

export const Outlined = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
  },
};

export const Text = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};
