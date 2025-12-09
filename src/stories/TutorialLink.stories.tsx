import type { Meta, StoryObj } from "@storybook/react";
import TutorialLink from "@/components/TutorialLink";

const meta = {
  title: "Components/TutorialLink",
  component: TutorialLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: { type: "text" },
      description: "The text displayed in the tutorial link",
    },
    onClick: {
      action: "clicked",
      description: "Callback function when the link is clicked",
    },
  },
} satisfies Meta<typeof TutorialLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default tutorial link with standard text and styling.
 * This is the most common usage pattern found in the codebase. 
 * The component uses default styling with purple theme and play icon.
 */
export const Default: Story = {
  args: {
    text: "Watch Tutorial",
  },
};

/**
 * Tutorial link with custom text content.
 * Demonstrates how the component can be customized with different text 
 * while maintaining the same visual style and functionality.
 */
export const CustomText: Story = {
  args: {
    text: "Learn More",
  },
};

/**
 * Tutorial link with click handler to demonstrate interactivity.
 * Shows the component's interactive capabilities. In real usage, 
 * this would typically open a tutorial video or navigate to a tutorial page.
 */
export const Interactive: Story = {
  args: {
    text: "Start Tutorial",
    onClick: () => alert("Tutorial started!"),
  },
};
