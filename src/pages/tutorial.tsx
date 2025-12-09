import React, { useState } from "react";
import { BookOpen, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// TutorialButton component
const TutorialButton: React.FC<{
  text: string;
  icon?: React.ElementType;
  onClick?: () => void;
  className?: string;
}> = ({ text, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 h-[40px] bg-[#202125] rounded-[8px] cursor-pointer hover:bg-white hover:text-[#5c45a8] transition-colors text-[#9ca3af] w-full px-[12px]"
  >
    {Icon && <Icon className="w-4 h-4" />}
    <span className="text-[14px] font-medium w-full text-left">{text}</span>
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

const ShimmerText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    <p
      className={`${className} relative inline-block`}
      style={{
        background: "linear-gradient(90deg, #52525b 0%, #52525b 40%, #FFFFFF 50%, #52525b 60%, #52525b 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "shimmerGradient 2s ease-in-out infinite",
      }}
    >
      {text}
      <style>
        {`
          @keyframes shimmerGradient {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }
        `}
      </style>
    </p>
  );
};

const cards = [
  {
    title: "Generate a Mobile App",
    subtitle: "Build apps with Tempo AI",
    image: "/images/tempo-image-20251127T204206883Z.jpeg",
  },
  {
    title: "Design & Interact Modes",
    subtitle: "Design your UI and interact with live apps",
    image: "/images/tempo-image-20251127T204220518Z.jpeg",
  },
  {
    title: "Welcome to Tempo!",
    subtitle: "Explore our tutorials to get started",
    image: "/images/tempo-image-20251127T204235444Z.jpeg",
  },
];

const TutorialPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="bg-[#121214] min-h-screen p-8 flex flex-col items-center justify-center gap-y-[24px]">
      <div className="w-[241px] flex flex-col items-center gap-y-[20px] h-[87px]">
        <img
          src="/images/tempo-image-20251127T205241909Z.svg"
          alt="Tempo Logo"
          width={552}
          height={560}
          className="h-[38px] w-[48px]"
        />
        <ShimmerText
          text="Your preview will appear here"
          className="text-lg mb-12 font-medium text-accent"
        />
      </div>
      <div className="flex items-center justify-center gap-8 mb-8 rounded-[0px]">
        <div className="relative w-80 h-96 mx-auto">
          <AnimatePresence mode="popLayout">
            {cards.map((card, index) => {
              const offset =
                (index - activeIndex + cards.length) % cards.length;

              // Calculate visual properties based on offset
              const zIndex = offset === 0 ? 30 : offset === 1 ? 20 : 10;
              const scale = offset === 0 ? 1 : offset === 1 ? 0.96 : 0.92;
              const y = offset === 0 ? 0 : offset === 1 ? 24 : 48;
              // Use brightness for depth perception instead of opacity
              const brightness = offset === 0 ? 1 : offset === 1 ? 0.7 : 0.5;

              return (
                <motion.div
                  key={card.title}
                  initial={false}
                  animate={{
                    y: y,
                    scale: scale,
                    zIndex: zIndex,
                    filter: `brightness(${brightness})`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                    restDelta: 0.001,
                  }}
                  className="absolute w-full bg-[#2F3035] shadow-xl border border-[#4B4B51] overflow-hidden flex flex-col justify-start items-start rounded-[16px] left-0 top-0 origin-top"
                >
                  <div className="h-72 bg-[#2F3035] flex px-[8px] py-[8px] w-full">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover flex rounded-[12px]"
                    />
                  </div>
                  <div className="p-4 space-y-2 w-full">
                    <p className="text-sm text-[#F5F5F6] font-medium">
                      {card.title}
                    </p>
                    <p className="text-sm text-[#9F9FA4]">{card.subtitle}</p>
                  </div>
                  <div className="flex justify-end items-center my-[0px] w-full mx-[0px] px-[12px] pb-[12px] h-fit">
                    <TutorialButton
                      text="View Tutorial"
                      icon={BookOpen}
                      className="px-[24px]"
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="flex flex-col items-center gap-3 ml-16">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-[#202125] flex items-center justify-center text-[#9ca3af] hover:bg-white hover:text-[#5c45a8] transition-colors shadow-lg"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <div className="flex flex-col gap-3 items-center py-2">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-2 h-10 bg-[#6448EF]"
                    : "w-2 h-2 bg-[#4B4B51] hover:bg-[#6448EF]/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-[#202125] flex items-center justify-center text-[#9ca3af] hover:bg-white hover:text-[#5c45a8] transition-colors shadow-lg"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
