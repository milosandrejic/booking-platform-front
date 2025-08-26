"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
// Shared demo icon (Solar by 480 Design - CC BY 4.0)
const DemoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    aria-label="bell"
  >
    <path
      fill="#888888"
      d={
        "M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21" +
        "a25.8 25.8 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374V9" +
        "c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
      }
      opacity=".5"
    />
    <path
      fill="#888888"
      d={
        "M7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0"
      }
    />
  </svg>
);

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Badge overlays a small status or count on top of another element. " +
          "Supports dot/standard variants, colors, max capping, showZero, and invisibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    badgeContent: { control: { type: "text" }, description: "Badge text/number content" },
    showZero: { control: { type: "boolean" }, description: "Show when content is 0" },
    invisible: { control: { type: "boolean" }, description: "Force hide badge dot/content" },
    max: { control: { type: "number" }, description: "Max cap for numeric content (e.g. 99+)" },
    color: {
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
      ],
      description: "Color theme",
    },
    variant: {
      control: { type: "select" },
      options: ["standard", "dot"],
      description: "Badge variant",
    },
    anchorOrigin: {
      control: { type: "select" },
      options: [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
      ],
      description: "Anchor position",
    },
  },
  args: {
    badgeContent: 7,
    showZero: false,
    invisible: false,
    max: 99,
    color: "primary",
    variant: "standard",
    anchorOrigin: "top-right",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultBadge(args) {
    return (
      <Badge {...args}>
        <DemoIcon />
      </Badge>
    );
  },
  parameters: {
    docs: { description: { story: "Badge with numeric content capped by max." } },
  },
};

export const DotVariant: Story = {
  args: { variant: "dot", badgeContent: undefined },
  render: function DotVariantBadge(args) {
    return (
      <Badge {...args}>
        <DemoIcon />
      </Badge>
    );
  },
  parameters: { docs: { description: { story: "Dot variant for generic status." } } },
};

export const ZeroHandling: Story = {
  args: { badgeContent: 0, showZero: true },
  render: function ZeroHandlingBadge(args) {
    return (
      <div style={{ display: "flex", gap: 24 }}>
        <Badge {...args}>
          <DemoIcon />
        </Badge>
        <Badge {...args} showZero={false}>
          <DemoIcon />
        </Badge>
      </div>
    );
  },
  parameters: { docs: { description: { story: "showZero toggles visibility for zero content." } } },
};

export const WithMaxCapping: Story = {
  args: { badgeContent: 150, max: 99 },
  render: function WithMaxCappingBadge(args) {
    return (
      <Badge {...args}>
        <DemoIcon />
      </Badge>
    );
  },
  parameters: { docs: { description: { story: "Numeric badge content is shown as max+ when exceeded." } } },
};

export const AnchorPositions: Story = {
  render: function AnchorPositionsBadge() {
    const positions = [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
    ] as const;
    return (
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {positions.map(pos => (
          <Badge key={pos} badgeContent={5} anchorOrigin={pos}>
            <DemoIcon />
          </Badge>
        ))}
      </div>
    );
  },
  parameters: { docs: { description: { story: "Different anchor origins." } } },
};

export const OnIcon: Story = {
  args: { badgeContent: 3, color: "primary", variant: "standard" },
  render: function OnIconBadge(args) {
    return (
      <Badge {...args}>
        {/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          aria-label="mail"
        >
          <path
            fill="#888888"
            d={
              "M14.2 3H9.8C5.652 3 3.577 3 2.289 4.318S1 7.758 1 12s0 6.364 1.289 7.682S5.652 21 9.8 21" +
              "h4.4c4.148 0 6.223 0 7.511-1.318S23 16.242 23 12s0-6.364-1.289-7.682S18.348 3 14.2 3"
            }
            opacity=".5"
          />
          <path
            fill="#888888"
            d={
              "M19.128 8.033a.825.825 0 0 0-1.056-1.268l-2.375 1.98c-1.026.855-1.738 1.447-2.34 1.833" +
              "c-.582.375-.977.5-1.357.5s-.774-.125-1.357-.5c-.601-.386-1.314-.978-2.34-1.834L5.928 6.765a.825.825 0 0 0-1.056 1.268l2.416 2.014" +
              "c.975.812 1.765 1.47 2.463 1.92c.726.466 1.434.762 2.25.762c.814 0 1.522-.296 2.249-.763c.697-.448 1.487-1.107 2.462-1.92z"
            }
          />
        </svg>
      </Badge>
    );
  },
  parameters: { docs: { description: { story: "Badge applied to a provided SVG icon as its child." } } },
};

export const WithSx: Story = {
  render: function BadgeWithSx(args) {
    return (
      <div style={{ display: "flex", gap: 24 }}>
        <Badge {...args} sx={{ ["--badge-bg" as any]: "var(--color-error-main)" }}>
          <DemoIcon />
        </Badge>
        <Badge {...args} variant="dot" sx={{ transform: "scale(1.2)" }}>
          <DemoIcon />
        </Badge>
      </div>
    );
  },
  parameters: { docs: { description: { story: "Apply custom inline styles and CSS variables with sx." } } },
};
