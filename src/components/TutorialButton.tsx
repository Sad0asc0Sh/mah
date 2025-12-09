import React from "react";
import { Play } from "lucide-react";

interface TutorialButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export default function TutorialButton({
  text = "Click to watch tutorial",
  onClick,
  className = "",
}: TutorialButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#191c25] border border-white flex justify-center items-center overflow-hidden shadow-[0px_0px_0px_3px_rgba(226,226,226,1),0px_0px_0px_1.5px_rgba(0,0,0,1),0px_6px_7px_-2px_rgba(0,0,0,0.32),inset_0px_-3px_0px_0px_rgba(0,0,0,1),inset_0px_2px_0px_2px_rgba(38,41,47,1)] px-8 py-5 rounded-2xl gap-4 ${className}`}
    >
      <div className="px-1 flex justify-center items-center gap-2">
        <div className="text-center text-white text-3xl">{text}</div>
      </div>
      <div className="bg-white/20 border border-white flex flex-col justify-center items-center overflow-hidden w-10 h-10 rounded-full">
        <Play className="w-3 h-3 text-white fill-white ml-0.5" />
      </div>
    </button>
  );
}
