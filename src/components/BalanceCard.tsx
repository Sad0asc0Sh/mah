import React from "react";

interface BalanceCardProps {
  title?: string;
  cardNumber?: string;
  balance?: string;
  logoSrc?: string;
  logoAlt?: string;
  className?: string;
}

export default function BalanceCard({
  title = "Balance",
  cardNumber = "•••• 1824",
  balance = "$ 2451",
  logoSrc = "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fgithub%7C45309499-1762958726624-node-3464%3A42882-1762958726228.png",
  logoAlt = "Logo",
  className = "",
}: BalanceCardProps) {
  return (
    <div
      className={`w-[332px] relative bg-[#2a2a2a] rounded-[37px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] overflow-hidden h-[334px] ${className}`}
    >
      <div
        className={
          "absolute left-[37px] top-[37px] text-white text-[26px] font-brockmann font-semibold leading-none"
        }
      >
        {title}
      </div>
      <div className={"absolute left-[58px] top-[130px] w-[215px] h-[137px]"}>
        <div
          className={
            "absolute left-[20px] top-[11px] w-[215px] h-[137px] bg-[#1a1a1a] rounded-[18px] opacity-40"
          }
        />
        <div
          className={
            "absolute left-[11px] top-[37px] w-[215px] h-[137px] bg-[#222222] rounded-[18px] opacity-60"
          }
        />
        <div
          className={
            "absolute inset-0 w-[215px] h-[137px] rounded-[18px] overflow-hidden bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-[#ec4899]"
          }
        >
          <div
            className={
              "absolute w-[120px] h-[120px] rounded-full bg-purple-400/30 -top-[50px] -right-[30px]"
            }
          />
          <div
            className={
              "absolute w-[90px] h-[90px] rounded-full bg-pink-400/30 -bottom-[20px] -left-[20px]"
            }
          />
          <div
            className={
              "absolute w-[60px] h-[60px] rounded-full bg-purple-300/20 top-[10px] -left-[15px]"
            }
          />
          <div className={"relative z-10 p-[22px] h-full flex flex-col"}>
            <div className={"mb-auto"}>
              <img
                src={logoSrc}
                alt={logoAlt}
                className={"w-[20px] h-[20px]"}
              />
            </div>
            <div
              className={
                "text-white text-[20px] font-brockmann font-normal text-right mb-[14px] leading-[26px]"
              }
            >
              {cardNumber}
            </div>
            <div
              className={
                "text-white text-[26px] font-brockmann font-semibold leading-[33px]"
              }
            >
              {balance}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
