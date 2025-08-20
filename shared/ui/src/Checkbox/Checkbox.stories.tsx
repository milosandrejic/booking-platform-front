import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "UI Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
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
    },
    checked: {
      control: { type: "boolean" },
    },
    defaultChecked: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const CheckboxWithState = (args: any) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={newChecked => setChecked(newChecked)}
    />
  );
};

export const Default: Story = {
  render: CheckboxWithState,
  args: {
    label: "Default checkbox",
  },
};

export const Checked: Story = {
  render: CheckboxWithState,
  args: {
    label: "Checked checkbox",
    checked: true,
  },
};

export const WithoutLabel: Story = {
  render: CheckboxWithState,
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px" 
      }}
    >
      <CheckboxWithState 
        label="Small checkbox" 
        size="small" 
      />
      <CheckboxWithState 
        label="Medium checkbox" 
        size="medium" 
      />
      <CheckboxWithState 
        label="Large checkbox" 
        size="large" 
      />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px" 
      }}
    >
      <CheckboxWithState 
        label="Primary" 
        color="primary" 
        checked 
      />
      <CheckboxWithState 
        label="Secondary" 
        color="secondary" 
        checked 
      />
      <CheckboxWithState 
        label="Success" 
        color="success" 
        checked 
      />
      <CheckboxWithState 
        label="Error" 
        color="error" 
        checked 
      />
      <CheckboxWithState 
        label="Warning" 
        color="warning" 
        checked 
      />
      <CheckboxWithState 
        label="Info" 
        color="info" 
        checked 
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px" 
      }}
    >
      <CheckboxWithState label="Normal" />
      <CheckboxWithState 
        label="Checked" 
        checked 
      />
      <CheckboxWithState 
        label="Disabled" 
        disabled 
      />
      <CheckboxWithState 
        label="Disabled checked" 
        disabled 
        checked 
      />
      <CheckboxWithState 
        label="Required" 
        required 
      />
    </div>
  ),
};

export const CustomIcons: Story = {
  render: () => {
    const heartOutlinePath = "M5.624 4.424C3.965 5.182 2.75 6.986 2.75 9.137c0 2.197.9 3.891 2.188 5.343c1.063 1.196 2.349 " +
      "2.188 3.603 3.154q.448.345.885.688c.526.415.995.778 1.448 1.043s.816.385 1.126.385s.674-.12 1.126-.385c.453-.265.922-.628 " +
      "1.448-1.043q.437-.344.885-.687c1.254-.968 2.54-1.959 3.603-3.155c1.289-1.452 2.188-3.146 2.188-5.343c0-2.15-1.215-3.955" +
      "-2.874-4.713c-1.612-.737-3.778-.542-5.836 1.597a.75.75 0 0 1-1.08 0C9.402 3.882 7.236 3.687 5.624 4.424M12 4.46C9.688 2.39 " +
      "7.099 2.1 5 3.059C2.786 4.074 1.25 6.426 1.25 9.138c0 2.665 1.11 4.699 2.567 6.339c1.166 1.313 2.593 2.412 3.854 " +
      "3.382q.43.33.826.642c.513.404 1.063.834 1.62 1.16s1.193.59 1.883.59s1.326-.265 1.883-.59c.558-.326 1.107-.756 " +
      "1.62-1.16q.396-.312.826-.642c1.26-.97 2.688-2.07 3.854-3.382c1.457-1.64 2.567-3.674 2.567-6.339c0-2.712-1.535-5.064" +
      "-3.75-6.077c-2.099-.96-4.688-.67-7 1.399";
    
    const heartFilledPath = "M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 " +
      "3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137";

    const HeartIconOutline = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <path 
          fill="currentColor" 
          fillRule="evenodd" 
          d={heartOutlinePath}
          clipRule="evenodd"
        />
      </svg>
    );

    const HeartIconFilled = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <path 
          fill="currentColor" 
          d={heartFilledPath}
        />
      </svg>
    );

    return (
      <div 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "24px" 
        }}
      >
        <div>
          <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Basic Custom Icons</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <CheckboxWithState 
              label="Like button (Instagram style)" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="error"
            />
            <CheckboxWithState 
              label="Favorite item" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="primary"
            />
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Different Sizes</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <CheckboxWithState 
              label="Small heart" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="error"
              size="small"
            />
            <CheckboxWithState 
              label="Medium heart" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="error"
              size="medium"
            />
            <CheckboxWithState 
              label="Large heart" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="error"
              size="large"
            />
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>Different Colors</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <CheckboxWithState 
              label="Primary" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="primary"
              checked
            />
            <CheckboxWithState 
              label="Success" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="success"
              checked
            />
            <CheckboxWithState 
              label="Error" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="error"
              checked
            />
            <CheckboxWithState 
              label="Warning" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="warning"
              checked
            />
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>States</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <CheckboxWithState 
              label="Normal state" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="error"
            />
            <CheckboxWithState 
              label="Checked state" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="error"
              checked
            />
            <CheckboxWithState 
              label="Disabled unchecked" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="error"
              disabled
            />
            <CheckboxWithState 
              label="Disabled checked" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="error"
              disabled
              checked
            />
            <CheckboxWithState 
              label="Required field" 
              icon={<HeartIconOutline />}
              checkedIcon={<HeartIconFilled />}
              color="error"
              required
            />
          </div>
        </div>
      </div>
    );
  },
};

const InteractiveExample = () => {
  const [items, setItems] = useState([
    { id: 1, label: "Item 1", checked: false }, { id: 2, label: "Item 2", checked: true }, { id: 3, label: "Item 3", checked: false },
  ]);

  const handleItemChange = (id: number, checked: boolean) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked } : item
    ));
  };

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked);

  const handleSelectAll = (checked: boolean) => {
    setItems(prev => prev.map(item => ({ ...item, checked })));
  };

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "12px" 
      }}
    >
      <Checkbox
        label="Select All"
        checked={allChecked}
        onChange={handleSelectAll}
        style={{ 
          opacity: someChecked && !allChecked ? 0.6 : 1,
          fontWeight: 600 
        }}
      />
      <hr 
        style={{ 
          margin: "8px 0", 
          border: "none", 
          borderTop: "1px solid #e0e0e0" 
        }} 
      />
      {
        items.map(item =>
          <Checkbox
            key={item.id}
            label={item.label}
            checked={item.checked}
            onChange={checked => handleItemChange(item.id, checked)}
            style={{ marginLeft: "24px" }}
          />
        )
      }
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveExample />,
};
