import React from "react";

interface NotificationCardProps {
  appName?: string;
  message?: string;
  timeAgo?: string;
  iconSrc?: string;
  size?: "small" | "large";
  className?: string;
}

export default function NotificationCard({
  appName = "Chroma",
  message = "You have two new dreams from last night. Want to unroll them?",
  timeAgo = "42 min ago",
  iconSrc = "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fgithub%7C45309499-1764249138799-node-3596%3A50678-1764249137742.png",
  size = "large",
  className = "",
}: NotificationCardProps) {
  if (size === "small") {
    return (
      <div
        className={`w-[413px] h-[105px] relative bg-white/90 rounded-[17px] shadow-[0px_2.33px_25.67px_2.33px_rgba(99,99,99,0.12)] ${className}`}
      >
        {/* App Icon */}
        <img
          src={iconSrc}
          alt={`${appName} icon`}
          className="w-[64px] h-[64px] absolute left-[17px] top-[20px] rounded-md"
        />

        {/* App Name */}
        <div className="absolute left-[97px] top-[22px] text-black text-sm font-inter font-semibold">
          {appName}
        </div>

        {/* Time Ago */}
        <div className="absolute left-[285px] top-[22px] w-[106px] text-right text-[#bcbcbc] text-sm font-inter font-normal">
          {timeAgo}
        </div>

        {/* Message */}
        <div className="absolute left-[97px] top-[47px] w-[246px] h-[35px] text-[#838383] text-sm font-inter font-normal">
          {message}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-[660px] h-[168px] relative bg-white/90 rounded-[27px] shadow-[0px_3.73px_41px_3.73px_rgba(99,99,99,0.12)] ${className}`}
    >
      {/* App Icon */}
      <img
        src={iconSrc}
        alt={`${appName} icon`}
        className="w-[102px] h-[102px] absolute left-[27px] top-[33px] rounded-[9px]"
      />

      {/* App Name */}
      <div className="absolute left-[154px] top-[35px] text-black text-[22px] font-inter font-semibold">
        {appName}
      </div>

      {/* Time Ago */}
      <div className="absolute left-[456px] top-[35px] w-[170px] text-right text-[#bcbcbc] text-[22px] font-inter font-normal">
        {timeAgo}
      </div>

      {/* Message */}
      <div className="absolute left-[154px] top-[74px] w-[393px] h-[56px] text-[#838383] text-[22px] font-inter font-normal">
        {message}
      </div>
    </div>
  );
}
