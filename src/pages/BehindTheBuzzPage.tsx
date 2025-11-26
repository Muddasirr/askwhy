import BehindTheBuzz from "@/components/BehindTheBuzz";
import ConnectDotsQuiz from "@/components/ConnectDotsQuiz";
import { supabase } from "@/integrations/supabase/client";
import { RootState } from "@/store";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const BehindTheBuzzPage = () => {
<<<<<<< HEAD
  const [rounds, setRounds] = useState<any[]>([]);
  const topic = useSelector((state: RootState) => state.topics.topics);

  // Pick 5 random unique topics from Redux store
  const randomTopics = useMemo(() => {
    const uniqueTopics = Array.from(new Set(topic)); // Remove duplicates
    return uniqueTopics.sort(() => 0.5 - Math.random()).slice(0, 5); // Shuffle & pick 5
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
=======
  const [behindqs, setBehindQs] = useState<any>(null);
  const [keywords, setKeywords] = useState<any>(null);
  const [answer, setAnswer] = useState<any>(null);
  const topic = useSelector((state:RootState)=>state.topics.topics)
  const [rounds, setRounds] = useState<any[]>([]);
  const randomTopic:number = topic[Math.floor(Math.random() * topic.length)];

  
  const randomTopics = useMemo(() => {
    // Remove duplicates first
    const uniqueTopics = Array.from(new Set(topic));
  
    // Shuffle and pick 5
    return uniqueTopics
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  }, [topic]);
  console.log(randomTopics)
  
  // const fetchbehind = async () => {
  //   const { data, error } = await supabase.from("behind").select("*");
  //   console.log(data)
  //   if (error) return console.error(error);

  //   setBehindQs(data[randomTopic]);

  //   const { data: kwData, error: kwError } = await supabase.from("keywords").select("*");
  //   if (kwError) return console.error(kwError);

  //   setKeywords(kwData);
  // };
  useEffect(() => {
    const loadData = async () => {
      const { data: behindData } = await supabase.from("behind").select("*");
      const { data: keywordData } = await supabase.from("keywords").select("*");
  
      console.log(behindData)
      if (!behindData || !keywordData) return;
  
      const rounds = randomTopics.map((topicIndex: number) => {
        const behind = behindData[topicIndex];
  
        const correctItem = keywordData.find(
          (item: any) => item.Word === behind?.Correct_Answer
        );
  
        const others = keywordData.filter(
          (item: any) => item.Word !== behind?.Correct_Answer
        );
  
        const randomTwo = [...others]
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
  
        const finalOptions = [correctItem, ...randomTwo].sort(
          () => 0.5 - Math.random()
        );
  
        return {
          behind,
          answers: finalOptions,
        };
      });
      console.log(rounds)
  
      setRounds(rounds); // <--- store 5 rounds
    };
  
    loadData();
  }, [randomTopics]);
  
  // Generate answer options ONLY after both behindqs and keywords are available
  // useEffect(() => {
  //   if (!behindqs || !keywords) return;

  //   const correctItem = keywords.find(
  //     (item: any) => item.Word === behindqs.Correct_Answer
  //   );
  //   if (!correctItem) return;

  //   const others = keywords.filter(
  //     (item: any) => item.Word !== behindqs.Correct_Answer
  //   );

  //   const randomTwo = [...others]
  //     .sort(() => 0.5 - Math.random())
  //     .slice(0, 2);

  //   const finalOptions = [correctItem, ...randomTwo].sort(
  //     () => 0.5 - Math.random()
  //   );

  //   setAnswer(finalOptions);
  // }, [behindqs, keywords]); // <-- runs only when both values arrive

  // useEffect(() => {
  //   fetchbehind();
  // }, []);

  if (rounds.length === 0) return <p>Loading...</p>;

return <ConnectDotsQuiz rounds={rounds} />;

>>>>>>> upstream/main
};

export default BehindTheBuzzPage;
