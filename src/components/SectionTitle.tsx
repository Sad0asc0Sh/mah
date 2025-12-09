import React from "react";

interface SectionTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SectionTitle({
  children = "Section Title",
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={`self-stretch text-[#1a1a1a] font-brockmann font-medium text-5xl ${className}`}
    >
      {children}
    </div>
  );
}
