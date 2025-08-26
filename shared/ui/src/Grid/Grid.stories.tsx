import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "./Grid";

/**
 * Grid component provides a flexible CSS Grid layout system with responsive breakpoints.
 * 
 * Features:
 * - Container and item modes
 * - Responsive breakpoints (xs, sm, md, lg, xl)
 * - Flexible spacing system
 * - Auto-sizing capabilities
 * - Direction control (row, column)
 * - Alignment options
 * - SSR compatible
 */
const meta = {
  title: "Layout/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A responsive grid system component that provides flexible layout options with breakpoint-based sizing and spacing control.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "Grid content - either grid items (when container) or content (when item)",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    container: {
      control: { type: "boolean" },
      description: "If true, the component will act as a grid container",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    item: {
      control: { type: "boolean" },
      description: "If true, the component will act as a grid item",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    spacing: {
      control: { type: "number", min: 0, max: 6 },
      description: "Spacing between grid items (0-6)",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    xs: {
      control: { type: "number", min: 1, max: 12 },
      description: "Grid size for extra small screens",
    },
    sm: {
      control: { type: "number", min: 1, max: 12 },
      description: "Grid size for small screens",
    },
    md: {
      control: { type: "number", min: 1, max: 12 },
      description: "Grid size for medium screens",
    },
    lg: {
      control: { type: "number", min: 1, max: 12 },
      description: "Grid size for large screens",
    },
    xl: {
      control: { type: "number", min: 1, max: 12 },
      description: "Grid size for extra large screens",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS class names",
    },
  },
  args: {
    container: true,
    item: false,
    spacing: 2,
    children: (
      <>
        <Grid item xs={12} sm={6} md={4}>
          <div
            style={{
              backgroundColor: "#e3f2fd",
              padding: "1.5rem",
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Item 1</h4>
            <p style={{ margin: "0", color: "#666", fontSize: "0.875rem" }}>
              xs=12, sm=6, md=4
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div
            style={{
              backgroundColor: "#e8f5e8",
              padding: "1.5rem",
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Item 2</h4>
            <p style={{ margin: "0", color: "#666", fontSize: "0.875rem" }}>
              xs=12, sm=6, md=4
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <div
            style={{
              backgroundColor: "#fff3e0",
              padding: "1.5rem",
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Item 3</h4>
            <p style={{ margin: "0", color: "#666", fontSize: "0.875rem" }}>
              xs=12, sm=12, md=4
            </p>
          </div>
        </Grid>
      </>
    ),
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default grid container with responsive items and spacing.",
      },
    },
  },
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test grid container props and controls.",
      },
    },
  },
};

export const WithSx: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <div>Above</div>
      <Grid container spacing={2} sx={{ padding: 12, background: "var(--color-background-subtle)", borderRadius: 8 }}>
        <Grid item xs={6}><div style={{ background: "#eee", padding: 8 }}>xs=6</div></Grid>
        <Grid item xs={6}><div style={{ background: "#eee", padding: 8 }}>xs=6</div></Grid>
      </Grid>
      <div>Below</div>
    </div>
  ),
};

