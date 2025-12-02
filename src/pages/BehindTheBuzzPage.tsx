import BehindTheBuzz from "@/components/BehindTheBuzz";
import ConnectDotsQuiz from "@/components/ConnectDotsQuiz";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BehindTheBuzzPage = () => {
  const [rounds, setRounds] = useState<any[]>([]);
  const topic = useSelector((state:RootState)=>state.topics.topics)

  
  useEffect(() => {
    // Build a single static round using the provided public image and options
    const staticRound = {
      behind: {
        ImagePublicUrl: "YTT_6b.png",
        Image: "rr",
        Reach: "1M Views", // placeholder; adjust if you have a specific value
        Correct_Answer: "Sensationalize", // middle option is correct
      },
      answers: [
        {
          id: "A",
          Word: "Sensationalize",
          Description:
            "People often make up news to sound way more dramatic or shocking than it really is, just to get clicks, reactions, or go viral — even if the facts get stretched in the process.",
        },
        {
          id: "B",
          Word: "Clickbait",
          Description:
            "People (or pages) often post shocking headlines because controversy drives clicks, comments, and followers",
        },
        {
          id: "C",
          Word: "Validation",
          Description:
            "People often post or share things to get approval from others, even if it’s biased or fake, just to feel seen, smart, or part of the crowd..",
        },
      ],
    };

    setRounds([staticRound]);
  }, [topic]);
  
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
