import type { Meta, StoryObj } from "@storybook/react";
import UsersForm from "@/components/UsersForm";

const meta = {
  title: "Components/UsersForm",
  component: UsersForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Main heading text for the form",
    },
    subtitle: {
      control: { type: "text" },
      description: "Subtitle text displayed below the main title",
    },
    nameLabel: {
      control: { type: "text" },
      description: "Label text for the name input field",
    },
    namePlaceholder: {
      control: { type: "text" },
      description: "Placeholder text for the name input field",
    },
    ageLabel: {
      control: { type: "text" },
      description: "Label text for the age input field",
    },
    agePlaceholder: {
      control: { type: "text" },
      description: "Placeholder text for the age input field",
    },
    buttonText: {
      control: { type: "text" },
      description: "Text displayed on the submit button",
    },
  },
} satisfies Meta<typeof UsersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default form with standard labels and placeholders.
 * This is the default configuration of the UsersForm component with standard text content.
 */
export const Default: Story = {
  args: {
    title: "Let's Get Started",
    subtitle: "Select the button on this card to get started",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your name",
    ageLabel: "Age",
    agePlaceholder: "Enter your age",
    buttonText: "Click Me",
    onSubmit: (data) => console.log("Form submitted with data:", data),
  },
};

/**
 * Form with customized text content and labels.
 * Demonstrates how the form can be customized with different text content for various use cases like registration.
 */
export const CustomContent: Story = {
  args: {
    title: "User Registration",
    subtitle: "Please fill out the form below to create your account",
    nameLabel: "Full Name",
    namePlaceholder: "John Doe",
    ageLabel: "Your Age",
    agePlaceholder: "25",
    buttonText: "Register Now",
    onSubmit: (data) => console.log("Registration submitted:", data),
  },
};

/**
 * Form configured for survey or data collection purposes.
 * Shows how the form can be adapted for survey or data collection scenarios with appropriate labeling.
 */
export const SurveyForm: Story = {
  args: {
    title: "Quick Survey",
    subtitle: "Help us understand our users better",
    nameLabel: "Name (Optional)",
    namePlaceholder: "Your name here",
    ageLabel: "Age Range",
    agePlaceholder: "e.g., 25-30",
    buttonText: "Submit Survey",
    onSubmit: (data) => console.log("Survey data:", data),
  },
};
