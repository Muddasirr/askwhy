/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { supabase } from "@/integrations/supabase/client";
import BiasQuiz from "@/components/BiasQuiz";
import { useNavigate } from "react-router";
import CircleScore from "@/components/CircleScore";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const SpotTheBias = () => {
  const topic = useSelector((state: RootState) => state.topics.topics);
  const score = useSelector((state: RootState) => state.topics.score);

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [biasQuizComplete, setBiasQuizComplete] = useState(false);

  const fetchSpotTheBias = useCallback(async () => {
    const { data, error } = await supabase.from("spotthebias").select("*");

    if (error) {
      console.error("Error fetching spotthebias:", error);
      return;
    }

    if (!data || data.length === 0) return;

    const shuffled = data.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, 1);

    setQuestions(selectedQuestions);
  }, []);

  useEffect(() => {
    fetchSpotTheBias();
  }, [fetchSpotTheBias]);

  const handleComplete = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setBiasQuizComplete(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const imageUrl = useMemo(
    () =>
      `https://wlneuhivxmpiasjmmryi.supabase.co/storage/v1/object/public/Thesis/Modules/${currentQuestion?.Image_Code}.png`,
    [currentQuestion]
  );

  const [done, setDone] = useState(false);

  if (biasQuizComplete || done)
    return (
      <ClosingModal
        ending={
          "Look at that — your score’s low and your thinking’s leveling out. That’s what real awareness looks like. Stay curious, stay open, and keep the balance strong"
        }
        src={"/behind-the-buzz"}
        text={"5/5 Thumbnails done!"}
        score={score}
      />
    );

  if (questions.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );

  return (
    <BiasQuiz
      setCurrentQuestionIndex={setCurrentQuestionIndex}
      setDone={setDone}
      length={questions?.length}
      currentQuestionIndex={currentQuestionIndex}
      question={currentQuestion}
      imageUrl={imageUrl}
      headline={currentQuestion.headline}
      questionNumber={currentQuestionIndex + 1}
      onComplete={handleComplete}
    />
  );
};

// --------------------------------------------------
// RESPONSIVE ClosingModal
// --------------------------------------------------

const ClosingModal = (props) => {
  const navigate = useNavigate();

  return (
    <div className="p-8 sm:p-6 px-4">
      <div
        className="h-[90vh] flex items-center justify-center rounded-[24px] pt-8 px-4 sm:px-6"
        style={{ backgroundColor: "#F8F1E7" }}
      >
        <div className="max-w-2xl w-full mx-auto bg-[#F8F1E7] rounded-3xl shadow-sm text-center p-4 sm:p-6">
          {/* Header */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap sm:flex-nowrap">
            <CircleScore scoreDrop={props.score} />

            <div className="text-left mt-4 sm:mt-0">
              <h1 className="text-[#5F237B] font-bold text-[40px] sm:text-[54px] leading-[100%] mb-2 text-center sm:text-left">
                Module 4: Complete
              </h1>

              <p className="text-black text-[16px] sm:text-[18px] leading-[120%] text-center sm:text-left">
                5/5 Thumbnails spotted!
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="mt-10 mb-10 flex justify-center items-center">
            <img
              src={"/closingg.svg"}
              className="max-h-[35vh] w-auto max-w-full"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Text */}
          <div className="px-2 text-[14px] sm:text-[16px] leading-[140%]">
            Look at that — your score’s low and your thinking’s leveling out.
            That’s what real awareness looks like. Stay curious, stay open, and
            keep the balance strong.
          </div>

          {/* Button */}
          <Button
            size="lg"
            onClick={() => navigate(`/behind-the-buzz`)}
            className="mt-6 px-6 py-2 rounded-md bg-[#FF9348] text-white text-base w-full sm:w-auto"
          >
            Next Module <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpotTheBias;
