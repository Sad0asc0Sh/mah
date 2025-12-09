import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WelcomeModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onTutorialClick?: () => void;
}

export default function WelcomeModal({
  open = true,
  onOpenChange,
  onTutorialClick,
}: WelcomeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-[450px] gap-0 border-none shadow-xl bg-[#121212] [&>button]:bg-black/40 [&>button]:hover:bg-black/60 [&>button]:text-white">
        <div className="w-full h-[240px] bg-slate-100 relative">
          <img
            src="/tempo-image-20251121T191821799Z.jpg"
            alt="Welcome to Tempo"
            className="w-full h-full object-cover flex"
          />
        </div>
        <div className="p-8 flex flex-col gap-6">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-3xl font-bold tracking-tight text-white">
              Hi! Meet Tempo,
            </DialogTitle>
            <DialogDescription className="text-white font-normal leading-none -tracking-normal text-sm opacity-60">
              The best tool for design engineers. This canvas is yours to play
              with so please make it your own.
            </DialogDescription>
          </DialogHeader>
          <Button
            className="w-fit bg-[#6448ef] text-white hover:bg-[#6448ef]/90 h-10 text-sm font-medium rounded-md"
            onClick={onTutorialClick}
          >
            View Tutorial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
