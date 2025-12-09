import React from "react";

interface DeviceData {
  name: string;
  percentage: string;
  opacity: number;
}

interface InfoCardProps {
  title?: string;
  subtitle?: string;
  centerValue?: string;
  devices?: DeviceData[];
  className?: string;
}

export default function InfoCard({
  title = "DEVICE TYPE",
  subtitle = "In the past 7 days",
  centerValue = "32K",
  devices = [
    { name: "Desktop", percentage: "54%", opacity: 1 },
    { name: "Mobile", percentage: "27%", opacity: 0.7 },
    { name: "Tablet", percentage: "12%", opacity: 0.4 },
    { name: "TV", percentage: "7%", opacity: 0.2 },
  ],
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={`w-[370px] h-[506px] relative bg-[#fa531c] rounded-[32px] flex flex-col p-7 overflow-hidden ${className}`}
    >
      {/* Tag */}
      <div className="px-2 py-0.5 bg-[#ffeee8] rounded-full inline-flex self-start mb-[3px]">
        <div className="text-[#fa531c] text-xs font-semibold font-inter">
          {title}
        </div>
      </div>

      {/* Subtitle */}
      <div className="text-white text-sm font-inter font-medium mb-[31px]">
        {subtitle}
      </div>

      {/* Circular Chart */}
      <div className="w-[207px] h-[207px] relative mx-auto mb-[28px]">
        {/* Outer rings */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 207 207"
        >
          {/* Desktop - 54% */}
          <circle
            cx="103.5"
            cy="103.5"
            r="95"
            fill="none"
            stroke="#fff5ed"
            strokeWidth="17"
            strokeDasharray={`${(54 / 100) * 597} 597`}
            opacity="0.9"
          />
          {/* Mobile - 27% */}
          <circle
            cx="103.5"
            cy="103.5"
            r="95"
            fill="none"
            stroke="#fff5ed"
            strokeWidth="17"
            strokeDasharray={`${(27 / 100) * 597} 597`}
            strokeDashoffset={`-${(54 / 100) * 597}`}
            opacity="0.7"
          />
          {/* Tablet - 12% */}
          <circle
            cx="103.5"
            cy="103.5"
            r="95"
            fill="none"
            stroke="#fff5ed"
            strokeWidth="17"
            strokeDasharray={`${(12 / 100) * 597} 597`}
            strokeDashoffset={`-${((54 + 27) / 100) * 597}`}
            opacity="0.4"
          />
          {/* TV - 7% */}
          <circle
            cx="103.5"
            cy="103.5"
            r="95"
            fill="none"
            stroke="#fff5ed"
            strokeWidth="17"
            strokeDasharray={`${(7 / 100) * 597} 597`}
            strokeDashoffset={`-${((54 + 27 + 12) / 100) * 597}`}
            opacity="0.2"
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[#fff5ed] text-[50px] font-inter font-medium opacity-90">
            {centerValue}
          </div>
        </div>
      </div>

      {/* Device list */}
      <div className="flex flex-col gap-2">
        {devices.map((device, index) => (
          <div key={device.name}>
            <div className="flex justify-between items-center h-[17px]">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 bg-[#fff5ed] rounded-full"
                  style={{ opacity: device.opacity }}
                />
                <div className="text-white text-sm font-inter font-medium">
                  {device.name}
                </div>
              </div>
              <div className="text-white text-sm font-inter font-medium text-right">
                {device.percentage}
              </div>
            </div>
            {index < devices.length - 1 && (
              <div className="w-full h-[1px] bg-[#fff5ed] opacity-30 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
