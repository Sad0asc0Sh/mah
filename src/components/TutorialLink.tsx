import React from "react";
import { Play } from "lucide-react";

interface TutorialLinkProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export default function TutorialLink({
  text = "Watch Tutorial",
  onClick,
  className = "",
}: TutorialLinkProps) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-start items-center gap-2 cursor-pointer ${className}`}
    >
      <div
        className={"text-[#6448ef] uppercase tracking-wide underline text-2xl"}
      >
        {text}
      </div>
      <Play className={"w-6 h-6 text-[#6448ef]"} fill={"#6448ef"} />
    </div>
  );
}
