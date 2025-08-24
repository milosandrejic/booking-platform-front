"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./Chip";

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.8 25.8 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7" opacity=".5"/>
    <path fill="currentColor" d="M7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0"/>
  </svg>
);

const meta = {
  title: "Data Display/Chip",
  component: Chip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Chip is a compact visual element for tags, selections, and filters. Supports filled/outlined, sizes, colors, icons/avatars, clickable and deletable variations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: { type: "text" }, description: "Chip label content" },
    variant: { control: { type: "select" }, options: ["filled", "outlined"], description: "Visual variant" },
    size: { control: { type: "select" }, options: ["small", "medium", "large"], description: "Chip size" },
    color: { control: { type: "select" }, options: ["default", "primary", "secondary", "success", "error", "warning", "info"], description: "Color scheme" },
    clickable: { control: { type: "boolean" }, description: "Apply clickable styles and onClick handler" },
    onClick: { action: "clicked", description: "Click handler" },
    onDelete: { action: "deleted", description: "Delete handler" },
  },
  args: {
    label: "Notifications",
    variant: "filled",
    size: "medium",
    color: "default",
    clickable: true,
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: "Default filled chip." } } },
};

export const Variants: Story = {
  render: function Variants() {
    return (
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Chip label="Filled" variant="filled" />
        <Chip label="Outlined" variant="outlined" />
      </div>
    );
  },
  parameters: { docs: { description: { story: "Filled and outlined variants." } } },
};

export const Sizes: Story = {
  render: function Sizes() {
    return (
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Chip label="Small" size="small" />
        <Chip label="Medium" size="medium" />
        <Chip label="Large" size="large" />
      </div>
    );
  },
  parameters: { docs: { description: { story: "Small, medium, and large sizes." } } },
};

export const Colors: Story = {
  render: function Colors() {
    const colors = ["default", "primary", "secondary", "success", "error", "warning", "info"] as const;
    return (
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {colors.map(c => <Chip key={c} label={c} color={c} />)}
      </div>
    );
  },
  parameters: { docs: { description: { story: "Color variants for filled chips; outlined derives border/text color." } } },
};

export const WithIconAndDelete: Story = {
  render: function WithIconAndDeleteStory(args) {
    return (
      <Chip
        {...args}
        icon={<BellIcon />}
        onDelete={() => {}}
      />
    );
  },
  args: {
    label: "Alerts",
    color: "primary",
    variant: "filled",
    clickable: true,
  },
  parameters: { docs: { description: { story: "Chip with leading icon and delete action." } } },
};

export const WithAvatar: Story = {
  render: function WithAvatarStory() {
    return (
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Chip label="Ada Lovelace" avatar={{ name: "Ada Lovelace" }} />
        <Chip label="Grace Hopper" avatar={{ name: "Grace Hopper" }} color="secondary" />
        <Chip label="Linus" avatar={{ src: "https://i.pravatar.cc/100?img=3", alt: "Linus" }} color="success" />
      </div>
    );
  },
  parameters: { docs: { description: { story: "Chips with letter and image avatars." } } },
};
