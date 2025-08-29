"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardActions, type CardProps } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A container for grouping related content with a modern rounded appearance and configurable shadow.",
      },
    },
  },
  argTypes: {
    shadow: {
      control: { type: "select" },
      options: [
        "none",
        "sm",
        "md",
        "lg",
      ],
      description: "Shadow intensity.",
      table: { defaultValue: { summary: "md" } },
    },
  },
  args: {
    shadow: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: function BasicCard(args: CardProps) {
    return (
      <Card {...args} style={{ maxWidth: 420 }}>
        <CardHeader>
          <strong>Card title</strong>
        </CardHeader>

        <CardContent>
          <p>
            This is the card content. Use it to present information in a grouped block with a consistent look.
          </p>
        </CardContent>

        <CardActions>
          <button type="button">Cancel</button>
          <button type="button">Confirm</button>
        </CardActions>
      </Card>
    );
  },
  parameters: {
    docs: { description: { story: "Default card with header, content, and actions sections." } },
  },
};

export const Shadows: Story = {
  render: function ShadowsShowcase() {
    const variants: CardProps["shadow"][] = [
      "none",
      "sm",
      "md",
      "lg",
    ];

    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {variants.map(v => (
          <Card key={v} shadow={v} style={{ padding: 16 }}>
            <strong>shadow = {v}</strong>
          </Card>
        ))}
      </div>
    );
  },
  parameters: {
    docs: { description: { story: "All available shadow options." } },
  },
};

export const WithSx: Story = {
  render: function WithSxCard() {
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Card
          shadow="md"
          sx={{
            borderRadius: "16px",
            border: t => `1px solid ${t.color.border.light}`,
            maxWidth: "300px",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: t => t.shadows.lg,
            }
          }}
        >
          <CardContent>
            Mixed functions & values with hover effect.
          </CardContent>
        </Card>
        
        <Card
          shadow="sm"
          sx={{
            background: t => `linear-gradient(135deg, ${t.color.primary.light}, ${t.color.primary.main})`,
            color: "white",
            maxWidth: "300px",
          }}
        >
          <CardContent>
            Theme gradient background.
          </CardContent>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { 
        story: "New sx system: each property can be a function (receives theme) or direct value, with pseudo-selectors." 
      },
    },
  },
};

export const InteractiveShadow: Story = {
  render: function InteractiveShadowCard(args) {
    const [shadow, setShadow] = useState<CardProps["shadow"]>(args.shadow || "md");

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <label htmlFor="shadow-select">Shadow:</label>
          <select
            id="shadow-select"
            value={shadow}
            onChange={e => setShadow(e.target.value as CardProps["shadow"])}
          >
            <option value="none">none</option>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
          </select>
        </div>

        <Card shadow={shadow}>
          <CardContent>
            Try different shadow levels using the select above.
          </CardContent>
        </Card>
      </div>
    );
  },
  parameters: {
    docs: { description: { story: "Interactive story to try shadow variants." } },
  },
};