export const AllBreakpoints: Story = {
  render: function AllBreakpointsGrid() {
    const breakpoints = [
      { label: "XS (12 cols)", xs: 12 },
      { label: "SM (6 cols)", xs: 12, sm: 6 },
      { label: "MD (4 cols)", xs: 12, sm: 6, md: 4 },
      { label: "LG (3 cols)", xs: 12, sm: 6, md: 4, lg: 3 },
      { label: "XL (2 cols)", xs: 12, sm: 6, md: 4, lg: 3, xl: 2 },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {breakpoints.map((breakpoint, index) => (
          <div key={index}>
            <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
              {breakpoint.label}
            </h4>
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, itemIndex) => (
                <Grid key={itemIndex} item {...breakpoint}>
                  <div
                    style={{
                      backgroundColor: "#e3f2fd",
                      padding: "1rem",
                      textAlign: "center",
                      borderRadius: "4px",
                      fontSize: "0.875rem",
                    }}
                  >
                    Item {itemIndex + 1}
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Grid items with different breakpoint configurations showing responsive behavior.",
      },
    },
  },
};

export const AllSpacings: Story = {
  render: function AllSpacingsGrid() {
    const spacings = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {spacings.map(spacing => (
          <div key={spacing}>
            <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
              Spacing: {spacing}
            </h4>
            <Grid container spacing={spacing}>
              <Grid item xs={6}>
                <div
                  style={{
                    backgroundColor: "#e3f2fd",
                    padding: "1rem",
                    textAlign: "center",
                    borderRadius: "4px",
                  }}
                >
                  Item 1
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  style={{
                    backgroundColor: "#e8f5e8",
                    padding: "1rem",
                    textAlign: "center",
                    borderRadius: "4px",
                  }}
                >
                  Item 2
                </div>
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different spacing values (0-6) showing gap variations between grid items.",
      },
    },
  },
};

export const AllLayouts: Story = {
  render: function AllLayoutsGrid() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* Two Columns */}
        <div>
          <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
            Two Columns (50/50)
          </h4>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div
                style={{
                  backgroundColor: "#e3f2fd",
                  padding: "2rem",
                  textAlign: "center",
                  borderRadius: "8px",
                }}
              >
                <h5 style={{ margin: "0 0 1rem 0" }}>Left Column</h5>
                <p style={{ margin: "0", color: "#666" }}>
                  xs=12, md=6 - Full width on mobile, half on desktop
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                style={{
                  backgroundColor: "#e8f5e8",
                  padding: "2rem",
                  textAlign: "center",
                  borderRadius: "8px",
                }}
              >
                <h5 style={{ margin: "0 0 1rem 0" }}>Right Column</h5>
                <p style={{ margin: "0", color: "#666" }}>
                  xs=12, md=6 - Full width on mobile, half on desktop
                </p>
              </div>
            </Grid>
          </Grid>
        </div>

        {/* Three Columns */}
        <div>
          <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
            Three Columns (33/33/33)
          </h4>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <div
                style={{
                  backgroundColor: "#fff3e0",
                  padding: "1.5rem",
                  textAlign: "center",
                  borderRadius: "8px",
                }}
              >
                Column 1
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div
                style={{
                  backgroundColor: "#fce4ec",
                  padding: "1.5rem",
                  textAlign: "center",
                  borderRadius: "8px",
                }}
              >
                Column 2
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div
                style={{
                  backgroundColor: "#f3e5f5",
                  padding: "1.5rem",
                  textAlign: "center",
                  borderRadius: "8px",
                }}
              >
                Column 3
              </div>
            </Grid>
          </Grid>
        </div>

        {/* Sidebar Layout */}
        <div>
          <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
            Sidebar Layout (75/25)
          </h4>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <div
                style={{
                  backgroundColor: "#e3f2fd",
                  padding: "2rem",
                  borderRadius: "8px",
                }}
              >
                <h5 style={{ margin: "0 0 1rem 0" }}>Main Content</h5>
                <p style={{ margin: "0", color: "#666", lineHeight: 1.6 }}>
                  This is the main content area. It takes up 9/12 columns on desktop (75% width)
                  and full width on mobile. Perfect for articles, product details, or primary content.
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "1.5rem",
                  borderRadius: "8px",
                }}
              >
                <h6 style={{ margin: "0 0 1rem 0" }}>Sidebar</h6>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0", borderRadius: "4px", fontSize: "0.875rem" }}>
                    Widget 1
                  </div>
                  <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0", borderRadius: "4px", fontSize: "0.875rem" }}>
                    Widget 2
                  </div>
                  <div style={{ padding: "0.5rem", backgroundColor: "#e0e0e0", borderRadius: "4px", fontSize: "0.875rem" }}>
                    Widget 3
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Common layout patterns using grid: two columns, three columns, and sidebar layout.",
      },
    },
  },
};
