import type { Meta, StoryObj } from "@storybook/react";
import TutorialButton from "@/components/TutorialButton";

const meta = {
  title: "Components/TutorialButton",
  component: TutorialButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: { type: "text" },
      description: "The text displayed on the button",
    },
    onClick: {
      action: "clicked",
      description: "Function called when the button is clicked",
    },
  },
} satisfies Meta<typeof TutorialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default tutorial button with standard text and styling.
 * This is the standard tutorial button as used throughout the application. 
 * It features a dark theme with a play icon and distinctive shadow styling.
 */
export const Default: Story = {
  args: {
    text: "Click to watch tutorial",
  },
};

/**
 * Tutorial button with custom text content.
 * Demonstrates how the button adapts to different text content while maintaining its visual design.
 */
export const CustomText: Story = {
  args: {
    text: "Watch Demo Video",
  },
};

/**
 * Tutorial button with shorter text to show layout flexibility.
 * Shows how the button handles shorter text content.
 */
export const ShortText: Story = {
  args: {
    text: "Play",
  },
};

/**
 * Tutorial button with click interaction enabled.
 * Demonstrates the button's click interaction. Check the Actions panel to see click events.
 */
export const Interactive: Story = {
  args: {
    text: "Click to watch tutorial",
    onClick: () => console.log("Tutorial button clicked!"),
  },
};
