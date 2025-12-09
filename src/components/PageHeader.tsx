import React from "react";

interface PageHeaderProps {
  title?: React.ReactNode;
  highlightedText?: string;
  className?: string;
}

export default function PageHeader({
  title = "Edit code",
  highlightedText = "Visually",
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`w-full py-8 h-fit pt-32 z-10 relative ${className}`}>
      <div
        className={
          "self-stretch text-[#1a1a1a] font-brockmann font-medium text-7xl"
        }
      >
        {title}
      </div>
      {highlightedText && (
        <div
          className={
            "self-stretch font-brockmann font-medium text-7xl text-[#6448EF]"
          }
        >
          {highlightedText}
        </div>
      )}
    </div>
  );
}
