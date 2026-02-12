import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/chatsystem"); // Navigates to ChatSystem
  };

  return (
    <div className="min-h-screen flex flex-col mt-16 xl:mt-0 xl:mb-0 sm:mt-16">

      {/* ================= HERO ================= */}
      <section
        className="flex-1 flex items-center justify-center text-center text-white
        bg-linear-to-r from-[#8806CE] via-[#6F05B5] to-[#65049C]"
      >

        <div className="max-w-4xl px-6">

          <h2 className="text-6xl md:text-5xl font-bold leading-tight">
            Master Your Exams With Artha.
          </h2>

          <p className="mt-6 text-white/90 leading-relaxed">
            Artha is a career readiness platform delivering structured mock
            tests, skill assessments, and guided career preparation. From
            students to professionals — we help you build confidence and
            succeed with real-world practice.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 mb-12 xl:mb-0">

            {/* Career Guidance */}
            <button
              onClick={goToChat}
              className="bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
            >
              Career Guidance
            </button>

            {/* Call Assistance */}
            <button
              onClick={goToChat}
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-violet-600 transition"
            >
              Call Assistance
            </button>

            {/* Career Guidance Test */}
            <button
              onClick={goToChat}
              className="bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-violet-800 hover:scale-105 transition"
            >
              Career Guidance Test
            </button>

          </div>

        </div>
      </section>
    </div>
  );
}

export default HeroSection;
