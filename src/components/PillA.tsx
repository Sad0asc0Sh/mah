import React from "react";

interface PillAProps {
  letter?: string;
  className?: string;
}

export default function PillA({
  letter = "A",
  className = "",
}: PillAProps) {
  return (
    <div
      className={`rounded-full bg-[#6448EF] w-16 h-16 flex flex-col justify-center items-center ${className}`}
    >
      <div
        className={
          "font-normal text-4xl text-white leading-none h-fit w-fit"
        }
      >
        {letter}
      </div>
    </div>
  );
}
