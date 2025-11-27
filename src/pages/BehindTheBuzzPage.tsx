import BehindTheBuzz from "@/components/BehindTheBuzz";
import ConnectDotsQuiz from "@/components/ConnectDotsQuiz";
import { supabase } from "@/integrations/supabase/client";
import { RootState } from "@/store";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const BehindTheBuzzPage = () => {
  const [rounds, setRounds] = useState<any[]>([]);
  const topic = useSelector((state: RootState) => state.topics.topics);

  // Pick 5 random unique topics from Redux store
  const randomTopics = useMemo(() => {
    const uniqueTopics = Array.from(new Set(topic)); // Remove duplicates
    return uniqueTopics.sort(() => 0.5 - Math.random()).slice(0, 1); // Shuffle & pick 5
  }, [topic]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: behindData } = await supabase.from("behind").select("*");
        const { data: keywordData } = await supabase.from("keywords").select("*");

        if (!behindData || !keywordData) return;

        const roundsData = randomTopics.map((topicIndex: number) => {
          const behind = behindData[topicIndex];
          if (!behind) return null;

          const correctItem = keywordData.find((item: any) => item.Word === behind.Correct_Answer);
          const others = keywordData.filter((item: any) => item.Word !== behind.Correct_Answer);
          const randomTwo = others.sort(() => 0.5 - Math.random()).slice(0, 2);

          const finalOptions = [correctItem, ...randomTwo].sort(() => 0.5 - Math.random());
          return { behind, answers: finalOptions };
        });

        setRounds(roundsData.filter(Boolean));
      } catch (error) {
        console.error("Failed to load BehindTheBuzz data:", error);
      }
    };

    loadData();
  }, [randomTopics]);

  if (rounds.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-full overflow-x-auto">
      <ConnectDotsQuiz
        rounds={rounds}
        className="text-xs sm:text-sm md:text-base lg:text-lg"
      />
    </div>
  );
};

export default BehindTheBuzzPage;
