import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Alert, type AlertProps } from "./Alert";
import { Button } from "../Button";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Display brief, important messages in a way that attracts attention without interrupting the user's task.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "standard"],
      description: "Visual style variant of the alert",
      table: { defaultValue: { summary: "standard" } },
    },
    severity: {
      control: { type: "select" },
      options: [
        "success",
        "info",
        "warning",
        "error",
      ],
      description: "Severity level that determines color and default icon",
      table: { defaultValue: { summary: "info" } },
    },
    icon: {
      control: { type: "boolean" },
      description: "Custom icon or false to hide icon. Default icons are provided per severity.",
      table: { defaultValue: { summary: "default icon" } },
      mapping: {
        true: undefined,
        false: false,
      },
    },
    onClose: {
      action: "closed",
      description: "Callback fired when close button is clicked. Shows close button when provided.",
    },
    closeIcon: {
      control: { type: "boolean" },
      description: "Custom close icon. Defaults to X icon when not provided.",
      table: { defaultValue: { summary: "default close icon" } },
      mapping: {
        true: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
        false: undefined,
      },
    },
    title: {
      control: { type: "text" },
      description: "Optional title text displayed above the main message",
    },
    action: {
      control: { type: "boolean" },
      description: "Custom action element (button, link, etc.) instead of close button",
      mapping: {
        true: (
          <button type="button" style={{ padding: "4px 8px", fontSize: "12px" }}>
            Action
          </button>
        ),
        false: undefined,
      },
    },
  },
  args: {
    variant: "standard",
    severity: "info",
    icon: true,
    children: "This is an alert message.",
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: function DefaultAlert(args: AlertProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return (
        <div>
          <Button onClick={() => setIsVisible(true)}>
            Show Alert
          </Button>
        </div>
      );
    }

    return (
      <Alert
        {...args}
        onClose={args.onClose ? () => setIsVisible(false) : undefined}
      >
        This is a default alert message with interactive close functionality.
      </Alert>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Default alert with interactive close functionality.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: function AllVariantsAlert() {
    const variants: AlertProps["variant"][] = ["filled", "standard", "outlined"];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {variants.map(variant => (
          <Alert key={variant} variant={variant} severity="info">
            This is a {variant} alert variant.
          </Alert>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available alert variants: filled and outlined.",
      },
    },
  },
};

export const AllSeverities: Story = {
  render: function AllSeveritiesAlert() {
    const severities: AlertProps["severity"][] = [
      "success",
      "info", 
      "warning",
      "error",
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h3>Filled Variant</h3>
        {severities.map(severity => (
          <Alert key={`filled-${severity}`} variant="filled" severity={severity}>
            This is a {severity} alert with filled variant.
          </Alert>
        ))}

        <h3 style={{ marginTop: 24 }}>Standard Variant (Default)</h3>
        {severities.map(severity => (
          <Alert key={`standard-${severity}`} variant="standard" severity={severity}>
            This is a {severity} alert with standard variant.
          </Alert>
        ))}

        <h3 style={{ marginTop: 24 }}>Outlined Variant</h3>
        {severities.map(severity => (
          <Alert key={`outlined-${severity}`} variant="outlined" severity={severity}>
            This is a {severity} alert with outlined variant.
          </Alert>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All severity levels in all variants: filled, standard (default), and outlined.",
      },
    },
  },
};

export const WithCloseButton: Story = {
  render: function WithCloseButtonAlert() {
    const [showSuccess, setShowSuccess] = useState(true);
    const [showWarning, setShowWarning] = useState(true);
    const [showError, setShowError] = useState(true);

    const resetAlerts = () => {
      setShowSuccess(true);
      setShowWarning(true);
      setShowError(true);
    };

    const allDismissed = !showSuccess && !showWarning && !showError;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {allDismissed && (
          <div style={{ textAlign: "center", padding: 20 }}>
            <p>All alerts dismissed!</p>
            <Button onClick={resetAlerts}>
              Reset Alerts
            </Button>
          </div>
        )}

        {
          showSuccess &&
          <Alert
            severity="success"
            variant="outlined"
            onClose={() => setShowSuccess(false)}
          >
            Success message with close button!
          </Alert>
        }

        {
          showWarning &&
          <Alert
            severity="warning"
            variant="outlined"
            onClose={() => setShowWarning(false)}
          >
            Warning message with close button!
          </Alert>
        }

        {
          showError &&
          <Alert
            severity="error"
            variant="outlined"
            onClose={() => setShowError(false)}
          >
            Error message with close button!
          </Alert>
        }
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Alerts with close functionality. Click the X button to dismiss each alert.",
      },
    },
  },
};

export const CustomIcon: Story = {
  render: function CustomIconAlert() {
    const customIcon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Alert severity="info" icon={customIcon}>
          Alert with custom star icon.
        </Alert>

        <Alert severity="warning" icon={false}>
          Alert with no icon.
        </Alert>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Alerts with custom icons or no icon. Pass a custom React element or false to hide the icon.",
      },
    },
  },
};

