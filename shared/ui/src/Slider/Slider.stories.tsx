"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Slider } from "./Slider";

/**
 * Slider component provides an interactive control for selecting values within a range.
 * 
 * Features:
 * - Single value and range selection modes
 * - Multiple sizes (small, medium, large)
 * - Color variants (primary, secondary, success, error, warning, info)
 * - Continuous and stepped value selection
 * - Value marks and labels
 * - Controlled and uncontrolled modes
 * - Keyboard navigation
 * - Accessibility support
 * - SSR compatible
 */
const meta: Meta<typeof Slider> = {
  title: "Inputs/Slider",
  component: Slider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A slider component for selecting values within a range with support for single and range selection modes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Label text for the slider",
    },
    min: {
      control: { type: "number" },
      description: "Minimum value",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    max: {
      control: { type: "number" },
      description: "Maximum value", 
      table: {
        defaultValue: { summary: "100" },
      },
    },
    step: {
      control: { type: "number" },
      description: "Step increment (null for continuous)",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size variant of the slider",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary", 
        "success",
        "error",
        "warning",
        "info"
      ],
      description: "Color theme of the slider",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the slider is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    marks: {
      control: { type: "boolean" },
      description: "Whether to show value marks",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    valueLabelDisplay: {
      control: { type: "select" },
      options: ["auto", "on", "off"],
      description: "Whether to show current value labels",
      table: {
        defaultValue: { summary: "auto" },
      },
    },
    minRange: {
      control: { type: "number" },
      description: "Minimum distance between range thumbs",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the value changes",
      table: {
        type: { summary: "(value: number | [number, number], event?: Event) => void" },
      },
    },
    onChangeCommitted: {
      action: "changeCommitted",
      description: "Callback fired when the user stops dragging",
      table: {
        type: { summary: "(value: number | [number, number], event?: Event) => void" },
      },
    },
  },
  args: {
    label: "Value",
    min: 0,
    max: 100,
    step: 1,
    size: "medium",
    color: "primary",
    disabled: false,
    marks: false,
    valueLabelDisplay: "auto",
    minRange: 0,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultSlider(args) {
    const [value, setValue] = useState<number>(args.defaultValue as number || 30);

    return (
      <div style={{ width: 400, padding: "2rem" }}>
        <Slider 
          {...args} 
          value={value}
          onChange={newValue => setValue(newValue as number)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Default single-value slider with basic configuration.",
      },
    },
  },
};

export const Playground: Story = {
  render: function PlaygroundSlider(args) {
    const [value, setValue] = useState<number>(args.defaultValue as number || 50);

    return (
      <div style={{ width: 400, padding: "2rem" }}>
        <Slider 
          {...args} 
          value={value}
          onChange={newValue => setValue(newValue as number)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all slider props and controls.",
      },
    },
  },
};

export const WithSx: Story = {
  render: function WithSxSlider(args) {
    const [value, setValue] = useState<number>(40);
    return (
      <div style={{ width: 420, padding: "1.5rem" }}>
        <Slider
          {...args}
          value={value}
          onChange={v => setValue(v as number)}
          sx={{ padding: 12, background: "var(--color-background-subtle)", borderRadius: 8 }}
        />
      </div>
    );
  },
};

export const RangeSlider: Story = {
  render: function RangeSliderStory() {
    const [value, setValue] = useState<[number, number]>([20, 80]);

    return (
      <div style={{ width: 400, padding: "2rem" }}>
        <Slider
          label="Price Range"
          min={0}
          max={1000}
          step={10}
          value={value}
          onChange={newValue => setValue(newValue as [number, number])}
          valueLabelDisplay="on"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Range slider for selecting a range of values between two points.",
      },
    },
  },
};

export const ContinuousSlider: Story = {
  render: function ContinuousSliderStory() {
    const [value, setValue] = useState<number>(50);

    return (
      <div style={{ width: 400, padding: "2rem" }}>
        <Slider
          label="Continuous Value"
          min={0}
          max={100}
          step={null}
          value={value}
          onChange={newValue => setValue(newValue as number)}
          valueLabelDisplay="on"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Continuous slider without step increments for smooth value selection.",
      },
    },
  },
};

export const StepSlider: Story = {
  render: function StepSliderStory() {
    const [value, setValue] = useState<number>(50);

    return (
      <div style={{ width: 400, padding: "2rem" }}>
        <Slider
          label="Step Slider"
          min={0}
          max={100}
          step={10}
          marks={true}
          value={value}
          onChange={newValue => setValue(newValue as number)}
          valueLabelDisplay="on"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Step slider with discrete increments and visual marks.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: function AllSizesSlider() {
    const [smallValue, setSmallValue] = useState<number>(25);
    const [mediumValue, setMediumValue] = useState<number>(50);
    const [largeValue, setLargeValue] = useState<number>(75);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}>
        <div style={{ width: 300 }}>
          <Slider
            label="Small Slider"
            size="small"
            value={smallValue}
            onChange={newValue => setSmallValue(newValue as number)}
          />
        </div>
        
        <div style={{ width: 350 }}>
          <Slider
            label="Medium Slider"
            size="medium"
            value={mediumValue}
            onChange={newValue => setMediumValue(newValue as number)}
          />
        </div>
        
        <div style={{ width: 400 }}>
          <Slider
            label="Large Slider"
            size="large"
            value={largeValue}
            onChange={newValue => setLargeValue(newValue as number)}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available sizes: small, medium, and large.",
      },
    },
  },
};

