import type { Meta, StoryObj } from "@storybook/react";
import BalanceCard from "@/components/BalanceCard";

const meta = {
  title: "Components/BalanceCard",
  component: BalanceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The title displayed at the top of the card",
    },
    cardNumber: {
      control: { type: "text" },
      description: "The card number or identifier displayed on the card",
    },
    balance: {
      control: { type: "text" },
      description: "The balance amount displayed on the card",
    },
    logoSrc: {
      control: { type: "text" },
      description: "URL for the logo image displayed on the card",
    },
    logoAlt: {
      control: { type: "text" },
      description: "Alt text for the logo image",
    },
  },
} satisfies Meta<typeof BalanceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default balance card with standard styling and content.
 * The default appearance of the balance card as it appears in the application.
 */
export const Default: Story = {
  args: {
    title: "Balance",
    cardNumber: "•••• 1824",
    balance: "$ 2451",
    logoSrc:
      "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fgithub%7C45309499-1762958726624-node-3464%3A42882-1762958726228.png",
    logoAlt: "Logo",
  },
};

/**
 * Balance card configured to display credit card information.
 * Example showing the card configured for credit card display.
 */
export const CreditCard: Story = {
  args: {
    title: "Credit Card",
    cardNumber: "•••• 4532",
    balance: "$ 1,250.00",
    logoSrc:
      "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fgithub%7C45309499-1762958726624-node-3464%3A42882-1762958726228.png",
    logoAlt: "Credit Card Logo",
  },
};

/**
 * Balance card showing savings account information.
 * Example showing the card configured for savings account display with higher balance.
 */
export const SavingsAccount: Story = {
  args: {
    title: "Savings",
    cardNumber: "•••• 9876",
    balance: "$ 15,430.50",
    logoSrc:
      "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fgithub%7C45309499-1762958726624-node-3464%3A42882-1762958726228.png",
    logoAlt: "Savings Logo",
  },
};

/**
 * Balance card with minimal or empty content.
 * Shows how the card appears when account has no balance or is in an empty state.
 */
export const EmptyState: Story = {
  args: {
    title: "Account",
    cardNumber: "•••• ••••",
    balance: "$ 0.00",
    logoSrc:
      "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fgithub%7C45309499-1762958726624-node-3464%3A42882-1762958726228.png",
    logoAlt: "Account Logo",
  },
};
