import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Star, AlarmClock, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import ModuleHeader from "@/components/ModuleHeader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { decreaseScore } from "@/store/topicsSlice";
import TooltipCarousel from "@/components/TooltipCarousel";
import CelebrationScreen from "./Closing";

type Screen = "intro" | "roleSelection" | "question" | "scenario" | "closing";
type Role = { title: string; subtitle: string };

const InTheirShoes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const score = useSelector((state: any) => state.topics.score);

  const [currentScreen, setCurrentScreen] = useState<Screen>("roleSelection");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [roleDetails, setRoleDetails] = useState<any>({});
  const [round, setRound] = useState(1); 
  const [usedRoles, setUsedRoles] = useState<string[]>([]);
  const [questionStep, setQuestionStep] = useState<1 | 2>(1);
  const [showIntroModal, setShowIntroModal] = useState<boolean>(true);
  const [tooltipMapping, setTooltipMapping] = useState<{ [key: string]: string | null }>({});
  const [check, setCheck] = useState(false);
  const [done, setDone] = useState(false);

  const roles: Role[] = [
    { title: "Team Captain", subtitle: "Captain's Judgement" },
    { title: "School Editor", subtitle: "Editor's Mind" },
    { title: "Parent", subtitle: "Dinner Debate" },
    { title: "Friend", subtitle: "Protest Pressure" },
    { title: "Family", subtitle: "Worried Grandmother" },
    { title: "Teacher", subtitle: "Viral Video" },
    { title: "Influencer", subtitle: "Influencer Dilemma" },
  ];

  const roleImageMap: { [key: string]: string } = {
    "Team Captain": "/Team captain.svg",
    "School Editor": "/Editor.svg",
    "Parent": "/Parent.svg",
    "Friend": "/Friends.svg",
    "Family": "/Grandma.svg",
    "Teacher": "/School teacher.svg",
    "Influencer": "/Influencer.svg",
  };

  const fetchRoleDetails = async (role: string) => {
    const { data, error } = await supabase.from("Roles").select("*").eq("Role", role);
    setRoleDetails(data?.[0] || {});
    if (error) console.error("Error fetching role details:", error);
  };

  useEffect(() => {
    if (currentScreen === "closing") insertScore();
  }, [currentScreen]);

  const insertScore = async () => {
    const email = JSON.parse(localStorage.getItem("email") || '""');
    await supabase.from("Users").update({ Score: score }).eq("Email", email);
  };

  const selectColor = (color: string) => {
    if (color === "yellow") return "#FFC700";
    if (color === "orange") return "#FF9348";
    if (color === "purple") return "#5F237B";
    return "#EDEDED";
  };

  const renderQuestion = () => {
    if (questionStep === 1) {
      return {
        tooltip1: roleDetails.Q1tooltip1,
        tooltip2: roleDetails.Q1tooltip2,
        questionText: roleDetails.Q1,
        answers: [
          { label: "A", text: roleDetails.Q1a, color: selectColor(roleDetails.Q1atype) },
          { label: "B", text: roleDetails.Q1b, color: selectColor(roleDetails.Q1btype) },
          { label: "C", text: roleDetails.Q1c, color: selectColor(roleDetails.Q1ctype) },
        ],
      };
    } else {
      return {
        tooltip1: roleDetails.Q2tooltip1,
        tooltip2: roleDetails.Q2tooltip2,
        questionText: roleDetails.Q2,
        answers: [
          { label: "A", text: roleDetails.Q2a, color: selectColor(roleDetails.Q2atype) },
          { label: "B", text: roleDetails.Q2b, color: selectColor(roleDetails.Q2btype) },
          { label: "C", text: roleDetails.Q2c, color: selectColor(roleDetails.Q2ctype) },
        ],
      };
    }
  };

