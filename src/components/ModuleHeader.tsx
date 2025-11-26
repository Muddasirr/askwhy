import { useEffect, useState } from "react";

interface ModuleHeaderProps {
<<<<<<< HEAD
  polarizationScore: number; // 0-100
  likesCount?: number;
  savesCount?: number;
  MAX_LIKES?: number;
  MAX_SAVES?: number;
  setDone: any;
  src?: any;
  time?: any;
  heading?: any;
  module?: any;
  total?: any;
  left?: any;
  description?: any;
}

const ModuleHeader = ({
  polarizationScore = 100,
  likesCount = 0,
  savesCount = 0,
  MAX_LIKES = 8,
  MAX_SAVES = 8,
  setDone,
  module,
  heading,
  src,
  total,
  left,
  description,
  time
}: ModuleHeaderProps) => {
  const [timeLeft, setTimeLeft] = useState(time); // in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      setDone(true);
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev: any) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, setDone]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="pt-4 md:pt-6 mb-2">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
        {/* Left side: Icon + Module Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto">
          {/* Module Icon */}
          <div className="w-16 md:w-24 rounded-lg flex-shrink-0 flex items-center justify-center">
            <img src={src} alt="Module Icon" className="w-full h-auto object-contain" />
          </div>

          {/* Module Info */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl md:text-4xl leading-tight md:leading-[100%] text-[#130719] mb-1 md:mb-2">
              {heading}
            </h1>

            <p className="font-normal text-sm md:text-xl leading-snug md:leading-[100%] text-[#130719] mb-2">
              {description}
            </p>

            <div className="flex items-center gap-3 md:gap-6 text-[#201E1C] text-sm md:text-lg">
              <img src={"/clocl.svg"} alt="Clock" className="w-4 md:w-6 h-4 md:h-6" />
              <span className="font-normal">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Right side: Polarization bar + counts */}
        <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
          {/* Polarization bar */}
          {module !== 1 && (
            <div className="w-full md:w-[20vw] mb-2">
              <div className="w-full h-3 md:h-4 rounded-full bg-[#EDE1D0] overflow-hidden mb-1">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${polarizationScore}%`,
                    background: "linear-gradient(180deg, #D0193E 0%, #5F237B 100%)",
                  }}
                />
              </div>
              <div className="text-[12px] md:text-[16px] font-medium text-right">{polarizationScore}%</div>
              <div className="text-[12px] md:text-[16px] font-medium text-center text-[#130719]">
                Polarization Score
              </div>
            </div>
          )}

          {/* Likes / Saves / Left */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-end gap-1 md:gap-2 font-normal text-sm md:text-[32px] text-[#130719] mt-1 md:mt-2">
            {module === 2 ? (
              <>
                <span>{likesCount}/{MAX_LIKES} Likes</span>
                <span className="hidden md:inline"> | </span>
                <span>{savesCount}/{MAX_SAVES} Saves</span>
              </>
            ) : (
              <div className="font-normal text-base md:text-[32px]">{left} Left</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleHeader;
=======
    polarizationScore: number; // 0-100
    likesCount?: number;
    savesCount?: number;
    MAX_LIKES?: number;
    MAX_SAVES?: number;
    setDone:any;
    src?:any;
    time?:any;
    heading?:any;
    module?:any;
    total?:any;
    left?:any;
    description?:any;
  
  }
  
  const ModuleHeader = ({
    polarizationScore = 100,
    likesCount = 0,
    savesCount = 0,
    MAX_LIKES = 8,
    MAX_SAVES = 8,
    setDone,
    module,
    heading,
   
    src,
    total,
    left,
    description,
    time
  
    
  }: ModuleHeaderProps) => {
    const [timeLeft, setTimeLeft] = useState(time); // 2 minutes in seconds
  
    useEffect(() => {
      if (timeLeft <= 0) {
        setDone(true); // call setDone when timer finishes
        return;
      }
  
      const interval = setInterval(() => {
        setTimeLeft((prev:any) => prev - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [timeLeft, setDone]);
  
    // Format seconds to MM:SS
    const formatTime = (seconds: number) => {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${min.toString().padStart(2, "0")}:${sec
        .toString()
        .padStart(2, "0")}`;
    };
  
    return (
      <div className="pt-6 mb-2">
        <div className="flex items-center justify-between">
          {/* Left side: Icon + Module Info */}
          <div className="flex items-center gap-8">
            {/* Puzzle Icon */}
            <div className="w-24  rounded-lg flex items-center justify-center relative flex-shrink-0">
              <img src={src} alt="Module 1" className="w-24 object-contain" />
            </div>
  
            {/* Module Info */}
            <div>
              <h1 className="font-medium text-[42px] leading-[100%] tracking-[0] text-[#130719] mb-2">
                {heading}
              </h1>
  
              <p className="font-normal text-[24px] leading-[100%] tracking-[0] text-[#130719] mb-2">
  {description}            </p>
  
              <div className="flex items-center gap-6 text-[#201E1C]">
                <img src={"/clocl.svg"} alt="Clock" />
                <span className="font-normal text-[32px] leading-[100%] tracking-[0]">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
  
          {/* Right side: Polarization bar + counts */}
          <div className="flex flex-col items-end gap-2">
            {/* Polarization bar */}
     {  module!=1 &&     <div>
            <div className="w-[20vw] h-4 rounded-full bg-[#EDE1D0] overflow-hidden mb-1">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${polarizationScore}%`,
                  background: "linear-gradient(180deg, #D0193E 0%, #5F237B 100%)",
                }}
              />
              
            </div>
            <div className="font-medium text-right text-[16px]">
                {polarizationScore}%
              </div>
              <div className="text-[16px] font-medium text-center text-[#130719]">Polarization Score</div>
              </div> }
  
            
  
            {/* Likes / Saves */}
            <div className="flex-end justify-end gap-2  font-normal text-[32px] text-[#130719] mt-2">
             {module==2 && (
              <>
              <span>
                {likesCount}/{MAX_LIKES} Likes
              </span>
              <span> | </span>
              <span>
                {savesCount}/{MAX_SAVES} Saves
              </span>
              </>)}
              {module!=2 && (
              <>
              <div className="font-normal text-[32px]">
  {left} Left
              </div>
              </>)}
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default ModuleHeader
>>>>>>> upstream/main
