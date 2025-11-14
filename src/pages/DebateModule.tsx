import { useState, useEffect } from "react";
import { Timer, Heart, MessageCircle, Repeat2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ModuleHeader from "@/components/ModuleHeader";
import OpeningModal from "@/components/OpeningModal";

const DebateModule = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [imageUrl, setImageUrl] = useState<string>("");
  const [debate,setDebate] = useState<any>({});

  useEffect(() => {

    const fetchImage = async (code) => {
      const { data } = supabase.storage
        .from('Thesis')
        .getPublicUrl(`Modules/${code}.png`);
      
      if (data?.publicUrl) {
        setImageUrl(data.publicUrl);
      }
    };
    
    fetchSpotTheBias()
  }, []);

  const fetchSpotTheBias = async () => {

      const { data, error } = await supabase.from("debate").select("*");
console.log("let me check",data)
const { data:link } = supabase.storage
        .from('Thesis')
        .getPublicUrl(`Modules/${data[0].Image}.png`);
setDebate(data[0])
setImageUrl(link.publicUrl)

      if (error) {
        console.error("Error fetching spotthebias:", error);
        return;
      }
  
    }


  

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  console.log(debate)
const[showIntroModal,setShowIntroModal] = useState(true);
  return (
    <div className="p-8">
    <main className="h-[90vh] bg-[#F8F1E7] p-2">
    <OpeningModal
showIntroModal={showIntroModal}
moduleId={"M6"}
setShowIntroModal={setShowIntroModal}
/>
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <ModuleHeader/>

    {/* Main Content - Two Column Layout */}
    <div className="flex justify-center items-stretch gap-10">
       {/* Right Column - Scenario Card */}
  <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 max-w-[450px] flex flex-col justify-between">
    <div>
      <p className="text-xs font-medium text-gray-500 mb-2">Scenario 1</p>
      <h2 className="text-[16px] font-semibold text-gray-900 mb-3 leading-snug">
        {debate.Heading}
      </h2>
      
      <p className="text-gray-800 mb-3 text-sm leading-relaxed">
    {debate.Scenario}
      </p>
      <div className="rounded-md p-3 mb-4">
        <p className="text-xs text-gray-500 mb-1">🧠 The Debate:</p>
        <p className="text-gray-900 font-medium text-sm leading-snug">
{
  debate.Debate_Question
}        </p>
      </div>
    </div>
    <div>
      <p className="text-gray-900 font-medium text-sm mb-3">🔥 Ready to take a side?</p>
      <button
        className="w-full py-2.5 rounded-md text-white font-medium text-base bg-[#FF9348] hover:bg-[#7c4ee8] transition-colors"
        onClick={() => navigate('/debate/switch')}
      >
        Start Now
      </button>
    </div>
  </div>
  {/* Left Column - Image */}
  <div className="flex justify-end items-center rounded-lg bg-transparent">
    <img
      src={imageUrl}
      alt="AI is an insult to life itself - Miyazaki's predictions come true"
      className="h-full max-h-[60vh] w-auto object-contain"
    />
    {imageUrl}
  </div>

 
</div>



  </div>
</main>
</div>

  );
};

export default DebateModule;
