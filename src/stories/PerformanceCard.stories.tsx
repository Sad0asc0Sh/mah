import type { Meta, StoryObj } from "@storybook/react";
import PerformanceCard from "@/components/PerformanceCard";

const meta = {
  title: "Components/PerformanceCard",
  component: PerformanceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The badge title displayed at the top of the card",
    },
    performanceValue: {
      control: { type: "text" },
      description: "The main performance metric value",
    },
    timeframe: {
      control: { type: "text" },
      description: "The timeframe description for the performance data",
    },
    bars: {
      control: { type: "object" },
      description: "Array of bar chart data with value and percentage",
    },
  },
} satisfies Meta<typeof PerformanceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default performance card showing positive growth with bar chart visualization.
 * The standard performance card with default styling and data visualization.
 */
export const Default: Story = {
  args: {
    title: "PERFORMANCE",
    performanceValue: "+280%",
    timeframe: "In the past 30 days",
    bars: [
      { value: 75, percentage: "12%" },
      { value: 145, percentage: "78%" },
      { value: 105, percentage: "62%" },
      { value: 125, percentage: "70%" },
      { value: 145, percentage: "75%" },
      { value: 200, percentage: "105%" },
    ],
  },
};

/**
 * Performance card showing negative growth metrics.
 * Demonstrates how the card appears with declining performance metrics.
 */
export const NegativePerformance: Story = {
  args: {
    title: "PERFORMANCE",
    performanceValue: "-15%",
    timeframe: "In the past 7 days",
    bars: [
      { value: 120, percentage: "45%" },
      { value: 80, percentage: "32%" },
      { value: 60, percentage: "28%" },
      { value: 40, percentage: "18%" },
      { value: 30, percentage: "12%" },
      { value: 25, percentage: "8%" },
    ],
  },
};

/**
 * Performance card with custom title and different data points.
 * Shows flexibility of the component with different metric types and steady growth pattern.
 */
export const CustomMetrics: Story = {
  args: {
    title: "REVENUE",
    performanceValue: "+1.2M",
    timeframe: "This quarter",
    bars: [
      { value: 90, percentage: "15%" },
      { value: 110, percentage: "25%" },
      { value: 130, percentage: "35%" },
      { value: 160, percentage: "55%" },
      { value: 180, percentage: "75%" },
      { value: 190, percentage: "85%" },
    ],
  },
};

/**
 * Performance card with fewer data points.
 * Demonstrates the component with minimal bar chart data.
 */
export const MinimalData: Story = {
  args: {
    title: "GROWTH",
    performanceValue: "+42%",
    timeframe: "Last month",
    bars: [
      { value: 50, percentage: "10%" },
      { value: 80, percentage: "25%" },
      { value: 120, percentage: "50%" },
    ],
  },
};
