import React from "react";
import { X } from "lucide-react";

const TinyTooltip = (props) => {
  return (
    <div className="
      w-[240px] p-2 bg-[#780091] text-white shadow-lg relative
      rounded-t-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-none
    ">
      
      {/* Top Row */}
      <div className="flex justify-between mb-1">
        <div className="flex items-center gap-2">
          {/* Placeholder Icon */}
          <div className="w-7 h-7 rounded-full bg-[#FF9348] flex items-center justify-center text-white text-lg font-bold">
            <img src="/tooltip.svg"/>
          </div>

          <h2 className="text-base font-semibold">Framing Bias</h2>
        </div>

        <button>
          <X size={16} className="text-white/70 hover:text-white transition" />
        </button>
      </div>

      {/* Description aligned with heading */}
      <p className="text-[10px] leading-snug text-white/90 pl-[34px] -mt-1">
        The way an issue is worded can make it seem more or less serious
        without changing the actual facts.
      </p>

      {/* Pagination */}
      {/* <div className="flex justify-center gap-2 mt-2">
        <div className="w-2 h-2 rounded-full bg-white/40" />
        <div className="w-2 h-2 rounded-full bg-white/40" />
      </div> */}
    </div>
  );
};

export default TinyTooltip;
