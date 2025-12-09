import type { Meta, StoryObj } from "@storybook/react";
import PillA from "@/components/PillA";

const meta = {
  title: "Components/PillA",
  component: PillA,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    letter: {
      control: { type: "text" },
      description: "The letter or character to display inside the pill",
      table: {
        defaultValue: { summary: "A" },
      },
    },
  },
} satisfies Meta<typeof PillA>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default PillA component with the letter 'A'.
 * A circular pill component with a purple background that displays a single letter or character in white text. 
 * Commonly used as step indicators or section markers.
 */
export const Default: Story = {
  args: {
    letter: "A",
  },
};

/**
 * PillA component showing different letters as used in step sequences.
 * Example showing how PillA is used with different letters to create step sequences (A, B, C, D) 
 * in tutorial or process flows.
 */
export const DifferentLetters: Story = {
  args: {
    letter: "B",
  },
};

/**
 * PillA component with numeric values.
 * While named 'letter', the prop can accept any single character including numbers 
 * for numbered steps or sequences.
 */
export const Numbers: Story = {
  args: {
    letter: "1",
  },
};

/**
 * PillA component with special characters or symbols.
 * The component can display special characters, making it versatile for different use cases 
 * like help indicators or status symbols.
 */
export const SpecialCharacters: Story = {
  args: {
    letter: "?",
  },
};
