import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./Container";

/**
 * Container component provides consistent layout and spacing for content.
 * 
 * Features:
 * - Multiple max-width breakpoints (xs, sm, md, lg, xl, 2xl)
 * - Fixed positioning option
 * - Gutter control
 * - Spacing variants (compact, default, comfortable)
 * - Responsive behavior
 * - SSR compatible
 */
const meta = {
  title: "Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A responsive container component that centers content and provides consistent spacing across different screen sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "Content to be contained within the container",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    maxWidth: {
      control: { type: "select" },
      options: [
        "xs",
        "sm", 
        "md",
        "lg",
        "xl",
        "2xl"
      ],
      description: "Maximum width breakpoint for the container",
      table: {
        defaultValue: { summary: "xl" },
      },
    },
    fixed: {
      control: { type: "boolean" },
      description: "Whether the container has fixed positioning",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disableGutters: {
      control: { type: "boolean" },
      description: "Whether to disable horizontal gutters",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    spacing: {
      control: { type: "select" },
      options: ["compact", "default", "comfortable"],
      description: "Spacing variant for internal padding",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS class names",
    },
  },
  args: {
    maxWidth: "xl",
    spacing: "default",
    fixed: false,
    disableGutters: false,
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          backgroundColor: "#e3f2fd",
          padding: "1.5rem",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h3 style={{ margin: "0 0 1rem 0" }}>Container Content</h3>
        <p style={{ margin: "0", color: "#666" }}>
          This content is contained within a responsive container.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Default container with medium max-width and default spacing.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    children: (
      <div
        style={{
          backgroundColor: "#e3f2fd",
          padding: "1.5rem",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h3 style={{ margin: "0 0 1rem 0" }}>Playground Container</h3>
        <p style={{ margin: "0", color: "#666" }}>
          Use the controls to test different container configurations.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all container props and controls.",
      },
    },
  },
};

export const AllMaxWidths: Story = {
  render: function AllMaxWidthsContainer(args) {
    const widths = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
    ] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {
          widths.map(width => (
            <Container
              key={width}
              {...args}
              maxWidth={width}
            >
              <div
                style={{
                  backgroundColor: "#e3f2fd",
                  padding: "1rem",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "0.875rem",
                }}
              >
                Max-width: {width}
              </div>
            </Container>
          ))
        }
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available max-width options from xs to 2xl.",
      },
    },
  },
};

export const AllSpacing: Story = {
  render: function AllSpacingContainer(args) {
    const spacings = ["compact", "default", "comfortable"] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {
          spacings.map(spacing => (
            <Container
              key={spacing}
              {...args}
              spacing={spacing}
            >
              <div
                style={{
                  backgroundColor: "#e8f5e8",
                  padding: "1rem",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <h4 style={{ margin: "0 0 0.5rem 0", textTransform: "capitalize" }}>
                  {spacing} Spacing
                </h4>
                <p style={{ margin: "0", fontSize: "0.875rem", color: "#666" }}>
                  Container with {spacing} internal spacing
                </p>
              </div>
            </Container>
          ))
        }
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different spacing variants: compact, default, and comfortable.",
      },
    },
  },
};

export const AllStates: Story = {
  render: function AllStatesContainer(args) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Container {...args}>
          <div
            style={{ 
              backgroundColor: "#e3f2fd", 
              padding: "1rem", 
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            Normal Container
          </div>
        </Container>

        <Container {...args} fixed>
          <div
            style={{ 
              backgroundColor: "#fff3e0", 
              padding: "1rem", 
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            Fixed Container
          </div>
        </Container>

        <Container {...args} disableGutters>
          <div
            style={{ 
              backgroundColor: "#fce4ec", 
              padding: "1rem", 
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            No Gutters Container
          </div>
        </Container>

        <Container {...args} fixed disableGutters>
          <div
            style={{ 
              backgroundColor: "#e8f5e8", 
              padding: "1rem", 
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            Fixed + No Gutters Container
          </div>
        </Container>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different container states: normal, fixed, no gutters, and combined states.",
      },
    },
  },
};

export const InLayout: Story = {
  render: function InLayoutContainer(args) {
    return (
      <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        {/* Header */}
        <Container maxWidth="xl" disableGutters>
          <div
            style={{ 
              backgroundColor: "#1976d2", 
              color: "white",
              padding: "1rem 2rem",
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: "0" }}>Website Header</h2>
          </div>
        </Container>

        {/* Main Content */}
        <Container {...args} style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <div
            style={{ 
              backgroundColor: "white", 
              padding: "2rem", 
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ margin: "0 0 1rem 0" }}>Main Content Area</h3>
            <p style={{ margin: "0 0 1rem 0", lineHeight: 1.6 }}>
              This demonstrates how containers work in a typical layout. The header uses 
              xl max-width with no gutters, while the main content uses the default settings.
            </p>
            <p style={{ margin: "0", color: "#666", fontSize: "0.875rem" }}>
              Container max-width: {args.maxWidth} | Spacing: {args.spacing}
            </p>
          </div>
        </Container>

        {/* Footer */}
        <Container maxWidth="xl" disableGutters>
          <div
            style={{ 
              backgroundColor: "#424242", 
              color: "white",
              padding: "1rem 2rem",
              textAlign: "center",
            }}
          >
            <p style={{ margin: "0", fontSize: "0.875rem" }}>Website Footer</p>
          </div>
        </Container>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example of containers in a complete layout with header, main content, and footer.",
      },
    },
  },
};

export const Compact: Story = {
  args: {
    maxWidth: "md",
    spacing: "compact",
    disableGutters: false,
  },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>Compact spacing</div>
    </Container>
  ),
};

export const Comfortable: Story = {
  args: {
    maxWidth: "md",
    spacing: "comfortable",
    disableGutters: false,
  },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>Comfortable spacing</div>
    </Container>
  ),
};

export const Wide: Story = {
  args: {
    maxWidth: "2xl",
    spacing: "default",
    disableGutters: false,
  },
  render: args => (
    <Container {...args}>
      <div style={{ backgroundColor: "#e3f2fd", padding: 20, borderRadius: 8 }}>Wide (2xl) container</div>
    </Container>
  ),
};

export const WithSx: Story = {
  render: args => (
    <Container {...args} sx={{ backgroundColor: "var(--color-background-subtle)", padding: 24, borderRadius: 12 }}>
      <div style={{ backgroundColor: "white", padding: 16, borderRadius: 8, border: "1px solid var(--color-border-main)" }}>
        Container styled with sx
      </div>
    </Container>
  ),
};
