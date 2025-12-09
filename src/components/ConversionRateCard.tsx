import React from "react";

interface BarData {
  height: number;
}

interface ConversionRateCardProps {
  title?: string;
  value?: string;
  timeframe?: string;
  bars?: BarData[];
  xAxisLabels?: string[];
  className?: string;
}

export default function ConversionRateCard({
  title = "Conversion rate",
  value = "120%",
  timeframe = "In the past 30 days",
  bars = [
    { height: 59.6 },
    { height: 42.13 },
    { height: 34.94 },
    { height: 50.35 },
    { height: 72.95 },
    { height: 72.95 },
    { height: 58.57 },
    { height: 81.17 },
    { height: 81.17 },
    { height: 88.37 },
    { height: 79.12 },
    { height: 67.82 },
    { height: 89.39 },
    { height: 89.39 },
    { height: 81.17 },
    { height: 81.17 },
    { height: 68.84 },
    { height: 81.17 },
    { height: 101.73 },
    { height: 75.01 },
    { height: 96.59 },
    { height: 82.2 },
    { height: 97.61 },
    { height: 93.5 },
    { height: 93.5 },
    { height: 97.61 },
    { height: 72.95 },
    { height: 72.95 },
    { height: 72.95 },
    { height: 16.44 },
  ],
  xAxisLabels = ["1", "7", "14", "21", "28"],
  className = "",
}: ConversionRateCardProps) {
  return (
    <div
      className={`w-[370px] h-[394px] relative bg-[#02276b] rounded-[32px] overflow-hidden ${className}`}
    >
      {/* Title */}
      <div className="absolute left-[28px] top-[40px] text-[#e6e9f0] text-sm font-inter font-semibold">
        {title}
      </div>

      {/* Main Value */}
      <div className="absolute left-[28px] top-[65px] text-white text-[58px] font-inter font-medium opacity-90">
        {value}
      </div>

      {/* Timeframe */}
      <div className="absolute left-[28px] top-[148px] text-white text-sm font-inter font-semibold opacity-50">
        {timeframe}
      </div>

      {/* Bar Chart */}
      <div className="absolute left-[28px] top-[239px] w-[314px] h-[102px] opacity-90 flex justify-center items-end gap-[6.4px]">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="w-[4.27px] bg-white"
            style={{ height: `${bar.height}px` }}
          />
        ))}
      </div>

      {/* X-Axis Labels */}
      <div className="absolute left-[28px] top-[349px] h-[15px] flex items-center">
        <div className="absolute left-0 text-white text-xs font-inter font-semibold opacity-50">
          {xAxisLabels[0]}
        </div>
        <div className="absolute left-[70px] text-white text-xs font-inter font-semibold opacity-50">
          {xAxisLabels[1]}
        </div>
        <div className="absolute left-[141px] text-white text-xs font-inter font-semibold opacity-50">
          {xAxisLabels[2]}
        </div>
        <div className="absolute left-[219px] text-white text-xs font-inter font-semibold opacity-50">
          {xAxisLabels[3]}
        </div>
        <div className="absolute left-[298px] text-white text-xs font-inter font-semibold opacity-50">
          {xAxisLabels[4]}
        </div>
      </div>
    </div>
  );
}
