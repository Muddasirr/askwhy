import { useEffect, useState } from "react";
import DebateModule from "./DebateModule";
import DebateSwitch from "./DebateSwitch";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ModuleHeader from "@/components/ModuleHeader";
import ClosingModal from "@/components/ClosingModal";


const Debate = () => {
    const score = useSelector((state:RootState)=>state.topics.score)
    // Static single debate content (no Supabase)
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageUrl = "/newDB.png";
    const debate = {
      Heading: "“AI is an insult to life itself.”",
      Scenario:
      "Hayao Miyazaki — the legendary Japanese filmmaker once called AI “an insult to life itself.” During a 2016 documentary, after seeing an AI-generated animation that, to him, lacked humanity and soul. Nearly a decade later, AI-generated “Ghibli-style” art has gone viral — reviving the same question he raised back then.",
      Debate_Question:
      "Was Miyazaki right to call AI an insult to life — or is it actually expanding what life can create?",
    };
    const [show, setShow] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    // No Supabase; single-topic flow
    const goToNextTopic = () => {
      // With a single static debate, next means complete
      setIsCompleted(true);
    };

    {/* <ModuleHeader currentQuestionIndex={props.round} polarizationScore={score} /> */}
    
    {/* <ModuleHeader setDone={setDone} module={2} src={"/opening12.png"} heading={"Pick & Flick"} description={"Is everything not real?!"} time={120}       savesCount={savesCount} likesCount={likesCount} MAX_LIKES={MAX_LIKES} MAX_SAVES={MAX_SAVES} polarizationScore={score} />
    
   
*/}


{/* <ClosingModal  ending={<div><span className="text-[#5F237B]">Keep going,</span> We’re almost there! </div> }src={"/debate/final"} module={6} text={"4/4 Debates switch "}  score={score}/> */}


    const[done,setDone] = useState(false)
    
    return isCompleted ? (
      <ClosingModal
        ending={
          <div>
            <span className="text-[#5F237B]">Keep going,</span> We’re almost there!
          </div>
        }
        src={"/debate/final"}
        module={6}
        text={"1/1 Debates switch"}
        score={score}
      />
    ) : (
      <div className="p-12">
        <div className="overflow-auto pb-6 h-[90vh] bg-[#F8F1E7] rounded-[24px] shadow-[0px_0px_25px_0px_#0000001A_inset]">
          <div className="py-6 px-16">
            <ModuleHeader
              setDone={setDone}
              module={6}
              src={"/newDB.png"}
              heading={"Debate Switch"}
              headingColor="#FF9348"
              description={"Trace the spark that sets your feed on fire!"}
              time={90}
              started={!show}
              left={1}
              polarizationScore={score}
            />
          </div>
    
          {show ? (
            <DebateModule
              currentIndex={currentIndex}
              setShow={setShow}
              debate={debate}
              imageUrl={imageUrl}
            />
          ) : (
            <DebateSwitch
              round={currentIndex}
              debate={debate}
              goNext={goToNextTopic}
              isCompleted={isCompleted}
              setIsCompleted={setIsCompleted}
            />
          )}
        </div>
      </div>
    );
    
  
};

export default Debate;