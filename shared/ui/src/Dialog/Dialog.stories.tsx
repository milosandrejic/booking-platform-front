"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, type DialogProps } from "./Dialog";
import { Button } from "../Button";

const meta: Meta<typeof Dialog> = {
  title: "Feedback/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A modal dialog component with Portal support for displaying content above the main page.",
      },
    },
  },
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: "Whether the dialog is open",
      table: { defaultValue: { summary: "false" } },
    },
    disablePortal: {
      control: { type: "boolean" },
      description: "Disable rendering in a portal",
      table: { defaultValue: { summary: "false" } },
    },
    disableBackdropClick: {
      control: { type: "boolean" },
      description: "Disable closing on backdrop click",
      table: { defaultValue: { summary: "false" } },
    },
    disableEscapeKeyDown: {
      control: { type: "boolean" },
      description: "Disable closing on Escape key",
      table: { defaultValue: { summary: "false" } },
    },
    maxWidth: {
      control: { type: "select" },
      options: [
        "xs",
        "sm", 
        "md",
        "lg",
        "xl",
        false,
      ],
      description: "Maximum width of the dialog",
      table: { defaultValue: { summary: "sm" } },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Take full width up to maxWidth",
      table: { defaultValue: { summary: "false" } },
    },
    fullScreen: {
      control: { type: "boolean" },
      description: "Make dialog full screen",
      table: { defaultValue: { summary: "false" } },
    },
    scroll: {
      control: { type: "select" },
      options: ["paper", "body"],
      description: "Scroll behavior",
      table: { defaultValue: { summary: "paper" } },
    },
  },
  args: {
    open: false,
    disablePortal: false,
    disableBackdropClick: false,
    disableEscapeKeyDown: false,
    maxWidth: "sm",
    fullWidth: false,
    fullScreen: false,
    scroll: "paper",
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: function BasicDialog(args: DialogProps) {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Dialog
        </Button>

        <Dialog {...args} open={open} onClose={() => setOpen(false)}>
          <DialogTitle>
            Confirm Action
          </DialogTitle>

          <DialogContent>
            <p>
              Are you sure you want to perform this action? This operation cannot be undone.
            </p>
          </DialogContent>

          <DialogActions>
            <Button variant="text" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Basic dialog with title, content, and action buttons.",
      },
    },
  },
};

export const Sizes: Story = {
  render: function SizesDialog() {
    const [openSize, setOpenSize] = useState<DialogProps["maxWidth"] | null>(null);
    const sizes: DialogProps["maxWidth"][] = [
      "xs",
      "sm",
      "md", 
      "lg",
      "xl",
    ];

    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {sizes.map(size => (
          <Button
            key={String(size)}
            variant="outlined"
            onClick={() => setOpenSize(size)}
          >
            Open {size}
          </Button>
        ))}

        <Dialog
          open={openSize !== null}
          onClose={() => setOpenSize(null)}
          maxWidth={openSize || "sm"}
        >
          <DialogTitle>
            Dialog Size: {openSize}
          </DialogTitle>

          <DialogContent>
            <p>
              This dialog demonstrates the {openSize} size variant.
            </p>
          </DialogContent>

          <DialogActions>
            <Button variant="text" onClick={() => setOpenSize(null)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different dialog sizes from xs to xl.",
      },
    },
  },
};

export const WithDividers: Story = {
  render: function DividersDialog() {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Dialog with Dividers
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
          <DialogTitle>
            Long Content Example
          </DialogTitle>

          <DialogContent dividers>
            <p>
              This dialog content has dividers enabled, which adds borders above and below 
              the content area to clearly separate it from the title and actions.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </DialogContent>

          <DialogActions>
            <Button variant="text" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Dialog with dividers around the content for visual separation.",
      },
    },
  },
};

export const WithSx: Story = {
  render: function WithSxDialog() {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Open Styled Dialog
        </Button>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          sx={theme => ({
            border: `2px solid ${theme.color.primary.main}`,
            borderRadius: "16px",
          })}
        >
          <DialogTitle
            sx={{
              backgroundColor: "var(--color-primary-main)",
              color: "var(--color-primary-contrast-text)",
            }}
          >
            Custom Styled Dialog
          </DialogTitle>

          <DialogContent>
            <p>
              This dialog demonstrates custom styling using the sx prop.
            </p>
          </DialogContent>

          <DialogActions>
            <Button variant="text" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Dialog with custom styling using the sx prop.",
      },
    },
  },
};
