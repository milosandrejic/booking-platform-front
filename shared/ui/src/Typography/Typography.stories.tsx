import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta = {
  title: "UI Components/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "displayLarge",
        "displayMedium",
        "displaySmall",
        "headlineLarge",
        "headlineMedium",
        "headlineSmall",
        "titleLarge",
        "titleMedium",
        "titleSmall",
        "bodyLarge",
        "bodyMedium",
        "bodySmall",
        "labelLarge",
        "labelMedium",
        "labelSmall",
      ],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Typography",
  },
};

export const DisplayLarge: Story = {
  args: {
    variant: "displayLarge",
    children: "Display Large",
  },
};

export const HeadlineLarge: Story = {
  args: {
    variant: "headlineLarge",
    children: "Headline Large",
  },
};

export const TitleLarge: Story = {
  args: {
    variant: "titleLarge",
    children: "Title Large",
  },
};

export const BodyLarge: Story = {
  args: {
    variant: "bodyLarge",
    children: "Body Large",
  },
};

export const LabelLarge: Story = {
  args: {
    variant: "labelLarge",
    children: "Label Large",
  },
};
