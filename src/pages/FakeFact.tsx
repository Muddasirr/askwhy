import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Bookmark, Check, ChevronRight, Heart, X, MessageCircle, Share2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { decreaseScore } from "@/store/topicsSlice";
import OpeningModal from "@/components/OpeningModal";
import ClosingModal from "@/components/ClosingModal";
import ModuleHeader from "@/components/ModuleHeader";
import { useState, useEffect } from "react";
import Tooltip from "@/components/tooltipp";

const FakeFact = () => {
  const dispatch = useDispatch();
  const topic = useSelector((state: RootState) => state.topics.topics);
  const uniqueTopics = Array.from(new Set(topic));
  const [tooltips, setToolTips] = useState([]);
  const score = useSelector((state: RootState) => state.topics.score);
  const topics = uniqueTopics.sort(() => Math.random() - 0.5).slice(0, 8);
  const [game, setGames] = useState<any>([]);

  function buildAllQuestions(topics) {
    const result = {
      question0: buildFromTopic(topics[0], "IG"),
      question1: buildFromTopic(topics[1], "IG"),
      question2: buildFromTopic(topics[2], "LAST"),
      question3: buildFromTopic(topics[3], "CAR")
    };
    return result;
  }

  function buildFromTopic(topic, type) {
    if (!topic) return null;
    const codes = Object.keys(topic).filter(k => k.startsWith("imagecode")).map(k => topic[k]);
    const ig = [], car = [], last = [];
    for (const code of codes) {
      const prefix = code.split("_")[0].toUpperCase();
      if (prefix === "IG") ig.push(code);
      else if (prefix === "CAR") car.push(code);
      else last.push(code);
    }
    const toUrl = (code: any) => {
      if (code.split("_")[0].toUpperCase() == "CAR") {
        return supabase.storage.from("Thesis").getPublicUrl(`CAR/${code.split(" ")[0]}.png`).data.publicUrl;
      }
      return supabase.storage.from("Thesis").getPublicUrl(`Modules/${code.split(" ")[0]}.png`).data.publicUrl;
    };
    let selectedSet;
    if (type === "IG") selectedSet = ig;
    if (type === "CAR") selectedSet = car;
    if (type === "LAST") selectedSet = last;
    return selectedSet
      .filter((code: any) => code)
      .map((code: any) => ({
        src: toUrl(code),
        correct: !code.toLowerCase().includes("(fake)"),
        heading: topic.heading,
        caption: topic.caption,
        reach: topic.reach,
        source: topic.source,
        tooltip: tooltips.find(p => p.ImageCode === code.split(" ")[0])?.Tooltip || ""
      }));
  }

  const fetchfact = async () => {
    const { data, error } = await supabase.from("module3").select("*");
    const filterByTopic = (data: any, topics: any) => data.filter((item: any) => topics.includes(Number(item.topic)));
    const tooltip = await supabase.from("module3tool").select("*");
    setToolTips(tooltip.data);
    setGames(filterByTopic(data, topics));
    if (error) console.error("Error fetching spotthebias:", error);
  };

  useEffect(() => {
    fetchfact();
  }, []);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const moduleId = searchParams.get("module");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [selectedImageTooltip, setSelectedImageTooltip] = useState<string>("");
  const [selectedIncorrectImage, setSelectedIncorrectImage] = useState<string>("");

  const { data: module } = useQuery({
    queryKey: ["module", moduleId],
    queryFn: async () => {
      if (!moduleId) return null;
      const { data, error } = await supabase.from("modules").select("*").eq("id", moduleId).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!moduleId
  });

  const totalQuestions = 1;
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState<number | null>(null);

  const handlePostClick = (postNumber: string, isCorrect: boolean, tooltip?: string, imageSrc?: string) => {
    if (showResult) return;
    setSelectedPost(postNumber);
    setShowResult(true);
    setIsCorrectAnswer(isCorrect);
    setSelectedImageTooltip(tooltip || "");
    setSelectedIncorrectImage(imageSrc || "");
    if (isCorrect) dispatch(decreaseScore(2.25));
  };

  const handleCarouselClick = (index: number, isCorrect: boolean, tooltip?: string, imageSrc?: string) => {
    if (showResult) return;
    setSelectedCarouselIndex(index);
    setShowResult(true);
    setIsCorrectAnswer(isCorrect);
    setSelectedImageTooltip(tooltip || "");
    setSelectedIncorrectImage(imageSrc || "");
    if (isCorrect) dispatch(decreaseScore(2.25));
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedPost(null);
    setSelectedCarouselIndex(null);
    setIsCorrectAnswer(null);
    setSelectedImageTooltip("");
    setSelectedIncorrectImage("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function pickFactAndFake(posts) {
    if (!posts) return null;
    const fact = posts.find(p => p.correct);
    const fake = posts.find(p => !p.correct);
    return [fact, fake];
  }

  const allQuestions = buildAllQuestions([game[0], game[1], game[2], game[3]]);
  const allQuestions1 = buildAllQuestions([game[3], game[2], game[0], game[1]]);
  allQuestions.question0 = pickFactAndFake(allQuestions.question0);
  allQuestions1.question0 = pickFactAndFake(allQuestions1.question0);

  const ending = (
    <div className="text-center text-base sm:text-lg md:text-xl">
      Nice! Your <span className="font-semibold text-[#D0193E]">polarization</span> just dropped — looks like you’re already making progress.
      Keep on asking why & keep on going: <span className="font-semibold text-[#5F237B]">lower the score, lower the polarization…</span> that’s how you win!
    </div>
  );

  const [showIntroModal, setShowIntroModal] = useState<boolean>(true);
  const [done, setDone] = useState(false);

  if (currentQuestionIndex >= totalQuestions || done) {
    return <ClosingModal ending={ending} src={"/spotthebias"} module={3} text={"✓ All Facts served!"} score={score} />;
  }

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-4 sm:py-6 md:py-8 bg-[#F8F1E7] min-h-screen flex flex-col">
      <OpeningModal
        showIntroModal={showIntroModal}
        moduleId={"M3"}
        setShowIntroModal={setShowIntroModal}
        src={"/opening13.png"}
        phase={"II"}
        module={"Module 3: Fake or Fact?"}
        description={<div className="text-sm sm:text-base md:text-lg">"In this level, you’ll become a fake content detective 🕵️‍♀️. You’ll explore different post formats — from side-by-side comparisons to posts, reels, and carousels — and figure out what’s real and what’s not. Look closely at sources, images, and engagement counts to spot the fakes and earn your points!"</div>}
        time={"10:00"}
        level={"Intermediate"}
        calculated={""}
      />
      <ModuleHeader src={"/opening13.png"} setDone={setDone} polarizationScore={score} module={3} heading="Fake or fact" description="Is everything not real?!" time={600} left={1 - currentQuestionIndex} total={1} />
      {currentQuestionIndex < totalQuestions && (
        <h2 className="text-lg sm:text-xl md:text-2xl text-center my-4 sm:my-6 md:my-8 font-normal">Click to identify which one is fake</h2>
      )}

      <div className="flex-1 flex flex-col sm:flex-row flex-wrap items-center justify-center relative gap-6 sm:gap-12">
        {showResult && (
          <div className="absolute inset-0 flex items-center justify-center z-10 p-2">
            <div className="text-center">
              {isCorrectAnswer ? (
                <div className="flex flex-col items-center gap-4">
                  <img src="/try.svg" alt="Good Job!" className="w-40 sm:w-56 md:w-64 h-auto animate-fade-in" />
                  <div className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2">
                    <Button onClick={handleNextQuestion} className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white rounded-full p-3 sm:p-4 animate-fade-in">
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                  {selectedIncorrectImage && (
                    <div className="animate-fade-in w-full sm:w-auto">
                      <img src={selectedIncorrectImage} alt="Selected incorrect image" className="w-full sm:w-auto max-h-[50vh] md:max-h-[70vh] object-contain rounded-lg border-2 border-red-300" />
                    </div>
                  )}
                  {selectedImageTooltip && <Tooltip description={selectedImageTooltip} />}
                  <img src="/trynot.svg" alt="Try Again" className="w-40 sm:w-56 md:w-64 h-auto animate-fade-in" />
                  <div className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2">
                    <Button onClick={handleNextQuestion} className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white rounded-full p-3 sm:p-4 animate-fade-in">
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Example: question0 rendering */}
        {currentQuestionIndex === 0 && allQuestions.question0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 w-full">
            <img src={allQuestions.question0[0].src} alt="Left Post" className="w-full sm:w-5/12 h-auto object-contain rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg" onClick={() => handlePostClick(`question0-post1`, allQuestions.question0[0].correct, allQuestions.question0[0].tooltip, allQuestions.question0[0].src)} />
            <span className="font-semibold text-lg sm:text-2xl text-center">VS</span>
            <img src={allQuestions.question0[1].src} alt="Right Post" className="w-full sm:w-5/12 h-auto object-contain rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg" onClick={() => handlePostClick(`question0-post2`, allQuestions.question0[1].correct, allQuestions.question0[1].tooltip, allQuestions.question0[1].src)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeFact;
