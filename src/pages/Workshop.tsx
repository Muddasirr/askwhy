"use client";

<<<<<<< HEAD
import { ChevronRight, ChevronDown } from 'lucide-react';
=======
import { ChevronRight, Lock, Clock, BookOpen, ChevronDown } from 'lucide-react';
>>>>>>> upstream/main
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Workshop = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> upstream/main
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
<<<<<<< HEAD
        { id: "module-1", title: "Find your vibe", description: "Let's help you build your feed!", level: "Beginner Level", duration: "5:00", locked: false },
        { id: "module-2", title: "Pick & Flick", description: "Let's help you build your newsfeed!", level: "Beginner Level", duration: "5:00", locked: true },
=======
        {
          id: "module-1",
          title: "Find your vibe",
          description: "Let's help you build your feed!",
          level: "Beginner Level",
          duration: "5:00",
          locked: false, // UNLOCKED
        },
        {
          id: "module-2",
          title: "Pick & Flick",
          description: "Let's help you build your newsfeed!",
          level: "Beginner Level",
          duration: "5:00",
          locked: true,
        },
>>>>>>> upstream/main
      ],
    },
    {
      id: "phase-2",
      title: "Phase 2: Intermediate Level",
      color: "text-red-600",
      modules: [
<<<<<<< HEAD
        { id: "module-3", title: "Fact or Fact", description: "Is everything not real?!", level: "Intermediate Level", duration: "5:00", locked: true },
        { id: "module-4", title: "Spot the Bias", description: "Let's help you build your newsfeed!", level: "Intermediate Level", duration: "5:00", locked: true },
        { id: "module-5", title: "Behind the buzz", description: "Trace the spark that sets your feed on fire!", level: "Intermediate Level", duration: "5:00", locked: true },
=======
        {
          id: "module-3",
          title: "Fact or Fact",
          description: "Is everything not real?!",
          level: "Intermediate Level",
          duration: "5:00",
          locked: true, // UNLOCKED
        },
        {
          id: "module-4",
          title: "Spot the Bias",
          description: "Let's help you build your newsfeed!",
          level: "Intermediate Level",
          duration: "5:00",
          locked: true,
        },
        {
          id: "module-5",
          title: "Behind the buzz",
          description: "Trace the spark that sets your feed on fire!",
          level: "Intermediate Level",
          duration: "5:00",
          locked: true,
        },
>>>>>>> upstream/main
      ],
    },
    {
      id: "phase-3",
      title: "Phase 3: Advanced Level",
      color: "text-red-600",
      modules: [
<<<<<<< HEAD
        { id: "module-6", title: "Debate Switch", description: "One debate, two sides, endless perspectives", level: "Advanced Level", duration: "5:00", locked: false },
        { id: "module-2", title: "Pick & Flick", description: "Let's help you build your newsfeed!", level: "Advanced Level", duration: "5:00", locked: true },
      ],
    },
  ];

  return (
    <div className="w-full p-4 md:p-8 flex justify-center">
      <div className="w-full pb-4 overflow-auto bg-[#F8F1E7] rounded-2xl shadow-xl">
        
        {/* ================= HEADER ================= */}
        <div className="bg-[#5F237B] text-white px-4 md:px-12 rounded-t-2xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
          
          {/* Title Area - FIXED: Added lg:text-[6.5vw] for proportional scaling */}
          <div className="py-6 md:py-10 order-2 md:order-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[6.5vw] xl:text-[94px] text-[#F8F1E7] font-['Gabarito'] font-extrabold leading-tight tracking-[0%]">
              Welcome to askwhy <br className="hidden sm:inline" /> Workshop'25
            </h1>
          </div>
          
          {/* Image Area */}
          <div className="order-1 md:order-2 w-full md:w-auto flex justify-center pt-4 md:pt-0">
            <img 
                src={"/header33.svg"} 
                alt="Character" 
                className="w-48 h-auto max-h-40 md:w-auto md:h-auto md:max-h-full object-contain md:max-w-[30vw] lg:max-w-xs" 
            />
=======
        {
          id: "module-6",
          title: "Debate Switch",
          description: "One debate, two sides, endless perspectives",
          level: "Advanced Level",
          duration: "5:00",
          locked: false, // UNLOCKED
        },
        {
          id: "module-2",
          title: "Pick & Flick",
          description: "Let's help you build your newsfeed!",
          level: "Advanced Level",
          duration: "5:00",
          locked: true,
        },
      ],
    },
    
    
  ];

  const navigate = useNavigate()
  return (
    <div className="w-full p-8 flex justify-center">
      <div className="w-full pb-4 overflow-auto h-[90vh] bg-[#F8F1E7] rounded-2xl shadow-xl">
        {/* ================= HEADER ================= */}
        <div className="bg-[#5F237B] text-white px-12 rounded-t-2xl flex justify-between items-center relative">
          <div className="py-10">
            <h1 className="text-[94px] text-[#F8F1E7] font-['Gabarito'] font-extrabold leading-[100%] tracking-[0%]">
              Welcome to askwhy <br /> Workshop'25
            </h1>
          </div>
          <div>
            <img src={"/header33.svg"} alt="Character" />
>>>>>>> upstream/main
          </div>
        </div>

        {/* ================= STATS BAR ================= */}
<<<<<<< HEAD
        <div className="flex items-center justify-center px-4 md:px-16 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 w-full">
            <StatBox number="7" label="Total Modules" />
            <StatBox number="3" label="Total Phases" />
            <StatBox number="3" label="Difficulty Levels" />
            <StatBox number="1 hr" label="Total Duration" unitFont="Gabarito" />
            
            <button onClick={()=>navigate("/interest")} className="col-span-2 sm:col-span-1 lg:col-span-1 flex justify-center items-center gap-2 md:gap-4 bg-[#FF9348] hover:bg-[#ff7e1a] text-white px-4 py-3 rounded-xl font-semibold shadow-md transition">
              <div className="leading-tight">
                <div className="text-left font-normal text-sm">Click here to</div>
                <div className="text-left font-semibold text-xl md:text-base lg:text-xl">
=======
        <div className="flex items-center justify-center px-16 py-6">
          <div className="flex gap-8">
            <StatBox number="7" label="Total Modules" />
            <StatBox number="3" label="Total Phases" />
            <StatBox number="3" label="Difficulty Levels" />
            {/* Pass unitFont for 'hr' style */}
            <StatBox number="1 hr" label="Total Duration" unitFont="Gabarito" />
            <button onClick={()=>navigate("/interest")} className="flex justify-center items-center gap-4 bg-[#FF9348] hover:bg-[#ff7e1a] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition">
              <div>
                <div className="text-left font-normal">Click here to</div>
                <div className="text-left font-semibold text-[1.5vw]">
>>>>>>> upstream/main
                  {" "}
                  Start
                </div>
              </div>
              <div>
<<<<<<< HEAD
                <ChevronRight size={30} className="w-8 h-8 md:w-16 md:h-16" />
=======
                <ChevronRight size={60} />
>>>>>>> upstream/main
              </div>
            </button>
          </div>
        </div>

<<<<<<< HEAD
        {/* ================= DESCRIPTION & MODULES WRAPPER ================= */}
        <div className="flex flex-col lg:flex-row justify-center px-4 md:px-16 gap-8 md:gap-16">
          
          <div className="py-6 text-gray-700 leading-relaxed w-full lg:w-auto">
            <p className="mb-4 text-[#4C1C62] font-gabarito font-normal text-xl md:text-2xl leading-snug tracking-normal">
              A glow up for your brain. How does that <br className="hidden sm:inline"></br>sound?
            </p>
            <p className="text-[#4C1C62] font-gabarito font-normal text-xl md:text-2xl tracking-normal leading-snug">
              We're here to help. Turn <span className="font-semibold">curiosity</span> into <br className="hidden sm:inline"></br> your superpower.
              <span className="font-semibold">
                {" "}
                Play. Challenge. Ask <br className="hidden sm:inline"></br>Why.
              </span>
                {" "}Let's start your journey with us!
            </p>
          </div>

          {/* ================= MODULES LIST ================= */}
          <div className="bg-white rounded-2xl opacity-100 p-4 md:p-6 flex flex-col gap-6 w-full lg:w-[50vw] md:max-w-2xl lg:max-w-3xl">
            <h2 className="text-[#5F237B] font-gabarito font-semibold text-3xl md:text-4xl leading-none tracking-normal">
              All Modules
            </h2>

            {/* Scroll container logic remains correct: max-h-none on mobile, max-h-96 for contained desktop scroll */}
            <div className="overflow-y-scroll pr-4 max-h-none md:max-h-96" style={{
              scrollbarWidth: "thin",
              scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)", 
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar': {
                  width: '17px', 
              },
              '&::-webkit-scrollbar-thumb': {
                  borderRadius: '15px', 
                  background: 'linear-gradient(180deg, #D0193E 0%, #5F237B 100%)', 
                  border: '4px solid white', 
              },
            }}>
              {phases.map((phase) => (
                <div key={phase.id} className="mb-6">
                  {/* Phase Header */}
                  <div
                    className="flex items-center gap-3 cursor-pointer mb-4 group"
                    onClick={() => togglePhase(phase.id)}
                  >
                    <div className="w-4 h-4 rounded-full bg-purple-700"></div>
                    <h3 className={`font-gabarito font-semibold text-xl md:text-2xl leading-none ${phase.color}`}>
                      {phase.title}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform ${
                        expandedPhases.includes(phase.id) ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Modules List */}
                  {expandedPhases.includes(phase.id) && (
                    <div
                      className="space-y-4 pl-8 border-left" 
                    style={{ borderLeftColor: '#D9D9D9', borderLeftWidth: '1px' }}>
                      {phase.modules.map((module) => (
                        <ModuleCard key={module.id} module={module} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
=======
        {/* ================= DESCRIPTION ================= */}
        <div className="flex flex-col gap-8">
          <div className="flex justify-center px-16 gap-16"> 
            <div className="py-6 text-gray-700 leading-relaxed">
              <p className="mb-4 text-[#4C1C62] font-gabarito font-normal text-2xl leading-none tracking-normal">
                A glow up for your brain. How does that <br></br>sound?
              </p>
              <p className="text-[#4C1C62] font-gabarito font-normal text-2xl  tracking-normal">
                We're here to help. Turn <span className="font-semibold">curiosity</span> into <br></br> your superpower.
                <span className="font-semibold">
                  {" "}
                  Play. Challenge. Ask <br></br>Why.
                </span>
                 {" "}Let's start your journey with us!
              </p>
            </div>

            {/* ================= MODULES LIST ================= */}
            <div className="bg-white rounded-2xl opacity-100 p-6 flex flex-col gap-6 w-[50vw] md:max-w-2xl lg:max-w-3xl">
              <h2 className="text-[#5F237B] font-gabarito font-semibold text-4xl leading-none tracking-normal">
                All Modules
              </h2>

              <div className="max-h-96 overflow-y-scroll pr-4" style={{
                /* Standard scrollbar properties (limited browser support for full customization) */
                scrollbarWidth: "thin",
                scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)", 
                
                /* Webkit scrollbar styles for chrome/safari */

                /* Custom scrollbar track */
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },

                /* Custom scrollbar thumb */
                '&::-webkit-scrollbar': {
                    width: '17px', // Set width
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '15px', // Set border-radius
                    background: 'linear-gradient(180deg, #D0193E 0%, #5F237B 100%)', // Set gradient background
                    border: '4px solid white', // Use border to simulate padding around the thumb
                },
              }}>
                {phases.map((phase) => (
                  <div key={phase.id} className="mb-6">
                    {/* Phase Header */}
                    <div
                      className="flex items-center gap-3 cursor-pointer mb-4 group"
                      onClick={() => togglePhase(phase.id)}
                    >
                      <div className="w-4 h-4 rounded-full bg-purple-700"></div>
                      <h3 className={`font-gabarito font-semibold text-2xl leading-none ${phase.color}`}>
                        {phase.title}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-600 transition-transform ${
                          expandedPhases.includes(phase.id) ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Modules List */}
                    {expandedPhases.includes(phase.id) && (
                      <div
                       className="space-y-4 pl-8 border-left" 
                      style={{ borderLeftColor: '#D9D9D9', borderLeftWidth: '1px' }}>
                        {phase.modules.map((module) => (
                          <ModuleCard key={module.id} module={module} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
>>>>>>> upstream/main
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;

/* ================= COMPONENTS ================= */

const StatBox = (props: { number: string; label: string; highlight?: boolean; unitFont?: string }) => {
  const parts = props.number.split(" ");
  const mainValue = parts[0];
  const unit = parts.length > 1 ? parts[1] : "";

  return (
    <div
<<<<<<< HEAD
      className={`p-3 md:px-6 flex items-center justify-center bg-white gap-2 md:gap-4 rounded-lg text-center ${
=======
      className={`px-6 flex items-center justify-center bg-white gap-4 rounded-lg text-center ${
>>>>>>> upstream/main
        props.highlight ? "border-purple-500 bg-purple-50" : "border-gray-300"
      }`}
    >
      <div className="flex items-end leading-none">
<<<<<<< HEAD
        <p className="font-extrabold text-[#D0193E] text-3xl md:text-5xl lg:text-[4vw] xl:text-5xl leading-none">
          {mainValue}
        </p>

        <span className={`text-[#D0193E] font-normal text-xs md:text-sm lg:text-base ml-0.5 mb-0.5 ${props.unitFont ? `font-['${props.unitFont}']` : ''}`}>
=======
        <p className="font-extrabold text-[#D0193E] text-[6vw] leading-none">
          {mainValue}
        </p>

        {/* Applying custom font style for the unit, specifically for 'hr' */}
        <span className={`text-[#D0193E] font-normal text-[2vw] ml-0.5 mb-1 ${props.unitFont ? `font-['${props.unitFont}']` : ''}`}>
>>>>>>> upstream/main
          {unit}
        </span>
      </div>

      <div>
<<<<<<< HEAD
        <p className="text-xs md:text-sm text-left text-[#D0193E] font-normal">
          {props.label.split(" ")[0]}
        </p>

        <p className="text-sm md:text-base text-left text-[#5F237B] font-semibold">
=======
        <p className="text-[1.25vw] text-left text-[#D0193E] font-normal">
          {props.label.split(" ")[0]}
        </p>

        <p className="text-[2.15vw] text-left text-[#5F237B] font-semibold">
>>>>>>> upstream/main
          {props.label.split(" ")[1]}
        </p>
      </div>
    </div>
  );
};

const ModuleCard = ({ module }: { module: any }) => {
<<<<<<< HEAD
  const textColor = module.locked ? 'text-[#757888]' : 'text-purple-900';
  const cardBg = module.locked ? 'bg-[#F1F5F9] border-gray-200' : 'bg-amber-50';
  const iconBg = module.locked ? 'bg-[#F1F5F9] border-gray-400' : 'bg-white border-gray-900';
  const clockColor = module.locked ? 'text-[#D9D9D9]' : 'text-black-500';

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-amber-100 hover:shadow-md transition-shadow ${cardBg}`}>
      
      {/* Icon placeholder */}
      <div className="flex-shrink-0 mb-2 sm:mb-0">
        <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-lg border-2 flex items-center justify-center ${iconBg}`}>
          <img src={"/fact.svg"} alt="Module Icon" className="w-10 h-10 sm:w-12 sm:h-12" />
=======
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
      
      {/* Icon placeholder (fact.svg) */}
      <div className="flex-shrink-0">
        {/* Adjusted background and border for fact.svg container */}
        <div className={`w-20 h-20 rounded-lg border-2 flex items-center justify-center ${iconBg}`}>
          <img src={"/fact.svg"} />
>>>>>>> upstream/main
        </div>
      </div>

      {/* Content Section */}
<<<<<<< HEAD
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-1 ${textColor} truncate`}>{module.title}</h3>
        <p className={`mb-3 text-xs sm:text-sm md:text-base ${textColor} truncate`}>{module.description}</p>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 justify-center sm:justify-start">
          <div className={`flex items-center gap-2 font-medium text-xs sm:text-sm md:text-base ${textColor}`}>
            <img src={"/Level.svg"} className="w-4 h-4 sm:w-5 sm:h-5" alt="Level Icon" /> 
            <span>{module.level}</span>
          </div>
          <div className={`flex items-center gap-2 font-medium text-xs sm:text-sm md:text-base ${clockColor}`}>
            <img src={"/uim_clock.svg"} className="w-4 h-4 sm:w-5 sm:h-5" alt="Clock Icon" /> 
=======
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
>>>>>>> upstream/main
            <span>{module.duration}</span>
          </div>
        </div>
      </div>
      
<<<<<<< HEAD
      {/* Lock/Unlock Icon */}
      <div className="flex-shrink-0 mt-2 sm:mt-0">
        {module.locked ? (
          <img src={"/lock.svg"} alt="Locked" className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <img src={"/unlock.svg"} alt="Unlocked" className="w-5 h-5 sm:w-6 sm:h-6" /> 
=======
      {/* Lock/Unlock Icon - Reverted to its original position at the end of the flex container */}
      <div className="flex-shrink-0">
        {module.locked ? (
          // Locked Module - Original small lock icon (assuming w-6 h-6 and default style/color)
          <img src={"/lock.svg"} className="w-6 h-6 text-white" />
        ) : (
          // Unlocked Module - using orange unlock.svg
          <img src={"/unlock.svg"} className="w-6 h-6 text-[#FF9348]" /> 
>>>>>>> upstream/main
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
};

=======
};
>>>>>>> upstream/main
