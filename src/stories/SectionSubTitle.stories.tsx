import type { Meta, StoryObj } from "@storybook/react";
import SectionSubTitle from "@/components/SectionSubTitle";

const meta = {
  title: "Components/SectionSubTitle",
  component: SectionSubTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "The subtitle content to display",
    },
  },
} satisfies Meta<typeof SectionSubTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default subtitle with standard text content.
 * The basic subtitle component used throughout the application to provide secondary descriptive text below section titles.
 */
export const Default: Story = {
  args: {
    children: "Subtitle text",
  },
};

/**
 * Subtitle with short, concise text.
 * Example of a short, action-oriented subtitle commonly used in tutorial sections.
 */
export const ShortText: Story = {
  args: {
    children: "Got an existing codebase? Import it.",
  },
};

/**
 * Subtitle with longer text that spans multiple lines.
 * Demonstrates how the component handles longer descriptive text that naturally wraps to multiple lines.
 */
export const MultiLineText: Story = {
  args: {
    children:
      "Tempo preserves component structure but transforms variables and props to static values",
  },
};