export const AllColors: Story = {
  render: function AllColorsSlider() {
    const [primaryValue, setPrimaryValue] = useState<number>(50);
    const [secondaryValue, setSecondaryValue] = useState<number>(50);
    const [successValue, setSuccessValue] = useState<number>(50);
    const [errorValue, setErrorValue] = useState<number>(50);
    const [warningValue, setWarningValue] = useState<number>(50);
    const [infoValue, setInfoValue] = useState<number>(50);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem" }}>
        <div style={{ width: 350 }}>
          <Slider
            label="Primary"
            color="primary"
            value={primaryValue}
            onChange={newValue => setPrimaryValue(newValue as number)}
          />
        </div>
        
        <div style={{ width: 350 }}>
          <Slider
            label="Secondary"
            color="secondary"
            value={secondaryValue}
            onChange={newValue => setSecondaryValue(newValue as number)}
          />
        </div>
        
        <div style={{ width: 350 }}>
          <Slider
            label="Success"
            color="success"
            value={successValue}
            onChange={newValue => setSuccessValue(newValue as number)}
          />
        </div>
        
        <div style={{ width: 350 }}>
          <Slider
            label="Error"
            color="error"
            value={errorValue}
            onChange={newValue => setErrorValue(newValue as number)}
          />
        </div>
        
        <div style={{ width: 350 }}>
          <Slider
            label="Warning"
            color="warning"
            value={warningValue}
            onChange={newValue => setWarningValue(newValue as number)}
          />
        </div>
        
        <div style={{ width: 350 }}>
          <Slider
            label="Info"
            color="info"
            value={infoValue}
            onChange={newValue => setInfoValue(newValue as number)}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available color variants.",
      },
    },
  },
};

export const AllStates: Story = {
  render: function AllStatesSlider() {
    const [normalValue, setNormalValue] = useState<number>(30);
    const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Normal State</h4>
          <div style={{ width: 350 }}>
            <Slider
              label="Normal slider"
              value={normalValue}
              onChange={newValue => setNormalValue(newValue as number)}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Range State</h4>
          <div style={{ width: 350 }}>
            <Slider
              label="Range slider"
              value={rangeValue}
              onChange={newValue => setRangeValue(newValue as [number, number])}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>With Marks</h4>
          <div style={{ width: 350 }}>
            <Slider
              label="Slider with marks"
              marks={true}
              step={20}
              value={60}
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Disabled State</h4>
          <div style={{ width: 350 }}>
            <Slider
              label="Disabled slider"
              disabled={true}
              value={40}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different slider states and configurations.",
      },
    },
  },
};

export const MinimumRange: Story = {
  render: function MinRangeSlider() {
    const [normalRange, setNormalRange] = useState<[number, number]>([25, 75]);
    const [minRangeValue, setMinRangeValue] = useState<[number, number]>([30, 70]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem" }}>
        <div style={{ width: 350 }}>
          <Slider
            label="Normal range slider"
            value={normalRange}
            onChange={newValue => setNormalRange(newValue as [number, number])}
            valueLabelDisplay="on"
          />
          <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.5rem" }}>
            No minimum range restriction
          </p>
        </div>
        
        <div style={{ width: 350 }}>
          <Slider
            label="Range with minimum distance (10)"
            value={minRangeValue}
            onChange={newValue => setMinRangeValue(newValue as [number, number])}
            minRange={10}
            valueLabelDisplay="on"
          />
          <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.5rem" }}>
            Thumbs must be at least 10 units apart
          </p>
        </div>
        
        <div style={{ width: 350 }}>
          <Slider
            label="Price range ($20-$500)"
            min={20}
            max={500}
            value={[50, 200]}
            minRange={20}
            step={10}
            marks={true}
            valueLabelDisplay="on"
          />
          <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.5rem" }}>
            Minimum $20 difference between values
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Range sliders with minimum distance constraints between thumbs.",
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: function InteractiveDemoSlider() {
    const [singleValue, setSingleValue] = useState(50);
    const [rangeValue, setRangeValue] = useState<[number, number]>([30, 70]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "2rem" }}>
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Single Slider - Click anywhere on track</h4>
          <div style={{ width: 400 }}>
            <Slider
              label="Click track to move thumb"
              value={singleValue}
              onChange={newValue => setSingleValue(newValue as number)}
              valueLabelDisplay="on"
            />
          </div>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>
            Current value: {singleValue}
          </p>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Range Slider - Thumbs cannot swap</h4>
          <div style={{ width: 400 }}>
            <Slider
              label="Click track to move nearest thumb"
              value={rangeValue}
              onChange={newValue => setRangeValue(newValue as [number, number])}
              valueLabelDisplay="on"
              minRange={5}
            />
          </div>
          <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>
            Current range: [{rangeValue[0]}, {rangeValue[1]}] - Min distance: 5
          </p>
        </div>
        
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Success Color Range</h4>
          <div style={{ width: 400 }}>
            <Slider
              label="Both thumbs same size and style"
              value={rangeValue}
              onChange={newValue => setRangeValue(newValue as [number, number])}
              valueLabelDisplay="on"
              color="success"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo showing track clicking, no thumb swapping, and consistent sizing.",
      },
    },
  },
};
