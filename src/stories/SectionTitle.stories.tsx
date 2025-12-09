import type { Meta, StoryObj } from "@storybook/react";
import SectionTitle from "@/components/SectionTitle";

const meta = {
  title: "Components/SectionTitle",
  component: SectionTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "The title text content to display",
    },
  },
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default section title with standard styling.
 * Basic section title using the default text. The component uses the Brockmann font family with large text styling.
 */
export const Default: Story = {
  args: {
    children: "Section Title",
  },
};

/**
 * Section title as used in tutorial pages with instructional content.
 * Example of how section titles are used in tutorial contexts with descriptive, actionable content.
 */
export const TutorialSection: Story = {
  args: {
    children: "Copy & paste clean react with static values",
  },
};

/**
 * Section title with longer text content to demonstrate text wrapping.
 * Demonstrates how the component handles longer text content with proper line wrapping and maintains readability.
 */
export const LongContent: Story = {
  args: {
    children: 'First, learn to switch between "Design" and "Interact" modes.',
  },
};
