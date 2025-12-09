import React from "react";

interface BarData {
  value: number;
  percentage: string;
}

interface PerformanceCardProps {
  title?: string;
  performanceValue?: string;
  timeframe?: string;
  bars?: BarData[];
  className?: string;
}

export default function PerformanceCard({
  title = "PERFORMANCE",
  performanceValue = "+280%",
  timeframe = "In the past 30 days",
  bars = [
    { value: 75, percentage: "12%" },
    { value: 145, percentage: "78%" },
    { value: 105, percentage: "62%" },
    { value: 125, percentage: "70%" },
    { value: 145, percentage: "75%" },
    { value: 200, percentage: "105%" },
  ],
  className = "",
}: PerformanceCardProps) {
  return (
    <div
      className={`w-[332px] h-[454px] relative bg-[#391f44] rounded-[29px] shadow-[0px_16px_34px_0px_rgba(0,0,0,0.26),0px_62px_62px_0px_rgba(0,0,0,0.22),0px_140px_84px_0px_rgba(0,0,0,0.13),0px_250px_100px_0px_rgba(0,0,0,0.04)] overflow-hidden ${className}`}
    >
      {/* Performance Badge */}
      <div className="absolute left-[25px] top-[25px] px-[7px] py-[2px] bg-[#db7dfe] rounded-[89px] flex justify-center items-center">
        <div className="text-[#24132b] text-[11px] font-brockmann font-semibold">
          {title}
        </div>
      </div>

      {/* Performance Value */}
      <div className="absolute left-[25px] top-[53px] text-[#db7dfe] text-[52px] font-brockmann font-normal leading-none">
        {performanceValue}
      </div>

      {/* Timeframe */}
      <div className="absolute left-[25px] top-[119px] text-[#8b7693] text-xs font-brockmann font-normal">
        {timeframe}
      </div>

      {/* Grid Lines */}
      <div className="absolute left-[25px] top-[194px] w-[282px] h-[200px] flex flex-col justify-between">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-full h-[1px] opacity-30 bg-[#c972e9]/50"
          />
        ))}
      </div>

      {/* Bar Chart */}
      <div className="absolute left-[25px] top-[194px] w-[282px] h-[200px] opacity-90 flex justify-start items-end gap-[3.6px]">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="relative bg-[#db7dfe] rounded-[7px] overflow-hidden"
            style={{ width: "44px", height: `${bar.value}px` }}
          >
            <div className="absolute w-full h-[7px] left-0 top-0 bg-[#d7fe02]" />
            <div className="absolute left-[4px] top-[11px] text-[#24132b] text-[11px] font-brockmann font-semibold">
              {bar.percentage}
            </div>
          </div>
        ))}
      </div>

      {/* See All Link */}
      <div className="absolute left-[25px] top-[416px] flex justify-start items-center gap-[7px]">
        <div className="w-[7px] h-[7px] bg-[#db7dfe] rounded-full" />
        <div className="text-[#db7dfe] text-[11px] font-brockmann font-normal">
          SEE ALL
        </div>
      </div>
    </div>
  );
}