export const WithSx: Story = {
  render: function WithSxAlert() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Alert
          severity="info"
          variant="outlined"
          sx={{
            border: theme => `2px solid ${theme.color.primary.main}`,
            borderRadius: "12px",
            backgroundColor: theme => theme.color.primary.light,
          }}
        >
          Alert with custom styling using sx prop.
        </Alert>

        <Alert
          severity="success"
          sx={{
            padding: "var(--spacing-5)",
            fontSize: "var(--font-size-base)",
            fontWeight: "600",
          }}
        >
          Alert with increased padding and font weight.
        </Alert>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Alerts with custom styling using the sx prop.",
      },
    },
  },
};

export const WithTitleAndActions: Story = {
  render: function WithTitleAndActionsAlert() {
    const [showAlert1, setShowAlert1] = useState(true);
    const [showAlert2, setShowAlert2] = useState(true);
    const [showAlert3, setShowAlert3] = useState(true);

    const resetAlerts = () => {
      setShowAlert1(true);
      setShowAlert2(true);
      setShowAlert3(true);
    };

    const allDismissed = !showAlert1 && !showAlert2 && !showAlert3;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {allDismissed && (
          <div style={{ textAlign: "center", padding: 20 }}>
            <p>All alerts dismissed!</p>
            <button type="button" onClick={resetAlerts}>
              Reset Alerts
            </button>
          </div>
        )}

        {
          showAlert1 &&
          <Alert
            severity="success"
            variant="standard"
            title="Payment Successful"
            onClose={() => setShowAlert1(false)}
          >
            Your payment has been processed successfully. You will receive a confirmation email shortly.
          </Alert>
        }

        {
          showAlert2 &&
          <Alert
            severity="warning"
            variant="filled"
            title="Account Verification Required"
            action={
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {}}
                  style={{ background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.4)" }}
                >
                  Verify Now
                </Button>

                <Button
                  variant="text"
                  size="small"
                  onClick={() => setShowAlert2(false)}
                >
                  ✕
                </Button>
              </div>
            }
          >
            Please verify your email address to access all features.
          </Alert>
        }

        {
          showAlert3 &&
          <Alert
            severity="error"
            variant="outlined"
            title="Connection Error"
            action={
              <Button 
                size="small"
                onClick={() => setShowAlert3(false)}
                style={{ backgroundColor: "var(--color-error-main)" }}
              >
                Retry
              </Button>
            }
          >
            Unable to connect to the server. Please check your internet connection.
          </Alert>
        }
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Alerts with titles and custom actions instead of close buttons.",
      },
    },
  },
};

export const CustomCloseIcon: Story = {
  render: function CustomCloseIconAlert() {
    const [showAlert1, setShowAlert1] = useState(true);
    const [showAlert2, setShowAlert2] = useState(true);

    const customCloseIcon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    );

    const resetAlerts = () => {
      setShowAlert1(true);
      setShowAlert2(true);
    };

    const allDismissed = !showAlert1 && !showAlert2;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {allDismissed && (
          <div style={{ textAlign: "center", padding: 20 }}>
            <p>All alerts dismissed!</p>
            <button type="button" onClick={resetAlerts}>
              Reset Alerts
            </button>
          </div>
        )}

        {
          showAlert1 &&
          <Alert
            severity="info"
            variant="filled"
            onClose={() => setShowAlert1(false)}
          >
            Alert with default close icon (Solar design).
          </Alert>
        }

        {
          showAlert2 &&
          <Alert
            severity="warning"
            variant="outlined"
            onClose={() => setShowAlert2(false)}
            closeIcon={customCloseIcon}
          >
            Alert with custom close icon (simple lines).
          </Alert>
        }
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Alerts with default and custom close icons. The close icon can be customized by passing a React element.",
      },
    },
  },
};
