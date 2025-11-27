import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const OpeningModal = (props: any) => {
  const phase1 =
    props.phase === "I"
      ? "#5F237B"
      : props.phase === "II"
      ? "#D0193E"
      : "#FF9348";

  // Extract module number (e.g., "M3" → 3)
  const moduleNumber = parseInt(props.moduleId.replace(/\D/g, ""));

  // The 5 dialer values
  const numbers = [
    moduleNumber - 2,
    moduleNumber - 1,
    moduleNumber,
    moduleNumber + 1,
    moduleNumber + 2,
  ];

  // SVG text positions
  const textPositions = [
    { x: 60, y: 50, size: 32 },
    { x: 110, y: 150, size: 32 },
    { x: 155, y: 250, size: 64 }, // center & highlighted
    { x: 100, y: 380, size: 32 },
    { x: 60, y: 480, size: 32 },
  ];

  return (
    <Dialog open={props.showIntroModal} onOpenChange={props.setShowIntroModal}>
      <DialogContent className="max-w-full md:max-w-[1000px] rounded-lg p-0">
        <div className="flex">

          {/* LEFT SIDE SVG (NOW DYNAMIC) */}
          <div className="hidden md:flex w-48 items-center justify-center">
            <svg
              className="w-48 h-[600px]"
              viewBox="0 -150 200 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 200 0 Q 100 200, 150 400 Q 180 500, 150 600 Q 100 700, 150 800"
                stroke="#E5E7EB"
                strokeWidth="2"
                fill="none"
              />

              {/* Dynamic dialer numbers */}
              {numbers.map((num, i) => (
                <text
                  key={i}
                  x={textPositions[i].x}
                  y={textPositions[i].y}
                  fill={i === 2 ? "#7C3AED" : "#D1D5DB"}
                  fontSize={textPositions[i].size}
                  fontWeight={i === 2 ? "700" : "300"}
                >
                  {String(num).padStart(2, "0")}
                </text>
              ))}
            </svg>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="px-6 md:px-16 py-6 md:py-16 flex flex-col gap-6 max-h-[90vh] overflow-y-auto w-full">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 md:mb-6">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  src={props.src}
                  alt="Module Icon"
                  className="w-12 md:w-16 h-auto object-contain"
                />
              </div>

              <div>
                <div
                  className="font-semibold mb-1"
                  style={{ color: phase1, fontSize: "1.25rem" }}
                >
                  Phase {props.phase}
                </div>
                <h2 className="text-black font-semibold text-lg md:text-2xl">
                  {props.module}
                </h2>
              </div>
            </div>

            {/* Video Placeholder */}
            <div className="bg-gray-100 rounded-lg p-6 md:p-12 mb-4 md:mb-6 text-center">
              <div className="text-gray-500">
                <div className="font-medium mb-1 text-sm md:text-base">
                  Walkthrough Video
                </div>
                <div className="text-xs md:text-sm">(small screen recording)</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#1E1E2F] font-normal text-sm md:text-base leading-relaxed mb-4 md:mb-6">
              {props.description}
            </p>

            {/* Info Badges */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 md:gap-8 mb-4 md:mb-6 text-sm md:text-base">
              <div className="flex items-center gap-2 text-[#130719] py-1.5 rounded-full font-normal text-sm md:text-lg">
                <img src={"/I_1b.svg"} className="w-5 h-5 md:w-6 md:h-6" alt="Level" />
                {props.level} Level
              </div>

              <div className="flex items-center gap-2 text-[#130719] font-normal text-sm md:text-lg">
                <img src={"/clocl.svg"} className="w-5 h-5 md:w-6 md:h-6" alt="Clock" />
                <span>{props.time}</span>
              </div>

              <div className="flex items-center gap-2 text-[#130719] font-normal text-sm md:text-lg">
                <img src={"/star.svg"} className="w-5 h-5 md:w-6 md:h-6" alt="Score" />
                Score is {props.calculated} calculated in this module
              </div>
            </div>

            {/* Begin Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => props.setShowIntroModal(false)}
                className="bg-[#FF9348] text-white rounded-md px-4 md:px-6 py-2 md:py-3 w-full sm:w-auto text-base md:text-lg flex items-center justify-center gap-2 md:gap-3"
              >
                Let's begin <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpeningModal;
