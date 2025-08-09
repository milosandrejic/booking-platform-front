import { Container } from "./Container";

export default {
  title: "Layout/Container",
  component: Container,
  argTypes: {
    maxWidth: {
      control: { type: "select" },
      options: [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
      ],
    },
    fixed: { control: "boolean" },
    disableGutters: { control: "boolean" },
    spacing: { control: { type: "select" }, options: ["compact", "default", "comfortable"] },
  },
};

export const Default = {
  args: { maxWidth: "md", spacing: "default" },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>Container Content</div>
    </Container>
  ),
};
