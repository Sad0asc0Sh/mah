import type { Meta, StoryObj } from "@storybook/react";
import PageHeader from "@/components/PageHeader";

const meta = {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The main title text or React node to display",
    },
    highlightedText: {
      control: { type: "text" },
      description: "The highlighted text displayed below the title in purple",
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default PageHeader with both title and highlighted text.
 * Shows the component with its default prop values as defined in the source code.
 */
export const Default: Story = {
  args: {
    title: "Edit code",
    highlightedText: "Visually",
  },
};

/**
 * PageHeader with only a title and no highlighted text.
 * Demonstrates the component when highlightedText is empty, showing only the main title.
 */
export const TitleOnly: Story = {
  args: {
    title: "Collaborate on any production",
    highlightedText: "",
  },
};

/**
 * PageHeader used for marketing content with catchy phrases.
 * Example of how the component is used for marketing headlines and feature descriptions.
 */
export const MarketingHeadlines: Story = {
  args: {
    title: "Build & Maintain",
    highlightedText: "Design Systems",
  },
};
