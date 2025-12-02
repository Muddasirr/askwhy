import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext } from "@/components/ui/carousel";
import ModuleHeader from "@/components/ModuleHeader";
import { supabase } from "@/integrations/supabase/client";
import { useDispatch, useSelector } from "react-redux";
import { decreaseScore } from "@/store/topicsSlice";
import TooltipCarousel from "@/components/TooltipCarousel";
import CelebrationScreen from "./Closing";
import Celebration from "@/components/Celebration";
import OpeningModal from "@/components/OpeningModal";
// Removed unused imports (BookOpen, Clock, Star, AlarmClock, Card, Progress, Button)
type Screen = "intro" | "roleSelection" | "question" | "scenario" | "celebration" | "closing";
type Role = {
  title: string;
  subtitle: string;
};

const InTheirShoes = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const score = useSelector((state: any) => state.topics.score);

    const [currentScreen, setCurrentScreen] = useState<Screen>("roleSelection");
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [roleDetails, setRoleDetails] = useState<any>({});
    const [round, setRound] = useState(1);
    const [usedRoles, setUsedRoles] = useState<string[]>([]);
    const [questionStep, setQuestionStep] = useState<1 | 2>(1);
    const [showIntroModal, setShowIntroModal] = useState<boolean>(true);
    const [advanceReady, setAdvanceReady] = useState(false);
    // Added back done state so ModuleHeader timer can signal completion without compile error
    const [done, setDone] = useState(false);

    const fetchRoleDetails = async (role: string) => {
        const { data, error } = await supabase.from("Roles").select("*").eq("Role", role);
        if (error) {
            console.error("Error fetching role details:", error);
            return;
        }
        if (data && data.length) setRoleDetails(data[0]);
    };

  const roles: Role[] = [
      { title: "Team Captain", subtitle: "Captain's Judgement" },
      { title: "School Editor", subtitle: "Editor's Mind" },
      { title: "Parent", subtitle: "Dinner Debate" },
      { title: "Friend", subtitle: "Protest Pressure" },
      { title: "Family", subtitle: "Worried Grandmother" },
      { title: "Teacher", subtitle: "Viral Video" },
      { title: "Influencer", subtitle: "Influencer Dilemma" },
  ];

    const [check, setCheck] = useState(false);

    const updateUserScore = async () => {
        try {
            const emailRaw = localStorage.getItem("email");
            if (!emailRaw) return;
            const email = JSON.parse(emailRaw);
            await supabase.from("Users").update({ Score: score }).eq("Email", email);
        } catch (e) {
            console.warn("Score update failed", e);
        }
    };
    useEffect(() => {
        if (currentScreen === "closing") updateUserScore();
    }, [currentScreen]);

  const handleAnswerSelect = (selectedLabel: string, color: string) => {
    if (selectedAnswer) return; // prevent multi-click
    setSelectedAnswer(selectedLabel);
    setCheck(true);
    if (color === "#FFC700") dispatch(decreaseScore(2));
    if (color === "#FF9348") dispatch(decreaseScore(4));
    if (color === "#5F237B") dispatch(decreaseScore(6));
    // Prepare to allow advancing
    setAdvanceReady(true);
  };


    const advanceFlow = () => {
        setCheck(false);
        setSelectedAnswer(null);
        setAdvanceReady(false);
        if (questionStep === 1) {
            setQuestionStep(2);
        } else if (questionStep === 2) {
            setCurrentScreen("celebration");
        }
    };

    const handleRole = async (role: string) => {
        setSelectedRole(role);
        setUsedRoles((prev) => [...prev, role]);
        await fetchRoleDetails(role);
        setCurrentScreen("scenario");
        setQuestionStep(1);
        setSelectedAnswer(null);
        setAdvanceReady(false);
    };


  const selectColor = (color: string) => {
      if (color === "yellow") return "#FFC700";
      if (color === "orange") return "#FF9348";
      if (color === "purple") return "#5F237B";
      return "#EDEDED"; // fallback (optional)
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
        }
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
    };

    const q = renderQuestion();

  // ⭐ NEW: Role image mapping
  const roleImageMap: { [key: string]: string } = {
    "Team Captain": "/Team captain.svg",
    "School Editor": "/Editor.svg", 
    "Parent": "/Parent.svg",
    "Friend": "/Friends.svg",
    "Family": "/Grandma.svg",
    "Teacher": "/School teacher.svg",
    "Influencer": "/Influencer.svg",
  };

  
    if (currentScreen === "roleSelection") {
      return (
          <div className="p-12">
              <main className="h-[90vh] bg-[#F8F1E7] rounded-[24px] shadow-[0px_0px_25px_0px_#0000001A_inset] ">
                  <OpeningModal
                      showIntroModal={showIntroModal}
                      moduleId="M7"
                      setShowIntroModal={setShowIntroModal}
                      src="/opening17.png"
                      phase="III"
                      module="Module 7: In Their Shoes"
                      description="Time to see the world from someone else’s point of view! Swipe the cards to get your role, then use your best mix of facts and emotions to explain or defend the scenario like it’s your own. The stronger (and more empathetic) your case, the more your polarization score drops. Ready to play your way into someone else’s perspective?"
                      time="2:00"
                      level="Advanced"
                      calculated=""
                      buttonAlign="left"
                  />
                  <div className="max-w-7xl mx-auto">
                      {/* Header */}
                      <ModuleHeader src={"/opening17.png"} headingColor="#FF803E"  setDone={setDone} polarizationScore={score} module={7} heading="In their shoes" description="Step into another role, and make their world make sense." time={120} started={!showIntroModal} left={1}  />

                      {/* Role Selection Heading */}
                      <div className="text-center mt-8 mb-16">
                          <h2 className="text-[1.5vw] font-medium text-[#130719] ">Choose Your Role:</h2>
                          <p className="text-[1.5vw] font-medium text-[#130719]">
                              Each scenario puts you in a different position of power and perspective
                          </p>
                      </div>

                      {/* Role Cards - Organic Layout */}
                      <div className=" flex items-center justify-center bg-[#F9F4EC] px-12">
                          <Carousel
                              opts={{
                                  align: "start",
                                  loop: true,
                              }}
                              className="w-full max-w-6xl relative"
                          >
                              <CarouselContent>
                              {roles
  .filter(role => !usedRoles.includes(role.title))  // remove used roles
  .map((role, i) => (
    <CarouselItem
      key={i}
      className="cursor-pointer basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
      onClick={() => handleRole(role.title)}
    >
      <RoleCard role={role} roleImageMap={roleImageMap} />
    </CarouselItem>
))}

                              </CarouselContent>

                              <CarouselNext className="bg-[#FF9348] border border-gray-300 shadow-sm hover:scale-105 transition right-[-70px] md:right-[-78px]" />
                          </Carousel>
                      </div>
                  </div>
              </main>
          </div>
      );
  }
    if (currentScreen === "scenario") {
        return (
            <div className="p-12">
                <main className="rounded-[24px] shadow-[0px_0px_25px_0px_#0000001A_inset] h-[90vh] bg-[#F8F1E7]">
                    <div className="max-w-7xl mx-auto flex flex-col">
                        {/* Header */}
                        <ModuleHeader src={"/opening17.png"} setDone={setDone} polarizationScore={score} headingColor="#FF803E" module={7} heading="In their shoes" description="Step into another role, and make their world make sense." time={120} started={!showIntroModal} left={1} />
                        {/* Scenario heading */}
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-[#201E1C]">Choose Your Role:</h2>
                            <p className="text-lg text-[#201E1C]">Each scenario puts you in a different position of power and perspective</p>
                        </div>
                        {/* Scenario section */}
                        <div className="flex justify-between p-10">
                            {/* Left image */}
                            <div className="w-1/3 flex justify-center">
                                <img src={roleImageMap[selectedRole] || "/character1.svg"} alt={selectedRole} className="rounded-md w-[80%] h-full" />
                            </div>
                            {/* Scenario text */}
                            <div className="w-2/3 flex flex-col px-8">
                                <h2 className="text-[1.25vw] bg-white font-normal text-gray-900 mb-8 w-fit px-[16px] py-[4px] rounded-[40px]">Scenario {round}</h2>
                                <p className="text-[1.25vw] leading-relaxed mb-8 max-w-lg" style={{ color: questionStep === 1 ? "#FF9348" : "#5F237B" }}>Q{questionStep}</p>
                                <p className="leading-relaxed"><span>{questionStep === 1 ? "Approach" : "Depth"}</span><br />{q.questionText}</p>
                            </div>
                            {/* Right image with advance button */}
                            <div className="relative mb-2 w-full flex justify-center items-center">
                                <img src="/module7.svg" alt="Teacher" width={144} height={144} className="rounded-md" />
                                {advanceReady && (
                                    <button onClick={advanceFlow} className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center bg-[#FF9348] text-white rounded-full shadow-lg transition-colors">
                                        <ChevronRight />
                                    </button>
                                )}
                            </div>
                        </div>
                        {/* Answers */}
                        <div className="grid grid-cols-1 px-36 sm:grid-cols-3 gap-8 w-full mb-8">
                            {q.answers.map((a: any) => {
                                const showTooltip = selectedAnswer === a.label && a.color !== "#5F237B";
                                const showPurpleState = selectedAnswer === a.label && a.color === "#5F237B";
                                return (
                                    <div key={a.label} className="relative">
                                        <div onClick={() => handleAnswerSelect(a.label, a.color)} className="pt-2 pb-2 px-4 cursor-pointer transition-all h-[24vh] rounded-tl-3xl rounded-tr-3xl rounded-br-3xl" style={{ backgroundColor: "#EDE1D0" }}>
                                            {!showTooltip && !showPurpleState && (
                                                <div className="flex flex-col items-start gap-3">
                                                    <span className="flex items-center justify-center text-[1.25vw] w-8 h-8 bg-white text-black rounded-2xl font-normal">{a.label}</span>
                                                    <p className="text-[16px] text-left leading-relaxed #130719">{a.text}</p>
                                                </div>
                                            )}
                                            {showPurpleState && (
                                                <div className="flex items-center w-full h-full justify-center">
                                                    <img src="/try.svg" />
                                                </div>
                                            )}
                                            {showTooltip && (
                                                                                    <div className="flex items-center w-full h-full justify-center relative">
                                                                                        <div className="absolute -inset-3 rounded-3xl bg-black/5" />
                                                                                        <img src="/trynot.svg" className="relative" />
                                                                                    </div>
                                            )}
                                        </div>
                                        {showTooltip && (
                                            <div className="absolute bottom-full left-0 mb-2 z-10">
                                                <TooltipCarousel slides={[{ heading: "Bias Type", description: q?.tooltip1 }, { description: q?.tooltip2 }]} onClose={() => false} header={false} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
    if (currentScreen === "celebration") {
        return <Celebration onFinish={() => setCurrentScreen("closing")} durationMs={4000} />;
    }
    if (currentScreen === "closing") {
        return <CelebrationScreen />;
    }
    return null;
};

export default InTheirShoes;

function RoleCard({ role, disabled, roleImageMap }: any) {
    return (
        <div
            className={`bg-white h-[40vh] w-full grid grid-rows-[auto,1fr,auto] justify-items-center items-stretch gap-4 border-[6px] rounded-xl px-4 py-4 text-center ${disabled ? "opacity-40 border-gray-400" : "border-black"}`}
        >
            <h2 className="text-[1vw] font-medium text-[#130719] leading-tight">{role.subtitle}</h2>
            <div className="w-full flex items-center justify-center">
                <img
                    src={roleImageMap[role.title] || "/character1.svg"}
                    alt={role.title}
                    className="rounded-md w-[10vw]"
                />
            </div>
            <div className="h-[2.5rem] flex items-end">
                            <p className="text-[1vw] font-medium text-[#130719]">Role: {role.title}</p>
            </div>
        </div>
    );
}
