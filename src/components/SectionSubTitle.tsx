import React from "react";

interface SectionSubTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SectionSubTitle({
  children = "Subtitle text",
  className = "",
}: SectionSubTitleProps) {
  return (
    <div
      className={`self-stretch text-[#1a1a1a]/50 font-normal text-4xl ${className}`}
    >
      {children}
    </div>
  );
}
