import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarGroup } from "./Avatar";

const meta = {
  title: "Data Display/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        // eslint-disable-next-line @stylistic/max-len
        component: "Avatar shows a user image or initials, with circle (default) and square shapes. AvatarGroup stacks avatars with overlap and optional surplus counter.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: { control: { type: "text" }, description: "Image source URL" },
    alt: { control: { type: "text" }, description: "Alt text for image avatar" },
    name: { control: { type: "text" }, description: "Name used to derive initials when no image" },
    fallback: { control: { type: "text" }, description: "Explicit initials or text when no image" },
    size: { control: { type: "select" }, options: ["small", "medium", "large"], description: "Avatar size" },
    shape: { control: { type: "select" }, options: ["circle", "square"], description: "Avatar shape" },
  },
  args: {
    size: "medium",
    shape: "circle",
    name: "John Doe",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: "Default Avatar using initials derived from name." } },
  },
};

export const ImageAvatar: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "User avatar",
    name: "",
  },
  parameters: {
    docs: { description: { story: "Image-based avatar with lazy loading." } },
  },
};

export const ShapesAndSizes: Story = {
  render: function ShapesAndSizes() {
    return (
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <Avatar name="Ada Lovelace" size="small" />
        <Avatar name="Alan Turing" />
        <Avatar name="Grace Hopper" size="large" />
        <Avatar name="Linus Torvalds" shape="square" size="small" />
        <Avatar name="Guido van Rossum" shape="square" />
        <Avatar name="Brendan Eich" shape="square" size="large" />
      </div>
    );
  },
  parameters: {
    docs: { description: { story: "All sizes with circle and square shapes." } },
  },
};

export const GroupWithSurplus: Story = {
  render: function GroupWithSurplusStory() {
    return (
      <AvatarGroup max={4} total={8} spacing={10}>
        <Avatar src="https://i.pravatar.cc/100?img=1" alt="User 1" />
        <Avatar src="https://i.pravatar.cc/100?img=2" alt="User 2" />
        <Avatar src="https://i.pravatar.cc/100?img=3" alt="User 3" />
        <Avatar name="Ada Lovelace" />
        <Avatar name="Alan Turing" />
        <Avatar name="Grace Hopper" />
      </AvatarGroup>
    );
  },
  parameters: {
    docs: { description: { story: "AvatarGroup with max visible avatars and surplus counter based on total." } },
  },
};

export const GroupOnlyChildrenCount: Story = {
  render: function GroupOnlyChildrenCount() {
    return (
      <AvatarGroup max={3} spacing={12}>
        <Avatar name="Ada Lovelace" />
        <Avatar name="Alan Turing" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Linus Torvalds" />
        <Avatar name="Guido van Rossum" />
      </AvatarGroup>
    );
  },
  parameters: {
    docs: { description: { story: "When total is not provided, surplus is computed from children length." } },
  },
};

export const WithSx: Story = {
  render: function AvatarWithSx() {
    return (
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Avatar name="Styled" sx={{ backgroundColor: "var(--color-secondary-light)", color: "var(--color-secondary-contrast-text)" }} />
        <Avatar name="Theme" sx={{ backgroundColor: t => t.color.primary.main, color: t => t.color.primary.contrastText }} />
        <AvatarGroup spacing={12} sx={{ padding: 8, background: "var(--color-background-subtle)", borderRadius: 8 }}>
          <Avatar name="A" />
          <Avatar name="B" />
          <Avatar name="C" />
        </AvatarGroup>
      </div>
    );
  },
  parameters: { docs: { description: { story: "Avatar and AvatarGroup styled using the sx prop." } } },
};
