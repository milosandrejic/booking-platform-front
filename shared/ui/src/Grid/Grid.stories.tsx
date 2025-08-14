import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta = {
  title: "Layout/Grid",
  component: Grid,
  argTypes: {
    spacing: { control: { type: "number", min: 0, max: 6 } },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    container: true,
    spacing: 2,
    children: (
      <>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Item 1
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Item 2
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Item 3
          </div>
        </Grid>
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    container: true,
    spacing: 3,
    children: (
      <>
        <Grid item xs={12} md={6}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Left Column
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Right Column
          </div>
        </Grid>
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    container: true,
    spacing: 2,
    children: (
      <>
        <Grid item xs={12} sm={4}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Column 1
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Column 2
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Column 3
          </div>
        </Grid>
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    container: true,
    spacing: 2,
    children: (
      <>
        <Grid item xs={12} sm={6} lg={3}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Column 1
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Column 2
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Column 3
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "20px", textAlign: "center" }}>
            Column 4
          </div>
        </Grid>
      </>
    ),
  },
};