const handleAnswerSelect = (selectedLabel: string, color: string) => {
  setSelectedAnswer(selectedLabel);
  setCheck(true);

  // Adjust score based on the selected color
  if (color === "#FFC700") dispatch(decreaseScore(2));
  if (color === "#FF9348") dispatch(decreaseScore(4));
  if (color === "#5F237B") dispatch(decreaseScore(6));

  // Set tooltips for the selected answer
  const qData = renderQuestion();
  const newTooltipMapping: { [key: string]: string | null } = {};
  if (color !== "#5F237B") {
    newTooltipMapping[selectedLabel] = qData.tooltip1;
    const purpleAnswer = qData.answers.find(a => a.color === "#5F237B");
    if (purpleAnswer) newTooltipMapping[purpleAnswer.label] = qData.tooltip2;
  }
  setTooltipMapping(newTooltipMapping);

  setTimeout(() => {
    // Reset states for the next question
    setSelectedAnswer(null);
    setTooltipMapping({});
    
    if (questionStep === 1) {
      setQuestionStep(2); // Proceed to the second question
    } else if (questionStep === 2) {
      setCurrentScreen("closing"); 
    }
  }, 3000);
};

  const handleRole = async (role: string) => {
    setSelectedRole(role);
    setUsedRoles(prev => [...prev, role]);
    await fetchRoleDetails(role);
    setCurrentScreen("scenario");
  };

  const q = renderQuestion();

  // --- Screens ---
  if (currentScreen === "roleSelection") {
    return (
      <div className="p-4">
        <main className=" bg-[#F8F1E7]">
          <OpeningModal showIntroModal={showIntroModal} moduleId={"M7"} setShowIntroModal={setShowIntroModal} src={"/opening17.png"} />
          <div className="max-w-7xl mx-auto">
            <ModuleHeader
              src={"/opening17.png"}
              setDone={setDone}
              polarizationScore={score}
              module={7}
              heading="In their shoes"
              description="Step into another role, and make their world make sense."
              time={120}
              left={1 - round}
            />
            <div className="text-center mt-8 mb-8">
              <h2 className="text-[1.5vw] font-medium text-[#130719]">Choose Your Role:</h2>
              <p className="text-[1vw] font-medium text-[#130719]">Each scenario puts you in a different position of power and perspective</p>
            </div>
            <div className="hidden sm:flex items-center justify-center bg-[#F9F4EC] px-12">
              <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl relative">
                <CarouselContent>
                  {roles.filter(role => !usedRoles.includes(role.title)).map((role, i) => (
                    <CarouselItem key={i} className="cursor-pointer basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5" onClick={() => handleRole(role.title)}>
                      <RoleCard role={role} roleImageMap={roleImageMap} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-white border border-gray-300 shadow-sm hover:scale-105 transition" />
                <CarouselNext className="bg-[#FF9348] border border-gray-300 shadow-sm hover:scale-105 transition" />
              </Carousel>
            </div>
            <div className="sm:hidden grid grid-cols-2 gap-4 overflow-y-auto max-h-[60vh] px-2">
              {roles.filter(role => !usedRoles.includes(role.title)).map((role, i) => (
                <div key={i} onClick={() => handleRole(role.title)}>
                  <RoleCard role={role} roleImageMap={roleImageMap} short />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentScreen === "scenario") {
    return (
      <div className="p-4">
        <main className="h-[90vh] bg-[#F8F1E7]">
          <div className="max-w-7xl mx-auto flex flex-col">
            <ModuleHeader
              src={"/opening17.png"}
              setDone={setDone}
              polarizationScore={score}
              module={7}
              heading="In their shoes"
              description="Step into another role, and make their world make sense."
              time={120}
              left={1 - round}
            />
            <div className="text-center">
              <h2 className="text-lg font-semibold text-[#201E1C]">Choose Your Role:</h2>
              <p className="text-lg text-[#201E1C]">Each scenario puts you in a different position of power and perspective</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between p-6 gap-4">
              <div className="sm:w-1/3 flex justify-center">
                <img src={roleImageMap[selectedRole] || "/character1.svg"} alt={selectedRole} className="rounded-md w-[80%]" />
              </div>
              <div className="sm:w-2/3 flex flex-col px-2 sm:px-8">
                <h2 className="text-[1.25vw] bg-white font-normal text-gray-900 mb-4 w-fit px-4 py-2 rounded-[40px]">Scenario {round}</h2>
                <p className="text-[1.25vw] text-gray-800 leading-relaxed mb-4 max-w-lg">{roleDetails.Scenario}</p>
                <button
                  onClick={() => setCurrentScreen("question")}
                  className="bg-[#FF9348] flex items-center justify-center w-[10vw] text-white font-medium px-6 py-2 gap-2 rounded-lg hover:opacity-90 transition"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentScreen === "question") {
    return (
      <div className="p-4">
        <main className="min-h-[90vh] bg-[#F8F1E7]">
          <div className="max-w-7xl mx-auto relative">
            <ModuleHeader
              src={"/opening17.png"}
              setDone={setDone}
              polarizationScore={score}
              module={7}
              heading="In their shoes"
              description="Step into another role, and make their world make sense."
              time={120}
              left={1 - round}
            />
            <div className="text-center mb-6">
              <h3 className="text-xl text-[#201E1C]">{`Scenario #${round}`}</h3>
            </div>

            <div className="flex flex-col justify-center items-center w-full">
              <div className="flex justify-center items-center gap-2 mb-4">
                <p
                  className="text-[72px] font-semibold"
                  style={{ color: questionStep === 1 ? "#FF9348" : "#5F237B" }}
                >
                  Q{questionStep}
                </p>
                <p className="leading-relaxed max-w-xs text-left">
                  <span>{questionStep === 1 ? "Approach" : "Depth"}</span>
                  <br />
                  {q.questionText}
                </p>
              </div>

              <div className="relative mb-2 w-full flex justify-center items-center">
                <img src="/module7.svg" alt="Teacher" width={144} height={144} className="rounded-md" />
                {check && (
                  <button
                    onClick={() => {
                      setCheck(false);
                      setSelectedAnswer(null);
                      setTooltipMapping({});
                      if (questionStep === 1) setQuestionStep(2);
                      else if (questionStep === 2) {
                        if (round < 3) {
                          setRound(round + 1);
                          setQuestionStep(1);
                          setRoleDetails({});
                          setSelectedRole("");
                          setCurrentScreen("roleSelection");
                        } else setCurrentScreen("closing");
                      }
                    }}
                    className="absolute top-1/2 right-0 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center bg-[#FF9348] text-white rounded-full shadow-lg transition-colors"
                  >
                    <ChevronRight />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full px-2 sm:px-36 mb-8">
                {q.answers.map((a) => {
                  const isColored = selectedAnswer !== null;
                  const bgColor = isColored ? a.color : "#EDE1D0";
                  const textColor = isColored ? "text-white" : "text-gray-800";
                  const tooltipText = selectedAnswer === a.label && a.color !== "#5F237B";
                  const isChecked = selectedAnswer === a.label && a.color === "#5F237B";

                  return (
                    <div key={a.label} className="relative">
                      <div
                        onClick={() => handleAnswerSelect(a.label, a.color)}
                        className="pt-2 pb-2 px-4 cursor-pointer transition-all border-gray-200 h-full rounded-3xl bg-[#EDE1D0]"
                      >
                        {!isChecked && !tooltipText && (
                          <div className="flex flex-col items-start gap-2">
                            <span className="flex items-center justify-center text-[clamp(14px,2vw,20px)] w-8 h-8 bg-white text-black rounded-2xl font-normal">{a.label}</span>
                            <p className="text-[clamp(12px,2vw,18px)] text-left leading-relaxed">{a.text}</p>
                          </div>
                        )}
                        {isChecked && (
                          <div className="flex items-center w-full h-full justify-center">
                            <img src="/try.svg" />
                          </div>
                        )}
                        {tooltipText && (
                          <div className="flex items-center w-full h-full justify-center">
                            <img src="/trynot.svg" />
                          </div>
                        )}
                      </div>

                      {tooltipText && (
                        <div className="absolute bottom-full left-0 mb-2 z-10">
                          <TooltipCarousel slides={[{ heading: "question?.Bias_Type", description: q?.tooltip1 }, { description: q?.tooltip2 }]} onClose={() => false} header={false} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentScreen === "closing") return <CelebrationScreen />;
};

export default InTheirShoes;

// RoleCard.tsx
function RoleCard({ role, disabled, roleImageMap, short }: any) {
  return (
    <div
      className={`bg-white ${short ? "h-[25vh]" : "h-[35vh]"} w-full gap-4 flex flex-col justify-center items-center border-[3px] rounded-xl px-4 py-2 text-center
                  ${disabled ? "opacity-40 border-gray-400" : "border-black"}`}
    >
      <h2 className="text-[1vw] font-medium text-[#130719]">{role.subtitle}</h2>
      <div className="flex justify-center">
        <img
          src={roleImageMap[role.title] || "/character1.svg"}
          alt={role.title}
          className={`rounded-md max-w-full h-auto object-contain ${short ? "w-[8vw]" : "w-[10vw]"}`}
        />
      </div>
      <p className="text-[1vw] font-medium text-[#130719]">Role: {role.title}</p>
    </div>
  );
}


// OpeningModal.tsx
const OpeningModal = (props: any) => {
  return (
    <Dialog open={props.showIntroModal} onOpenChange={props.setShowIntroModal}>
      <DialogContent className="max-w-[1000px] aspect-[1253/703] rounded-[12px] p-0 gap-0 bg-white">
        <div className="px-4 sm:px-32 py-8 sm:py-16">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center relative flex-shrink-0">
              <img src={props.src} alt="Module" className="w-16 h-16 object-contain" />
            </div>
            <div>
              <div className="text-[#FF9348] text-[18px] sm:text-[24px] font-semibold">Phase III</div>
              <h2 className="text-[18px] sm:text-[24px] font-bold text-black">
                {props.heading || "Module Intro"}
              </h2>
            </div>
          </div>
          <p className="text-[14px] sm:text-[16px] text-gray-700 leading-relaxed">
            {props.description || "Welcome to this module. Read the instructions carefully before starting."}
          </p>
          <div className="flex justify-end mt-8">
            <Button onClick={() => props.setShowIntroModal(false)} className="bg-[#FF9348] text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
              Start
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};