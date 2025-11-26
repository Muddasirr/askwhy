import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

<<<<<<< HEAD
const OpeningModal = (props: any) => {
  const phase1 =
    props.phase === "I"
      ? "#5F237B"
      : props.phase === "II"
      ? "#D0193E"
      : "#FF9348";

  return (
    <Dialog open={props.showIntroModal} onOpenChange={props.setShowIntroModal}>
      <DialogContent className="max-w-full md:max-w-[1000px] rounded-lg p-0">
        {/* Enable vertical scroll if content is larger than screen */}
        <div className="px-6 md:px-16 py-6 md:py-16 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
          {/* Header with Icon */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 md:mb-6">
            {/* Puzzle Icon */}
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center flex-shrink-0">
              <img
                src={props.src}
                alt="Module Icon"
                className="w-12 md:w-16 h-auto object-contain"
              />
            </div>

            {/* Title */}
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
      </DialogContent>
    </Dialog>
  );
};

export default OpeningModal;
=======





const OpeningModal = (props:any)=>{
    const phase1= props.phase=='I'?'#5F237B':(props.phase=='II'?'#D0193E':'#FF9348')

    return (
        <Dialog open={props.showIntroModal } onOpenChange={props.setShowIntroModal}>
<DialogContent className="max-w-[1000px] aspect-[1253/703] rounded-[12px] p-0 gap-0 bg-white">
<div className="px-32 py-16">
                    {/* Header with Icon */}
                    <div className="flex items-center  gap-4 mb-6">
                      {/* Puzzle Icon */}
                      <div className="w-18 h-18 rounded-lg flex items-center justify-center">
  <img
    src={props.src}
    alt="Module 1"
    className="w-16 object-contain"
  />
</div>

        
                      
                      {/* Title */}
                      <div>
                      <div className={`text-[${phase1}] text-[36px] font-semibold`}>
                        Phase {props.phase}
                        
                        </div>
                      <h2 className="text-[36px] font-semibold text-black">
                        
{props.module}

                        </h2>
                      </div>
                    </div>
        
                    {/* Video Placeholder */}
                    <div className="bg-gray-100 rounded-lg p-12 mb-6 text-center">
                      <div className="text-gray-500">
                        <div className="font-medium mb-1">Walkthrough Video</div>
                        <div className="text-sm">(small screen recording)</div>
                      </div>
                    </div>
        
                    {/* Description */}
                    <p className="text-[#1E1E2F]  font-normal text-[16px] leading-[100%] tracking-[0] mb-6">
{props.description}
                  </p>

        
                    {/* Info Badges */}
                    <div className="flex items-center gap-8 mb-6 text-sm ">
                   
                    <div className="flex items-center gap-2 text-[#130719]  py-1.5 rounded-full font-[400] text-[20px] leading-[100%] tracking-[0]">
  <img src={"/I_1b.svg"} className="w-6 h-6" />
  {props.level} Level
</div>

                      <div  className="flex items-center gap-2 text-[#130719] font-[400] text-[20px]">
                        <img src={"/clocl.svg"} className="w-6 h-6" />
                        <span>{props.time}</span>
                      </div>
                      <div className=" flex justify-center items-center gap-2 text-[#130719] font-[400] text-[20px] ">
          <img src={"/star.svg"} className="w-6 h-6"/>
                        Score is {props.calculated} calculated in this module
                      </div>
                    </div>
        
                    {/* Begin Button */}
                    <div className="flex justify-center">
                    <Button
  onClick={() => props.setShowIntroModal(false)}
  className="
  bg-[#FF9348] text-white rounded-[6px] px-[10px] py-[8px]
  w-[197px] h-[42px] text-base font-[400] text-[18px]
  flex items-center justify-center gap-[10px]

  border-none outline-none ring-0 ring-offset-0
  focus:border-none focus:outline-none focus:ring-0 focus:ring-offset-0
  active:border-none
  
">
            Let's begin <ChevronRight 
             />
          </Button>
        </div>
                  </div>
                </DialogContent>
              </Dialog>
    )
}

export default OpeningModal;
>>>>>>> upstream/main
