
"use client";

import { ChevronRight, Lock, Clock, BookOpen, ChevronDown } from 'lucide-react';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Workshop = () => {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(["phase-1"]);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseId)
        ? prev.filter((id) => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const phases = [
    {
      id: "phase-1",
      title: "Phase 1: Beginner Level",
      color: "text-red-600",
      modules: [
        {
          id: "module-1",
          title: "Find your vibe",
          description: "Let's help you build your feed!",
          level: "Beginner Level",
          duration: "5:00",
          locked: false, // UNLOCKED
          iconSrc: "/M1.jpg",
        },
        {
          id: "module-2",
          title: "Pick & Flick",
          description: "Let's help you build your newsfeed!",
          level: "Beginner Level",
          duration: "5:00",
          locked: true,
          iconSrc: "/M2.jpg",
        },
      ],
    },
    {
      id: "phase-2",
      title: "Phase 2: Intermediate Level",
      color: "text-red-600",
      modules: [
        {
          id: "module-3",
          title: "Fact or Fact",
          description: "Is everything not real?!",
          level: "Intermediate Level",
          duration: "5:00",
          locked: true, // UNLOCKED
          iconSrc: "/M3.jpg",
        },
        {
          id: "module-4",
          title: "Spot the Bias",
          description: "Let's help you build your newsfeed!",
          level: "Intermediate Level",
          duration: "5:00",
          locked: true,
          iconSrc: "/M4.jpg",
        },
        {
          id: "module-5",
          title: "Behind the buzz",
          description: "Trace the spark that sets your feed on fire!",
          level: "Intermediate Level",
          duration: "5:00",
          locked: true,
          iconSrc: "/M5.png",
        },
      ],
    },
    {
      id: "phase-3",
      title: "Phase 3: Advanced Level",
      color: "text-red-600",
      modules: [
        {
          id: "module-6",
          title: "Debate Switch",
          description: "One debate, two sides, endless perspectives",
          level: "Advanced Level",
          duration: "5:00",
          locked: true,
          iconSrc: "/M6.jpg",
        },
        {
          id: "module-7",
          title: "In Their Shoes",
          description: "Step into another perspective",
          level: "Advanced Level",
          duration: "5:00",
          locked: true,
          iconSrc: "/M7.jpg",
        },
      ],
    },


  ];

  const navigate = useNavigate()
  return (
    <div className="w-full p-3 flex justify-center md:p-5 lg:p-8">
      <div className="w-full pb-4 overflow-auto h-[90vh] bg-[#F8F1E7] rounded-2xl shadow-xl">
        {/* ================= HEADER ================= */}
        <div className="bg-[#5F237B] text-white px-4 md:px-8 lg:px-12 rounded-t-2xl flex justify-between items-center relative">
          <div className="py-10 sm:py-5 ">
            <h1 className="text-[28px] md:text-[30px] lg:text-[94px] text-[#F8F1E7] font-['Gabarito'] font-extrabold leading-[100%] tracking-[0%]">
              Welcome to askwhy <br /> Workshop'25
            </h1>
          </div>
          <div>
            <img src={"/header33.svg"} alt="Character" />
          </div>
        </div>




        {/* ================= STATS BAR ================= */}
        <div className="flex items-center justify-center px-16  py-6 flex-col">
          <div className="flex gap-8 flex-col md:flex-row lg:flex-row">
            <StatBox number="7" label="Total Modules" />
            <StatBox number="3" label="Total Phases" />
            <StatBox number="3" label="Difficulty Levels" />
            {/* Pass unitFont for 'hr' style */}
            <StatBox number="1 hr" label="Total Duration" unitFont="Gabarito" />
            <div onClick={() => navigate("/interest")} className="flex w-[80vw] md:w-[15vw] justify-center items-center gap-4 bg-[#FF9348] hover:bg-[#ff7e1a] text-white px-6 py-3  rounded-[16px]  rounded-bl-none font-semibold  transition">
              <div>
                <div className="text-left font-normal">Click here to</div>
                <div className="text-left font-semibold text-[7.5vw] md:text-[1.25vw]">
                  {" "}
                  Start
                </div>
              </div>
              <div>
                <ChevronRight size={60} />
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
         <div className="flex flex-col md:flex-row gap-8 px-4 md:px-16">

           {/* TEXT SIDE */}
           <div className="py-4 text-gray-700">
             <p className="mb-4 text-[#4C1C62] font-gabarito text-xl md:text-2xl">
               A glow up for your brain. How does that sound?
             </p>
             <p className="text-[#4C1C62] font-gabarito text-xl md:text-2xl">
               We're here to help. Turn <span className="font-semibold">curiosity</span><br/> into<br/> your superpower.
               <span className="font-semibold"> Play. Challenge. Ask Why.<br/></span>
               Let’s start your journey with us!
             </p>
           </div>
         {/* MODULES CARD */}
           <div className="bg-white rounded-2xl p-4 md:p-6 w-full md:w-[50vw]">
             <h2 className="text-[#5F237B] font-gabarito font-semibold text-3xl md:text-4xl">
               All Modules
             </h2>

             <div className="max-h-80 md:max-h-96 overflow-y-scroll mt-4 pr-2">

               {phases.map((phase) => (
                <div key={phase.id} className="mb-6">

                  {/* PHASE HEADER */}
                  <div
                    className="flex items-center gap-3 cursor-pointer mb-4"
                    onClick={() => togglePhase(phase.id)}
                  >
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-purple-700"></div>

                    <h3 className={`font-gabarito font-semibold text-xl md:text-2xl ${phase.color}`}>
                      {phase.title}
                    </h3>

                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedPhases.includes(phase.id) ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* MODULES */}
                  {expandedPhases.includes(phase.id) && (
                    <div className="space-y-4 pl-4 border-l border-gray-300">
                      {phase.modules.map((module) => (
                        <ModuleCard key={module.id} module={module} />
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

              export default Workshop;

              /* ================= COMPONENTS ================= */

              const StatBox = (props: {number: string; label: string; highlight?: boolean; unitFont?: string }) => {
  const parts = props.number.split(" ");
              const mainValue = parts[0];
  const unit = parts.length > 1 ? parts[1] : "";

              return (
              <div
                className={`px-6  py-2 flex items-center justify-center bg-white gap-4 text-center
      ${props.highlight ? "border-purple-500 bg-purple-50" : "border-gray-300"}
      rounded-[6px] md:rounded-[16px] rounded-bl-none w-[80vw] md:w-[15vw] lg:w-[15vw] m-auto
    `}
              >

                <div className="flex items-baseline leading-none">
                  <p className="font-extrabold text-[#D0193E] text-[15vw] md:text-[6vw] leading-none">
                    {mainValue}
                  </p>

                  {/* Applying custom font style for the unit, specifically for 'hr' */}
                  <span className={`text-[#D0193E] font-extrabold  text-[4.25vw] md:text-[1.255vw] ml-0.5 ${props.unitFont ? `font-['${props.unitFont}']` : ''}`}>
                    {unit}
                  </span>
                </div>

                <div>
                  <p className="text-[4.25vw]  md:text-[1.25vw] text-left text-[#D0193E] font-normal">
                    {props.label.split(" ")[0]}
                  </p>

                  <p className="text-[4.25vw]  md:text-[2.15vw] text-left text-[#5F237B] font-semibold">
                    {props.label.split(" ")[1]}
                  </p>
                </div>
              </div>
              );
};

              const ModuleCard = ({module}: {module: any }) => {
  // Determine text color based on locked status
  const textColor = module.locked ? 'text-[#757888]' : 'text-purple-900';
              // Determine card background color
              const cardBg = module.locked ? 'bg-[#F1F5F9] border-gray-200' : 'bg-amber-50';
              // Determine icon container background color
              const iconBg = module.locked ? 'bg-[#F1F5F9] border-gray-400' : 'bg-white border-gray-900';
              // Determine clock icon color (for text/span element wrapping the icon)
              const clockColor = module.locked ? 'text-[#D9D9D9]' : 'text-black-500';


              return (
              // Card container is no longer relative
              <div className={`flex items-center gap-4 p-4 rounded-lg border border-amber-100 hover:shadow-md transition-shadow ${cardBg}`}>

                {/* Module specific icon (replaces generic fact.svg) */}
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${iconBg}`}>
                    <img
                      src={module.iconSrc || "/fact.svg"}
                      className={`w-full h-full object-cover ${module.locked ? "grayscale opacity-70" : ""}`}
                      alt={module.title}
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  {/* Title text color */}
                  <h3 className={`text-xl font-bold mb-1 ${textColor}`}>{module.title}</h3>
                  {/* Description text color */}
                  <p className={`mb-3 text-sm ${textColor}`}>{module.description}</p>

                  <div className="flex items-center gap-4">
                    {/* Level text color */}
                    <div className={`flex items-center gap-2 font-medium text-sm ${textColor}`}>
                      <img src={"/Level.svg"} className="w-4 h-4" />
                      <span>{module.level}</span>
                    </div>
                    {/* Duration/Clock text and icon color */}
                    <div className={`flex items-center gap-2 font-medium text-sm ${clockColor}`}>
                      {/* The clock icon color is now handled by the parent div's text color */}
                      <img src={"/uim_clock.svg"} className={`w-4 h-4`} />
                      <span>{module.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Lock/Unlock Icon - Reverted to its original position at the end of the flex container */}
                <div className="flex-shrink-0">
                  {module.locked ? (
                    // Locked Module - Original small lock icon (assuming w-6 h-6 and default style/color)
                    <img src={"/lock.svg"} className="w-6 h-6 text-white" />
                  ) : (
                    // Unlocked Module - using orange unlock.svg
                    <img src={"/unlock.svg"} className="w-6 h-6 text-[#FF9348]" />
                  )}
                </div>
              </div>
              );
};












// "use client";

// import { ChevronRight, ChevronDown } from 'lucide-react';
// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// const Workshop = () => {
//   const [expandedPhases, setExpandedPhases] = useState<string[]>(["phase-1"]);
//   const navigate = useNavigate();

//   const togglePhase = (phaseId: string) => {
//     setExpandedPhases((prev) =>
//       prev.includes(phaseId)
//         ? prev.filter((id) => id !== phaseId)
//         : [...prev, phaseId]
//     );
//   };

//   const phases = [
//     {
//       id: "phase-1",
//       title: "Phase 1: Beginner Level",
//       color: "text-red-600",
//       modules: [
//         { id: "module-1", title: "Find your vibe", description: "Let's help you build your feed!", level: "Beginner Level", duration: "5:00", locked: false, iconSrc: "/M1.jpg" },
//         { id: "module-2", title: "Pick & Flick", description: "Let's help you build your newsfeed!", level: "Beginner Level", duration: "5:00", locked: true, iconSrc: "/M2.jpg" },
//       ],
//     },
//     {
//       id: "phase-2",
//       title: "Phase 2: Intermediate Level",
//       color: "text-red-600",
//       modules: [
//         { id: "module-3", title: "Fact or Fact", description: "Is everything not real?!", level: "Intermediate Level", duration: "5:00", locked: true, iconSrc: "/M3.jpg" },
//         { id: "module-4", title: "Spot the Bias", description: "Let's help you build your newsfeed!", level: "Intermediate Level", duration: "5:00", locked: true, iconSrc: "/M4.jpg" },
//         { id: "module-5", title: "Behind the buzz", description: "Trace the spark that sets your feed on fire!", level: "Intermediate Level", duration: "5:00", locked: true, iconSrc: "/M5.png" },
//       ],
//     },
//     {
//       id: "phase-3",
//       title: "Phase 3: Advanced Level",
//       color: "text-red-600",
//       modules: [
//         { id: "module-6", title: "Debate Switch", description: "One debate, two sides, endless perspectives", level: "Advanced Level", duration: "5:00", locked: true, iconSrc: "/M6.jpg" },
//         { id: "module-7", title: "In Their Shoes", description: "Step into another perspective", level: "Advanced Level", duration: "5:00", locked: true, iconSrc: "/M7.jpg" },
//       ],
//     },
//   ];

//   return (
//     <div className="w-full p-4 md:p-8 flex justify-center">
//       <div className="w-full pb-4 overflow-auto bg-[#F8F1E7] rounded-2xl shadow-xl">

//         {/* HEADER */}
//         <div className="bg-[#5F237B] text-white px-4 md:px-12 rounded-t-2xl flex flex-col md:flex-row justify-between items-center">
//           <div className="py-6 md:py-10">
//             <h1 className="text-[10vw] md:text-[94px] text-[#F8F1E7] font-extrabold leading-none">
//               Welcome to askwhy <br /> Workshop'25
//             </h1>
//           </div>
//           <img src="/header33.svg" className="w-40 md:w-auto" />
//         </div>

//         {/* STATS */}
//         <div className="flex flex-col lg:flex-row items-center justify-center gap-4 px-4 md:px-16 py-6">
//           <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full justify-center">
//             <StatBox number="7" label="Total Modules" />
//             <StatBox number="3" label="Total Phases" />
//             <StatBox number="3" label="Difficulty Levels" />
//             <StatBox number="1 hr" label="Total Duration" />

//             <div
//               onClick={() => navigate("/interest")}
//               className="cursor-pointer flex justify-between lg:justify-center items-center gap-4 bg-[#FF9348] hover:bg-[#ff7e1a] text-white px-6 py-3 rounded-[16px] font-semibold w-full lg:w-[15vw]"
//             >
//               <div>
//                 <div className="text-left text-sm md:text-base">Click here to</div>
//                 <div className="text-left font-semibold text-xl md:text-[1.5vw]">Start</div>
//               </div>
//               <ChevronRight size={40} />
//             </div>
//           </div>
//         </div>

//         {/* DESCRIPTION + MODULES GRID */}
//         <div className="flex flex-col md:flex-row gap-8 px-4 md:px-16">

//           {/* TEXT SIDE */}
//           <div className="py-4 text-gray-700">
//             <p className="mb-4 text-[#4C1C62] font-gabarito text-xl md:text-2xl">
//               A glow up for your brain. How does that sound?
//             </p>
//             <p className="text-[#4C1C62] font-gabarito text-xl md:text-2xl">
//               We're here to help. Turn <span className="font-semibold">curiosity</span> into your superpower.
//               <span className="font-semibold"> Play. Challenge. Ask Why.</span>
//               Let’s start your journey with us!
//             </p>
//           </div>

//           {/* MODULES CARD */}
//           <div className="bg-white rounded-2xl p-4 md:p-6 w-full md:w-[50vw]">
//             <h2 className="text-[#5F237B] font-gabarito font-semibold text-3xl md:text-4xl">
//               All Modules
//             </h2>

//             <div className="max-h-80 md:max-h-96 overflow-y-scroll mt-4 pr-2">

//               {phases.map((phase) => (
//                 <div key={phase.id} className="mb-6">

//                   {/* PHASE HEADER */}
//                   <div
//                     className="flex items-center gap-3 cursor-pointer mb-4"
//                     onClick={() => togglePhase(phase.id)}
//                   >
//                     <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-purple-700"></div>

//                     <h3 className={`font-gabarito font-semibold text-xl md:text-2xl ${phase.color}`}>
//                       {phase.title}
//                     </h3>

//                     <ChevronDown
//                       className={`w-5 h-5 transition-transform ${
//                         expandedPhases.includes(phase.id) ? "rotate-180" : ""
//                       }`}
//                     />
//                   </div>

//                   {/* MODULES */}
//                   {expandedPhases.includes(phase.id) && (
//                     <div className="space-y-4 pl-4 border-l border-gray-300">
//                       {phase.modules.map((module) => (
//                         <ModuleCard key={module.id} module={module} />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Workshop;

// /* ---------- COMPONENTS ---------- */

// const StatBox = ({ number, label }: { number: string; label: string }) => {
//   const [value, unit] = number.split(" ");

//   return (
//     <div className="px-6 py-4 bg-white rounded-[16px] rounded-bl-none w-full lg:w-[15vw] text-center shadow-sm">
//       <div className="flex items-baseline justify-center gap-1">
//         <p className="font-extrabold text-[#D0193E] text-[10vw] lg:text-[6vw] leading-none">{value}</p>
//         <span className="text-[#D0193E] text-lg lg:text-[1.2vw] font-extrabold">{unit}</span>
//       </div>

//       <p className="text-[#D0193E] text-lg lg:text-[1.2vw]">{label}</p>
//     </div>
//   );
// };

// const ModuleCard = ({ module }: { module: any }) => {
//   const locked = module.locked;

//   return (
//     <div
//       className={`flex items-center gap-4 p-4 rounded-lg border ${
//         locked ? "bg-[#F1F5F9] border-gray-200" : "bg-amber-50 border-amber-200"
//       }`}
//     >
//       <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border">
//         <img src={module.iconSrc} className={`w-full h-full object-cover ${locked ? "grayscale opacity-70" : ""}`} />
//       </div>

//       <div className="flex-1">
//         <h3 className={`text-lg md:text-xl font-bold ${locked ? "text-gray-500" : "text-purple-900"}`}>
//           {module.title}
//         </h3>
//         <p className={`text-sm mb-2 ${locked ? "text-gray-500" : "text-purple-900"}`}>{module.description}</p>

//         <div className="flex items-center gap-4 text-sm">
//           <span className={`${locked ? "text-gray-400" : "text-black"} flex items-center gap-2`}>
//             <img src="/Level.svg" className="w-4 h-4" /> {module.level}
//           </span>

//           <span className={`${locked ? "text-gray-300" : "text-black"} flex items-center gap-2`}>
//             <img src="/uim_clock.svg" className="w-4 h-4" /> {module.duration}
//           </span>
//         </div>
//       </div>

//       <img
//         src={locked ? "/lock.svg" : "/unlock.svg"}
//         className="w-6 h-6"
//       />
//     </div>
//   );
// };






// "use client";

// import { ChevronRight, ChevronDown } from "lucide-react";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Workshop = () => {
//   const [expandedPhases, setExpandedPhases] = useState<string[]>(["phase-1"]);
//   const navigate = useNavigate();

//   const togglePhase = (phaseId: string) => {
//     setExpandedPhases((prev) =>
//       prev.includes(phaseId)
//         ? prev.filter((id) => id !== phaseId)
//         : [...prev, phaseId]
//     );
//   };

//   const phases = [
//     {
//       id: "phase-1",
//       title: "Phase 1: Beginner Level",
//       color: "text-red-600",
//       modules: [
//         { id: "module-1", title: "Find your vibe", description: "Let's help you build your feed!", level: "Beginner Level", duration: "5:00", locked: false, iconSrc: "/M1.jpg" },
//         { id: "module-2", title: "Pick & Flick", description: "Let's help you build your newsfeed!", level: "Beginner Level", duration: "5:00", locked: true, iconSrc: "/M2.jpg" },
//       ],
//     },
//     {
//       id: "phase-2",
//       title: "Phase 2: Intermediate Level",
//       color: "text-red-600",
//       modules: [
//         { id: "module-3", title: "Fact or Fact", description: "Is everything not real?!", level: "Intermediate Level", duration: "5:00", locked: true, iconSrc: "/M3.jpg" },
//         { id: "module-4", title: "Spot the Bias", description: "Let's help you build your newsfeed!", level: "Intermediate Level", duration: "5:00", locked: true, iconSrc: "/M4.jpg" },
//         { id: "module-5", title: "Behind the buzz", description: "Trace the spark that sets your feed on fire!", level: "Intermediate Level", duration: "5:00", locked: true, iconSrc: "/M5.png" },
//       ],
//     },
//     {
//       id: "phase-3",
//       title: "Phase 3: Advanced Level",
//       color: "text-red-600",
//       modules: [
//         { id: "module-6", title: "Debate Switch", description: "One debate, two sides, endless perspectives", level: "Advanced Level", duration: "5:00", locked: true, iconSrc: "/M6.jpg" },
//         { id: "module-7", title: "In Their Shoes", description: "Step into another perspective", level: "Advanced Level", duration: "5:00", locked: true, iconSrc: "/M7.jpg" },
//       ],
//     },
//   ];

//   return (
//     <div className="w-full p-3 sm:p-4 md:p-5 lg:p-8 flex justify-center">
//       <div className="w-full pb-4 overflow-auto h-[90vh] bg-[#F8F1E7] rounded-2xl shadow-xl">

//         {/* HEADER */}
//         <div className="bg-[#5F237B] text-white px-4 sm:px-6 md:px-8 lg:px-12 rounded-t-2xl flex flex-col sm:flex-row justify-between items-center">
//           <div className="py-6 sm:py-5 md:py-10 text-center sm:text-left">
//             <h1 className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[94px] text-[#F8F1E7] font-['Gabarito'] font-extrabold leading-[100%] tracking-[0%]">
//               Welcome to askwhy <br /> Workshop'25
//             </h1>
//           </div>
//           <div className="mt-4 sm:mt-0">
//             <img src={"/header33.svg"} alt="Character" className="w-32 sm:w-40 md:w-auto" />
//           </div>
//         </div>

//         {/* STATS BAR */}
//         <div className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-16 py-6 gap-4">
//           <StatBox number="7" label="Total Modules" />
//           <StatBox number="3" label="Total Phases" />
//           <StatBox number="3" label="Difficulty Levels" />
//           <StatBox number="1 hr" label="Total Duration" unitFont="Gabarito" />
//           <div onClick={() => navigate("/interest")} className="flex w-full sm:w-[60%] md:w-[15vw] justify-center items-center gap-4 bg-[#FF9348] hover:bg-[#ff7e1a] text-white px-6 py-3 rounded-[16px] rounded-bl-none font-semibold transition">
//             <div>
//               <div className="text-left text-sm sm:text-base font-normal">Click here to</div>
//               <div className="text-left font-semibold text-xl sm:text-[1.5vw]">Start</div>
//             </div>
//             <ChevronRight size={40} />
//           </div>
//         </div>

//         {/* DESCRIPTION + MODULES */}
//         <div className="flex flex-col md:flex-row gap-8 px-4 sm:px-6 md:px-16">
//           {/* TEXT */}
//           <div className="py-4 text-gray-700 text-center md:text-left">
//             <p className="mb-4 text-[#4C1C62] font-gabarito font-normal text-xl md:text-2xl leading-none tracking-normal">
//               A glow up for your brain. How does that <br />sound?
//             </p>
//             <p className="text-[#4C1C62] font-gabarito font-normal text-xl md:text-2xl tracking-normal">
//               We're here to help. Turn <span className="font-semibold">curiosity</span> into <br /> your superpower.
//               <span className="font-semibold"> Play. Challenge. Ask Why.</span> Let's start your journey with us!
//             </p>
//           </div>

//           {/* MODULES LIST */}
//           <div className="bg-white rounded-2xl p-4 md:p-6 w-full md:w-[50vw] max-w-full">
//             <h2 className="text-[#5F237B] font-gabarito font-semibold text-3xl md:text-4xl leading-none tracking-normal mb-4">
//               All Modules
//             </h2>

//             <div className="max-h-96 overflow-y-scroll pr-2">
//               {phases.map((phase) => (
//                 <div key={phase.id} className="mb-6">
//                   {/* Phase Header */}
//                   <div className="flex items-center gap-3 cursor-pointer mb-4" onClick={() => togglePhase(phase.id)}>
//                     <div className="w-4 h-4 rounded-full bg-purple-700"></div>
//                     <h3 className={`font-gabarito font-semibold text-xl md:text-2xl ${phase.color}`}>
//                       {phase.title}
//                     </h3>
//                     <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedPhases.includes(phase.id) ? "rotate-180" : ""}`} />
//                   </div>

//                   {/* Modules List */}
//                   {expandedPhases.includes(phase.id) && (
//                     <div className="space-y-4 pl-4 md:pl-8 border-l border-gray-300">
//                       {phase.modules.map((module) => (
//                         <ModuleCard key={module.id} module={module} />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Workshop;

// /* ---------- COMPONENTS ---------- */
// const StatBox = ({ number, label, unitFont }: { number: string; label: string; unitFont?: string }) => {
//   const [value, unit] = number.split(" ");
//   return (
//     <div className="px-6 py-4 bg-white rounded-[16px] rounded-bl-none w-full sm:w-auto text-center shadow-sm flex flex-col items-center">
//       {/* <div className="flex items-baseline justify-center gap-1">
//         <p className="font-extrabold text-[#D0193E] text-[6vw] sm:text-[5vw] md:text-[6vw] leading-none">{value}</p>
//         <span className={`text-[#D0193E] text-lg md:text-[1.2vw] font-extrabold ${unitFont ? `font-['${unitFont}']` : ''}`}>{unit}</span>
//       </div>
//       <p className="text-[#D0193E] text-lg md:text-[1.2vw]">{label}</p> */}

//       <div className="flex items-center justify-center px-16  py-6 flex-col">
// //           <div className="flex gap-8 flex-col md:flex-row lg:flex-row">
// //             <StatBox number="7" label="Total Modules" />
// //             <StatBox number="3" label="Total Phases" />
// //             <StatBox number="3" label="Difficulty Levels" />
// //             {/* Pass unitFont for 'hr' style */}
// //             <StatBox number="1 hr" label="Total Duration" unitFont="Gabarito" />
// //             <div onClick={() => navigate("/interest")} className="flex w-[15vw] justify-center items-center gap-4 bg-[#FF9348] hover:bg-[#ff7e1a] text-white px-6 py-3  rounded-[16px]  rounded-bl-none font-semibold  transition">
// //               <div>
// //                 <div className="text-left font-normal">Click here to</div>
// z//                 <div className="text-left font-semibold text-[1.5vw]">
//                    {" "}
//                   Start
//                  </div>
//                </div>
//                <div>
//                  <ChevronRight size={60} />
//                </div>
//              </div>
//          </div>
//       </div>
//       );
// };

//       const ModuleCard = ({module}: {module: any }) => {
//   const locked = module.locked;
//       return (
//       <div className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg border ${locked ? "bg-[#F1F5F9] border-gray-200" : "bg-amber-50 border-amber-200"}`}>
//         <div className="w-20 h-20 rounded-lg overflow-hidden border flex-shrink-0">
//           <img src={module.iconSrc} className={`w-full h-full object-cover ${locked ? "grayscale opacity-70" : ""}`} />
//         </div>
//         <div className="flex-1 text-center sm:text-left">
//           <h3 className={`text-xl font-bold ${locked ? "text-gray-500" : "text-purple-900"}`}>{module.title}</h3>
//           <p className={`text-sm mb-2 ${locked ? "text-gray-500" : "text-purple-900"}`}>{module.description}</p>
//           <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm justify-center sm:justify-start">
//             <span className={`${locked ? "text-gray-400" : "text-black"} flex items-center gap-2`}>
//               <img src="/Level.svg" className="w-4 h-4" /> {module.level}
//             </span>
//             <span className={`${locked ? "text-gray-300" : "text-black"} flex items-center gap-2`}>
//               <img src="/uim_clock.svg" className="w-4 h-4" /> {module.duration}
//             </span>
//           </div>
//         </div>
//         <img src={locked ? "/lock.svg" : "/unlock.svg"} className="w-6 h-6 mt-2 sm:mt-0" />
//       </div>
//       );
// };
