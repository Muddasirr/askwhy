import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SplitText from "@/components/animations/SplitText";
import { ChevronRight } from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  // Auto-step change
  useEffect(() => {
    const timeline = [0, 1, 2];
    let i = 0;

    const interval = setInterval(() => {
      i++;
      if (i >= timeline.length - 1) {
        setStep(timeline[i]);
        clearInterval(interval);
      } else {
        setStep(timeline[i]);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const fadeSlide = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  };

  return (
    <div className="h-[100vh] overflow-hidden relative">

      {/* Animated step wrapper */}
      <AnimatePresence mode="wait">

        {/* STEP 0 */}
        {step === 0 && (
          <motion.div
            key="step0"
            {...fadeSlide}
            className="h-[100vh] flex justify-center items-center bg-[#F8F1E7]"
          >
            <SplitText
              text="hello, you!"
              className="text-[42px] md:text-[64px] lg:text-[84px] font-bold text-black text-center"
              delay={200}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
          </motion.div>
        )}

        {/* =====================================
             ✅ STEP 1 — FIXED ANIMATION
        ===================================== */}
        {step === 1 && (
          <motion.div
            key="step1"
            {...fadeSlide}
            className="h-[100vh] flex flex-col md:flex-row overflow-hidden"
          >
            {/* Left (Top → Down) */}
            <motion.div
              className="h-[50vh] md:h-[100vh] flex justify-center items-center bg-[#F8F1E7] w-full md:w-1/2"
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.h1
                className="text-[40px] md:text-[64px] lg:text-[70px] font-bold text-black px-6 md:px-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                Is your world
              </motion.h1>
            </motion.div>

            {/* Right (Bottom → Up) */}
            <motion.div
              className="h-[50vh] md:h-[100vh] flex justify-center items-center bg-black w-full md:w-1/2"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.h1
                className="text-[40px] md:text-[64px] lg:text-[70px] text-[#F8F1E7] font-bold px-6 md:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                Divided in two
              </motion.h1>
            </motion.div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div
            key="step2"
            {...fadeSlide}
            className="h-[100vh] relative flex flex-col md:flex-row items-center justify-start overflow-hidden bg-white"
          >
            {/* Animated stripes */}
            <div className="absolute inset-0 flex flex-col md:flex-row">
              {[
                "#FEFCFA", "#FCF9F5", "#FBF7F1",
                "#F9F4EC", "#F8F1E7", "#C6C1B9",
                "#95918B", "#63605C", "#32302E",
              ].map((color, index) => (
                <motion.div
                  key={color}
                  className="flex-1 h-full"
                  style={{ backgroundColor: color }}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: index * 0.1,
                  }}
                />
              ))}
            </div>

            {/* Text */}
            <div className="relative z-10 pl-6 md:pl-16 w-full md:w-[50%] mt-24 md:mt-0">
              <motion.h1
                className="text-[40px] md:text-[64px] lg:text-[84px] font-bold text-black leading-tight mb-6"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                start navigating it through?
              </motion.h1>

              <motion.button
                onClick={() => navigate("/login")}
                className="bg-[#FF7A00] text-white text-md md:text-lg flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-md hover:bg-[#e86a00] transition"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                Click here to start <ChevronRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}


// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SplitText from "@/components/animations/SplitText";
// import { ChevronRight } from "lucide-react";

// export default function Onboarding() {
//   const [step, setStep] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const sequence = [0, 1, 2];
//     let i = 0;
//     const interval = setInterval(() => {
//       i++;
//       if (i >= sequence.length - 1) {
//         setStep(sequence[i]);
//         clearInterval(interval);
//       } else {
//         setStep(sequence[i]);
//       }
//     }, 3500);
//     return () => clearInterval(interval);
//   }, []);

//   const handleAnimationComplete = () => {
//     console.log("All letters have animated!");
//   };

//   return (
//     <div className="h-[100vh]">
//       {/* STEP 0 */}
//       {step === 0 && (
//         <div className="h-[100vh] flex justify-center items-center bg-[#F8F1E7] ">
//           <SplitText
//             text="hello, you!"
//             className="text-[84px] font-bold text-black text-center"
//             delay={300}
//             duration={0.9}
//             ease="power3.out"
//             splitType="chars"
//             from={{ opacity: 0, y: 40 }}
//             to={{ opacity: 1, y: 0 }}
//             onLetterAnimationComplete={handleAnimationComplete}
//           />
//         </div>
//       )}

//       {/* STEP 1 */}
//       {/* {step === 1 && (
//         <div className="h-[100vh] flex">
//           <div className="flex justify-center items-center bg-[#F8F1E7] w-1/2">
//             <h1 className="text-[84px] font-bold text-black">Is your world</h1>
//           </div>
//           <div className="flex justify-center items-center bg-white w-1/2"></div>
//         </div>
//       )} */}

//       {/* STEP 2 */}
//       {/* STEP 2 */}
// {step === 1 && (
//   <div className="h-[100vh] flex overflow-hidden">
//     {/* Left Column (slides up first) */}
//     <motion.div
//       className="h-[100vh] flex justify-center items-center bg-[#F8F1E7] w-1/2"
//       initial={{ y: "100%", opacity: 0 }}
//       animate={{ y: "0%", opacity: 1 }}
//       transition={{ duration: 2, ease: "easeOut" }}
//     >
//       <motion.h1
//         className="text-[84px] font-bold text-black"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1.1, duration: 1 }}
//       >
//         Is your world
//       </motion.h1>
//     </motion.div>

//     {/* Right Column (slides down after left finishes) */}
//     <motion.div
//       className="h-[100vh] flex justify-center items-center bg-black w-1/2"
//       initial={{ y: "-100%", opacity: 0 }}
//       animate={{ y: "0%", opacity: 1 }}
//       transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
//     >
//       <motion.h1
//         className="text-[84px] text-[#F8F1E7] font-bold"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 2, duration: 1.1 }}
//       >
//         divided in two
//       </motion.h1>
//     </motion.div>
//   </div>
// )}


//       {/* STEP 3 */}
//       {step === 2 && (
//         <div className="h-[100vh] relative flex items-center justify-start overflow-hidden bg-white">
//           {/* Background stripes with animation */}
//           <div className="absolute inset-0 flex">
//             {[
//               "#FEFCFA",
//               "#FCF9F5",
//               "#FBF7F1",
//               "#F9F4EC",
//               "#F8F1E7",
//               "#C6C1B9",
//               "#95918B",
//               "#63605C",
//               "#32302E",
//             ].map((color, index) => (
//               <motion.div
//                 key={color}
//                 className="flex-1 h-full"
//                 style={{ backgroundColor: color }}
//                 initial={{ y: "-100%" }}
//                 animate={{ y: "0%" }}
//                 transition={{
//                   duration: 0.9,
//                   ease: "easeOut",
//                   delay: index * 0.12,
//                 }}
//               />
//             ))}
//           </div>

//           {/* Text content */}
//           <div className="relative z-10 pl-16 w-[50%]">
//             <h1 className="text-[84px] font-bold text-black leading-tight mb-6">
//                  start navigating it through?
//             </h1>
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-[#FF7A00] text-white text-lg flex justify-center items-center px-6 py-2 rounded-md hover:bg-[#e86a00] transition"
//             >
//               Click here to start <ChevronRight/>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
