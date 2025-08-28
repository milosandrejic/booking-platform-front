"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Progress } from "./Progress";
import { Button } from "../Button";

const meta: Meta<typeof Progress> = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Progress indicators inform users about the status of ongoing processes. "
          + "Supports linear and circular variants, determinate and indeterminate modes, and optional labels.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["linear", "circular"],
      table: { defaultValue: { summary: "linear" } },
      description: "Visual style of the progress indicator.",
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "success",
        "info",
        "warning",
        "error",
      ],
      table: { defaultValue: { summary: "primary" } },
      description: "Color theme for the progress indicator.",
    },
    value: {
      control: { type: "number" },
      description: "Progress value (0-100). When set, component is determinate.",
    },
    buffer: {
      control: { type: "number" },
      description: "Buffer value (0-100). Linear only.",
    },
    label: {
      control: { type: "boolean" },
      description: "Show a label. If true and determinate, shows the percentage.",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Circular size preset or number in px.",
    },
    thickness: {
      control: { type: "number" },
      description: "Circular stroke thickness in px.",
    },
  },
  args: {
    variant: "linear",
    color: "primary",
    value: undefined,
    buffer: undefined,
    label: false,
    size: "medium",
  },
};

export default meta;
export type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  render: function PlaygroundProgress(args) {
    return (
      <Progress {...args} />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Use this story to control all props via Storybook Controls.",
      },
    },
  },
};

export const Default: Story = {
  render: function DefaultProgress(args) {
    const [value, setValue] = useState<number | undefined>(undefined);

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <Progress {...args} value={value} />

        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => setValue(undefined)}>Indeterminate</Button>
          <Button onClick={() => setValue(25)}>25%</Button>
          <Button onClick={() => setValue(50)}>50%</Button>
          <Button onClick={() => setValue(75)}>75%</Button>
          <Button onClick={() => setValue(100)}>100%</Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive default progress switching between indeterminate and determinate modes.",
      },
    },
  },
};

export const LinearWithBuffer: Story = {
  render: function LinearWithBufferProgress() {
    const [value, setValue] = useState(40);
    const [buffer, setBuffer] = useState(70);

    return (
      <div style={{ display: "grid", gap: 12 }}>
        <Progress variant="linear" color="info" value={value} buffer={buffer} label />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            10,
            25,
            50,
            75,
            100,
          ].map(v => (
            <Button key={v} onClick={() => setValue(v)}>{v}%</Button>
          ))}
          {[
            20,
            40,
            60,
            80,
            100,
          ].map(v => (
            <Button key={`b-${v}`} onClick={() => setBuffer(v)}>buffer {v}%</Button>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Linear progress with buffer and percentage label.",
      },
    },
  },
};

export const CircularDeterminate: Story = {
  render: function CircularDeterminateProgress() {
    const [value, setValue] = useState(65);

    return (
      <div style={{ display: "grid", gap: 16, placeItems: "start" }}>
        <Progress variant="circular" color="success" value={value} label size="large" />
        <div style={{ display: "flex", gap: 8 }}>
          {[
            10,
            25,
            50,
            75,
            100,
          ].map(v => (
            <Button key={v} onClick={() => setValue(v)}>{v}%</Button>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Circular determinate progress with label in the center.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: function AllVariantsProgress() {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <Progress variant="linear" color="primary" />
        <Progress variant="linear" color="warning" value={60} label />
        <Progress variant="linear" color="error" value={30} buffer={70} />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Progress variant="circular" color="success" value={75} label />
          <Progress variant="circular" color="error" value={40} size="small" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All progress variants: linear/circular with indeterminate, determinate, buffer, and label options.",
      },
    },
  },
};

export const Indeterminate: Story = {
  render: function IndeterminateProgress() {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ width: 320 }}>
          <Progress variant="linear" color="primary" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Progress variant="circular" color="warning" size="large" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Explicit indeterminate examples for both linear and circular variants (no value prop).",
      },
    },
  },
};
