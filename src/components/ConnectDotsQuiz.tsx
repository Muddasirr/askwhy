"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import OpeningModal from "./OpeningModal";

interface Answer {
  id: string;
  answer_number: number;
  title: string;
  explanation: string;
}

interface Question {
  id: string;
  question_text: string;
  headline: string;
  tiktok_image_filename: string;
  correct_answer: number;
  answers: Answer[];
}


const ConnectDotsQuiz = ({ rounds }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(true);

  const navigate = useNavigate();

  const currentRound = rounds[currentIndex]; // ← IMPORTANT
  const behind = currentRound?.behind;
  const answers = currentRound?.answers;

  // ----------------------------------------
  // Load image whenever the round changes
  // ----------------------------------------
  useEffect(() => {
    if (!behind) return;
    loadImage(`${behind.Image}.png`);
  }, [currentIndex]);

  const loadImage = async (filename: string) => {
    const cleanFilename = filename.replace(/\u200B/g, "");
    const { data } = supabase.storage
      .from("Thesis")
      .getPublicUrl(`Modules/${cleanFilename}`);

    if (data?.publicUrl) setImageUrl(data.publicUrl);
  };

  // ----------------------------------------
  // End Loading State
  // ----------------------------------------
  if (!currentRound || !answers) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // ----------------------------------------
  // Handle Answer Click
  // ----------------------------------------
  const handleSelect = (word: string, isCorrect: boolean) => {
    setSelectedAnswer(word);

    setTimeout(() => {
      if (currentIndex < rounds.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setIsComplete(true);
      }
    }, 800);
  };

  // ----------------------------------------
  // COMPLETION SCREEN
  // ----------------------------------------
  if (isComplete) {
    return (
      <div className="p-8">
        <ClosingModal />
      </div>
    );
  }

  // ----------------------------------------
  // MAIN UI
  // ----------------------------------------
  return (
    <div className="p-8 bg-[#F8F1E7] min-h-screen flex flex-col items-center">
      <div className="w-full px-24 rounded-3xl shadow-sm relative">

        <OpeningModal
          src={"/opening15.png"}
          showIntroModal={showIntroModal}
          moduleId={"M5"}
          setShowIntroModal={setShowIntroModal}
        />

        <ModuleHeader />

        {/* Round/Question Header */}
        <h2 className="text-2xl font-normal text-black mb-6 text-center">
          Reel #{currentIndex + 1}
        </h2>

        {/* Image */}
        <div className="flex items-center justify-center rounded-2xl overflow-hidden mb-4">
          {behind?.Image && (
            <img
              src={imageUrl}
              alt="TikTok Post"
              className="h-[35vh] w-auto object-contain"
            />
          )}
        </div>

        {/* Text Box */}
        <div className="bg-[#EDE1D0] px-6 pb-8 pt-2 text-center">
          <p className="text-[black] text-lg font-normal">
            {behind?.Image_Text}
          </p>
        </div>

        {/* Reach Box */}
        <div className="bg-white flex justify-center items-center gap-10 py-2 mt-8">
          <div className="text-center">
            <p className="text-[#D0193E] font-bold text-3xl">
              {behind?.Reach?.split(" ")[0]}
            </p>
            <p className="text-gray-700 text-sm font-medium">
              {behind?.Reach?.split(" ")[1]}
            </p>
          </div>
        </div>

        {/* Question */}
        <p className="font-semibold text-gray-800 py-8 text-center">
          What might have made the creator post something that got so much attention?
        </p>

        {/* Answer Options */}
        <div className="grid grid-cols-3 gap-4">
          {answers.map((answer: any, index: number) => {
            const optionLabel = String.fromCharCode(65 + index); // A, B, C
            const isCorrect = answer.Word === behind.Correct_Answer;
            const isSelected = selectedAnswer === answer.Word;

            return (
              <Card
                key={answer.id}
                className={`
                  p-6 cursor-pointer transition-all border-2 bg-[#EDE1D0]
                  ${isSelected && isCorrect ? "bg-[#FF9348]" : ""}
                  ${isSelected && !isCorrect ? "border-red-500 bg-red-100" : ""}
                `}
                onClick={() => handleSelect(answer.Word, isCorrect)}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-black bg-white px-2 rounded-[33px] inline-block">
                    {optionLabel}
                  </h3>
                  <h3>{answer.Word}</h3>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {answer.Description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};




export default ConnectDotsQuiz;

const ModuleHeader = () => {
  return (
      <>
          <div className="  pt-6 mb-2">
              <div className="flex items-center justify-between">
                  {/* Left side: Icon + Module Info */}
                  <div className="flex items-center gap-8">
                      {/* Puzzle Icon */}
                      <div className="w-25 rounded-lg flex items-center justify-center relative flex-shrink-0 ">
                          <img
                              src={"/opening15.png"}
                              alt="Module 1"
                              className="w-25  object-contain"
                          />
                      </div>

                      {/* Module Info */}
                      <div>
                      <h1 className="font-semibold text-[36px] leading-[100%] tracking-[0] text-[#201E1C] mb-2">
Behind the Buzz</h1>

<p className="font-normal text-[16px] leading-[100%] tracking-[0] text-[#201E1C] mb-2">
Trace the spark that sets your feed on fire!
</p>


                          <div className="flex items-center gap-4 text-[#201E1C]">
<img src={"/clocl.svg"} />

                              <span className="font-normal text-[24px] leading-[100%] tracking-[0]">
02:00
</span>

                          </div>

                      </div>
                  </div>

                  {/* Right side: Counter */}
                  <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">/7</div>
                  </div>
              </div>
          </div>

          {/* Instructions */}
          
      </>)
}




 function ClosingModal () {

  const navigate = useNavigate();


  return (
    <div className="p-8">
<div className="h-[90vh] flex items-start justify-center rounded-[24px] pt-8" style={{ backgroundColor: '#F8F1E7' }}>
              <div className="max-w-2xl w-full mx-auto bg-[#F8F1E7] rounded-3xl shadow-sm  text-center">

              {/* Module Completion Header */}
              <div className="flex items-center justify-center gap-4 mb-6">
              <div className="mx-auto w-24 h-24 rounded-full  p-[12px] bg-[linear-gradient(180deg,#D0193E_0%,#5F237B_100%)]">
<div className="w-full h-full bg-[#FDF8F3] rounded-full flex items-center justify-center text-4xl font-semibold text-gray-700">
  –
</div>
</div>
                  <div className="text-left">
                  <h1 className=" text-[#5F237B] font-bold text-[54px] leading-[100%] tracking-[0%]  mb-2">
  Module 5: Complete
</h1>


<p className="text-black font-normal text-[18px] leading-[100%] mt-1">
2/2 motivations behind a creator’s mind figured! </p>

                  </div>
              </div>

              {/* Score Circle */}
              <div className="mt-10 mb-10 flex justify-center items-center">
<img src={"/closingg.svg"} className="h-[35vh]" />

              </div>

<div>
You’ve outsmarted polarization and tackled biases! <br/>Your<span className="text-[#FF9348]"> curiosity’s</span> flying.<span className="text-[#5F237B]"> Good Job!</span> 
</div>
              {/* Next Module Button */}
              <Button
                  size="lg"
                  onClick={() => navigate(`/debate`)}
                  className="mt-6 px-8 py-2 rounded-md bg-[#FF9348]  text-white text-base"
              >
                  Next Module →
              </Button>
          </div>
      </div>
      </div>
  );
} 
