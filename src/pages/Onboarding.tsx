"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SplitText from "@/components/animations/SplitText";
export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const sequence = [0, 1, 2, 3];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= sequence.length - 1) {
        setStep(sequence[i]);
        clearInterval(interval);
      } else {
        setStep(sequence[i]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <>
      {/* STEP 0 */}
      {step === 0 && (
        <div className="flex justify-center items-center bg-[#F8F1E7] h-[90vh]">
          <SplitText
            text="hello, you!"
            className="text-[84px] font-bold text-black text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="flex">
          <div className="flex justify-center items-center bg-[#F8F1E7] h-[90vh] w-1/2">
            <h1 className="text-[84px] font-bold text-black">Is your world</h1>
          </div>
          <div className="flex justify-center items-center bg-white h-[90vh] w-1/2"></div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="flex">
          <div className="flex justify-center items-center bg-[#F8F1E7] h-[90vh] w-1/2">
            <h1 className="text-[84px] font-bold text-black">Is your world</h1>
          </div>
          <div className="flex justify-center items-center bg-black h-[90vh] w-1/2">
            <h1 className="text-[84px] text-[#F8F1E7] font-bold">
              divided in two
            </h1>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="relative flex items-center justify-start h-[90vh] overflow-hidden">
          {/* Background stripes */}
          <div className="absolute inset-0 flex">
            <div className="w-1/9 bg-[#FEFCFA]" />
            <div className="w-1/9 bg-[#FCF9F5]" />
            <div className="w-1/9 bg-[#FBF7F1]" />
            <div className="w-1/9 bg-[#F9F4EC]" />
            <div className="w-1/9 bg-[#F8F1E7]" />
            <div className="w-1/9 bg-[#C6C1B9]" />
            <div className="w-1/9 bg-[#95918B]" />
            <div className="w-1/9 bg-[#63605C]" />
            <div className="w-1/9 bg-[#32302E]" />
          </div>

          {/* Text content */}
          <div className="relative z-10 pl-16 w-[50%]">
            <h1 className="text-[84px] font-bold text-black leading-tight mb-6">
              What if we start navigating it through?
            </h1>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#FF7A00] text-white text-lg px-6 py-2 rounded-md hover:bg-[#e86a00] transition"
            >
              Click here to start →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
