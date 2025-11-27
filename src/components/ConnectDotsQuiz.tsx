"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { decreaseScore } from "@/store/topicsSlice";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import OpeningModal from "./OpeningModal";
import ClosingModal from "./ClosingModal";
import ModuleHeader from "./ModuleHeader";

const ConnectDotsQuiz = ({ rounds }: any) => {
  const score = useSelector((state: RootState) => state.topics.score);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [done, setDone] = useState(false);

  const currentRound = rounds[currentIndex];
  const behind = currentRound?.behind;
  const answers = currentRound?.answers;

  useEffect(() => {
    if (!behind) return;
    loadImage(`${behind.Image}.png`);
  }, [currentIndex]);

  const loadImage = async (filename: string) => {
    const cleanFilename = filename.replace(/\u200B/g, "");
    const { data } = supabase.storage.from("Thesis").getPublicUrl(`Modules/${cleanFilename}`);
    if (data?.publicUrl) setImageUrl(data.publicUrl);
  };

  if (!currentRound || !answers) return <p className="text-center mt-10 text-sm sm:text-base">Loading...</p>;

  const handleSelect = (word: string, isCorrect: boolean) => {
    setSelectedAnswer(word);
    if (isCorrect) dispatch(decreaseScore(3));

    setTimeout(() => {
      if (currentIndex < rounds.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setIsComplete(true);
      }
    }, 800);
  };

  const ending = (
    <div className="text-sm sm:text-base md:text-lg leading-tight">
      You’ve outsmarted polarization and tackled biases! <br />
      Your <span className="text-[#FF9348]">curiosity’s</span> flying. <span className="text-[#5F237B]">Good Job!</span>
    </div>
  );

  if (isComplete || done) {
    return (
      <ClosingModal
        module={5}
        text={"All motivations behind a creator’s mind figured!"}
        src={"/debate"}
        ending={ending}
        score={score}
      />
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="bg-[#F8F1E7] min-h-screen overflow-auto flex flex-col items-center">
        <OpeningModal
          src={"/opening15.png"}
          showIntroModal={showIntroModal}
          moduleId={"M5"}
          setShowIntroModal={setShowIntroModal}
          phase={"II"}
          module={"Module 5: Behind the buzz"}
          description={
            <div className="text-xs sm:text-sm md:text-base">
              Time to dive into the minds behind the viral! Pick your prompts and uncover what really makes people hit “share.” See how personal motives and biases spark chain reactions across your feed — and maybe even the whole internet!
            </div>
          }
          time={"3:00"}
          level={"Intermediate"}
          calculated={""}
        />

        <ModuleHeader
          time={300}
          src={"/opening15.png"}
          heading="Behind the buzz"
          description="Trace the spark that sets your feed on fire"
          total={1}
          setDone={setDone}
          left={1 - currentIndex}
          polarizationScore={score}
        />

        <p className="font-normal text-sm sm:text-base md:text-lg text-center py-6 text-gray-800">
          What might have made the creator post something that got so much attention?
        </p>

        <div className="w-full flex justify-center items-center mb-6">
          <div className="relative inline-block rounded-2xl overflow-hidden">
            {behind?.Image && (
              <img
                src={imageUrl}
                alt="TikTok Post"
                className="h-[25vh] sm:h-[30vh] md:h-[35vh] w-auto object-contain"
              />
            )}
            {behind?.Reach && (
              <div className="absolute top-2 right-3 flex items-center gap-2 border border-black rounded-tl-[8px] rounded-tr-[8px]">
                <div className="bg-[#E00040] text-white flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-tl-[8px] rounded-tr-[8px] text-[0.6rem] sm:text-xs md:text-sm">
                  {behind.Reach.split(" ")[0]} <span className="font-normal text-[0.5rem] sm:text-[0.6rem] md:text-[0.75rem]">{behind.Reach.split(" ")[1]}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl px-4">
          {answers.map((answer: any, index: number) => {
            const optionLabel = String.fromCharCode(65 + index);
            const isCorrect = answer.Word === behind.Correct_Answer;
            const isSelected = selectedAnswer === answer.Word;

            return (
              <div
                key={answer.id}
                className={`rounded-2xl p-3 cursor-pointer transition-all bg-[#EDE1D0] flex flex-col justify-between h-[20vh] sm:h-[22vh] md:h-[24vh]`}
                onClick={() => handleSelect(answer.Word, isCorrect)}
              >
                {!isSelected && (
                  <div className="text-xs sm:text-sm md:text-base">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="bg-white px-2 rounded-full text-[0.6rem] sm:text-xs md:text-sm font-semibold">{optionLabel}</h3>
                      <h3 className="font-medium text-[0.7rem] sm:text-sm md:text-base">{answer.Word}</h3>
                    </div>
                    <p className="text-[0.55rem] sm:text-[0.65rem] md:text-sm text-gray-900">{answer.Description}</p>
                  </div>
                )}

                {isSelected && isCorrect && (
                  <div className="flex h-full justify-center items-center">
                    <img src="/try.svg" className="h-[10vh] sm:h-[12vh] md:h-[15vh] object-contain" />
                  </div>
                )}

                {isSelected && !isCorrect && (
                  <div className="flex h-full justify-center items-center">
                    <img src="/trynot.svg" className="h-[10vh] sm:h-[12vh] md:h-[15vh] object-contain" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConnectDotsQuiz;
