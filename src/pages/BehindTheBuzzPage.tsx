import BehindTheBuzz from "@/components/BehindTheBuzz";
import ConnectDotsQuiz from "@/components/ConnectDotsQuiz";
import { supabase } from "@/integrations/supabase/client";
import { RootState } from "@/store";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const BehindTheBuzzPage = () => {
  const [behindqs, setBehindQs] = useState<any>(null);
  const [keywords, setKeywords] = useState<any>(null);
  const [answer, setAnswer] = useState<any>(null);
  const topic = useSelector((state:RootState)=>state.topics.topics)
  const [rounds, setRounds] = useState<any[]>([]);
  const randomTopic:number = topic[Math.floor(Math.random() * topic.length)];

  const randomTopics = useMemo(() => {
    return [...topic]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5); // PICK 5 ROUNDS
  }, [topic]);
  
  const fetchbehind = async () => {
    const { data, error } = await supabase.from("behind").select("*");
    console.log(data)
    if (error) return console.error(error);

    setBehindQs(data[randomTopic]);

    const { data: kwData, error: kwError } = await supabase.from("keywords").select("*");
    if (kwError) return console.error(kwError);

    setKeywords(kwData);
  };
  useEffect(() => {
    const loadData = async () => {
      const { data: behindData } = await supabase.from("behind").select("*");
      const { data: keywordData } = await supabase.from("keywords").select("*");
  
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

};

export default BehindTheBuzzPage;
