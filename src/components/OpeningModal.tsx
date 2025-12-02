import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Fixed import path
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const OpeningModal = (props: any) => {
  // 1. EXTRACT MODULE NUMBER ROBUSTLY
  // This regex finds the first number in the string "Module X..."
  const match = props.module && props.module.match(/Module\s+(\d+)/i);
  const currentModuleNum = match ? parseInt(match[1]) : 1;
  const maxModuleNum = 7; // Maximum number of modules allowed

  // Previous completed modules for counter start value
  const [prevCompleted, setPrevCompleted] = useState<number>(0);
  useEffect(() => {
    try {
      setPrevCompleted(Number(localStorage.getItem("completedModules") || 0));
    } catch (e) {
      setPrevCompleted(0);
    }
  }, []);

  const phaseColor =
    props.phase === "I"
      ? "#5F237B"
      : props.phase === "II"
      ? "#D0193E"
      : "#FF9348";

  const btnJustify =
    props.buttonAlign === "left"
      ? "justify-start"
      : props.buttonAlign === "right"
      ? "justify-end"
      : "justify-start";

  // Arc slots around curve for module progression
  const slots = [
    { offset: -2, y: 130, x: 95, size: 32, opacity: 0.4 },
    { offset: -1, y: 240, x: 145, size: 40, opacity: 0.7 },
    { offset: 0, y: 350, x: 160, size: 64, opacity: 1.0 },
    { offset: 1, y: 460, x: 145, size: 40, opacity: 0.7 },
    { offset: 2, y: 570, x: 95, size: 32, opacity: 0.4 }
  ];
  const animateMoveCondition = prevCompleted + 1 === currentModuleNum && prevCompleted < currentModuleNum && prevCompleted >= 1;

  return (
    <Dialog open={props.showIntroModal} onOpenChange={props.setShowIntroModal}>
      <DialogContent className="max-w-[1100px] p-0 overflow-hidden bg-white grid grid-cols-[320px_1fr] gap-0 rounded-[12px] border-none">
        
        {/* LEFT COLUMN: Arc counter */}
        <div className="relative h-full w-full bg-white select-none">
          <svg
            className="absolute left-0 top-0 h-full w-full"
            viewBox="0 0 320 700"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 0,0 Q 320,350 0,700" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
            {slots.map((slot, index) => {
              const displayNum = currentModuleNum + slot.offset;
              if (displayNum < 1 || displayNum > maxModuleNum) return null;
              const formattedNum = displayNum < 10 ? `0${displayNum}` : displayNum;
              const isCenter = slot.offset === 0;
              if (isCenter && animateMoveCondition) return null;
              const reverseIndex = slots.length - 1 - index;
              return (
                <motion.g
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: slot.opacity, y: 0 }}
                  transition={{ duration: 0.9, delay: reverseIndex * 0.12, ease: "easeOut" }}
                >
                  <circle cx={slot.x} cy={slot.y} r={isCenter ? 6 : 5} fill={isCenter ? phaseColor : "#D1D5DB"} />
                  {(!isCenter || !animateMoveCondition) && (
                    <motion.text
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: reverseIndex * 0.12 + 0.15, ease: "easeOut" }}
                      x={slot.x + 15}
                      y={slot.y + 12}
                      fill={isCenter ? phaseColor : "#D1D5DB"}
                      fontSize={`${slot.size}px`}
                      fontWeight={isCenter ? "700" : "600"}
                      fontFamily="sans-serif"
                    >
                      {formattedNum}
                    </motion.text>
                  )}
                </motion.g>
              );
            })}
            {animateMoveCondition && (() => {
              const originSlot = slots.find(s => s.offset === -1)!;
              const centerSlot = slots.find(s => s.offset === 0)!;
              const formattedCenter = currentModuleNum < 10 ? `0${currentModuleNum}` : String(currentModuleNum);
              return (
                <motion.g
                  initial={{ x: originSlot.x, y: originSlot.y, scale: 0.9, opacity: 0 }}
                  animate={{ x: centerSlot.x, y: centerSlot.y, scale: 1, opacity: 1 }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  style={{ pointerEvents: "none" }}
                >
                  <circle cx={0} cy={0} r={6} fill={phaseColor} />
                  <motion.text
                    x={20}
                    y={20}
                    fill={phaseColor}
                    fontSize={`${centerSlot.size}px`}
                    fontWeight="700"
                    fontFamily="sans-serif"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }}
                  >
                    {formattedCenter}
                  </motion.text>
                </motion.g>
              );
            })()}
          </svg>
        </div>
        {/* RIGHT COLUMN: Content */}
        <div className="p-12 pl-4 flex flex-col justify-center h-full">
          <div className="flex items-end gap-4 mb-6">
            <div className="w-16 h-18 rounded-lg flex items-center justify-center">
              <img src={props.src} alt="Module Icon" className="w-full h-full object-contain" />
            </div>
            <div className="h-[100%] flex flex-col justify-between">
              <div style={{ color: phaseColor }} className="text-[36px] font-semibold leading-tight">Phase {props.phase}</div>
              <h2 className="text-[36px] font-semibold text-black leading-tight">{props.module}</h2>
            </div>
          </div>
          <div className="rounded-xl mb-6 overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center h-[260px] w-full">
            {(() => {
              const id = props.moduleId || "";
              const videoSrc = id.match(/^M[1-7]$/) ? `/${id}.mp4` : null;
              return videoSrc ? (
                <video src={videoSrc} className="h-full w-full object-cover" controls preload="metadata" playsInline />
              ) : (
                <div className="text-gray-400 text-center flex flex-col items-center">
                  <span className="text-lg font-medium text-gray-900">Walkthrough Video</span>
                  <span className="text-sm">(small screen recording)</span>
                </div>
              );
            })()}
          </div>
          <p className="text-[#1E1E2F] text-[16px] leading-relaxed mb-8 max-w-[90%]">{props.description}</p>
          <div className="flex items-center gap-6 mb-8 text-sm text-[#130719]">
            <div className="flex items-center gap-2 text-[16px]">
              <img src="/I_1b.svg" className="w-5 h-5" alt="" />
              <span>{props.level} Level</span>
            </div>
            <div className="flex items-center gap-2 text-[16px]">
              <img src="/clocl.svg" className="w-5 h-5" alt="" />
              <span>02:00</span>
            </div>
            <div className="flex items-center gap-2 text-[16px]">
              <img src="/star.svg" className="w-5 h-5" alt="" />
              <span>Score is {props.calculated} calculated</span>
            </div>
          </div>
          <div className={`flex ${btnJustify}`}>
            <Button
              onClick={() => {
                try {
                  const prevCompletedStored = Number(localStorage.getItem("completedModules") || 0);
                  if (currentModuleNum > prevCompletedStored) {
                    localStorage.setItem("completedModules", String(currentModuleNum));
                  }
                } catch (e) {}
                props.setShowIntroModal(false);
              }}
              className={`bg-[#FF803E] hover:bg-[#e58440] text-white rounded-md px-12 py-3 text-[1vw] font-medium flex justify-center items-center gap-2 transition-colors`}
            >
              Start <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpeningModal;