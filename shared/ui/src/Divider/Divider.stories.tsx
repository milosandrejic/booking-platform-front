import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./Divider";

const meta = {
  title: "Data Display/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    orientation: { control: { type: "select" }, options: ["horizontal", "vertical"] },
    flexItem: { control: { type: "boolean" } },
    textAlign: { control: { type: "select" }, options: ["left", "center", "right" ] },
    children: { control: { type: "text" } },
  },
  args: { orientation: "horizontal", textAlign: "center" },
} satisfies Meta<typeof Divider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 480 }}>
      <div>Item A</div>
      <Divider />
      <div>Item B</div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 520 }}>
      <Divider>Section</Divider>
      <Divider textAlign="left">Left</Divider>
      <Divider textAlign="right">Right</Divider>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span>One</span>
      <Divider orientation="vertical" />
      <span>Two</span>
      <Divider orientation="vertical" flexItem />
      <span style={{ inlineSize: 120 }}>Three with taller line via flexItem</span>
    </div>
  ),
};

export const WithSx: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <Divider sx={{ borderColor: "var(--color-primary-main)" }}>Primary</Divider>
      <Divider sx={(t) => ({ color: t.color.text.secondary })}>Theme text</Divider>
    </div>
  ),
};
