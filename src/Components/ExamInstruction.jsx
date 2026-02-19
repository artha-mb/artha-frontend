import { useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import ProfileMenu from "./ProfileMenu";
import ExamHall from "../assets/ExamHall.jpg";

export default function ExamInstruction() {
  const navigate = useNavigate();
  const location = useLocation();
  const [agreed, setAgreed] = useState(false);

  console.log("Instructions received:", location.state);

  const handleStartExam = () => {
    if (!location.state) {
      alert("No exam selected. Please go back and select an exam.");
      return;
    }

    navigate("/exam", {
      state: location.state,
    });
  };

  return (
    <div className="relative min-h-screen text-gray-800 overflow-hidden">

      {/* 🔥 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ExamHall})` }}
      ></div>

      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-brandColorOne/80 backdrop-blur-[2px]"></div>

      {/* 🔥 Full Width Glass Header */}
      <div className="relative z-30 w-full bg-white/10 backdrop-blur-md border-b border-white/20">

        <div
          className="
            flex items-center justify-between
            px-6 py-6
            max-w-4xl mx-auto
            2xl:max-w-full 2xl:px-16
          "
        >

          {/* Back Button */}
          <div onClick={() => navigate("/instructions")}>
            <BackButton />
          </div>

          {/* Title */}
          <h1 className="text-lg font-semibold text-white">
            Exam Instructions
          </h1>

          {/* Profile */}
          <ProfileMenu variant="light" />

        </div>
      </div>

      {/* 🔥 Main Content */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* General Instructions */}
        <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            General Instructions
          </h2>

          <ul className="space-y-4 text-gray-600">
            {[
              "The test contains 90 multiple choice questions divided into 3 sections",
              "Each correct answer awards 4 marks, incorrect answer deducts 1 mark",
              "You can mark questions for review and return to them later",
              "Use the question palette on the right to navigate between questions",
              "Click Submit when you are done - you cannot resume after submitting",
              "Auto-submit will happen when time runs out"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle
                  className="text-brandColorOne mt-1"
                  size={18}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50/95 backdrop-blur-md border-2 border-red-400 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle
              className="text-red-500 mt-1"
              size={20}
            />
            <div>
              <h3 className="text-red-600 font-semibold mb-2">
                Important Notice
              </h3>
              <p className="text-gray-700">
                Do not refresh or close the browser during the exam.
                Your progress will be lost and you cannot restart the same exam.
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-2xl">
          <h3 className="font-semibold mb-4 text-gray-800">
            Question Palette Legend
          </h3>

          <div className="flex flex-wrap gap-6 text-sm items-center">
            <LegendBox color="bg-gray-300" label="Not Visited" />
            <LegendBox color="bg-brandColorOne" label="Answered" />
            <LegendBox color="bg-yellow-400" label="Marked for Review" />
            <LegendBox
              color="border-2 border-brandColorOne"
              label="Current"
            />
          </div>
        </div>

        {/* Agreement */}
        <div className="flex items-center justify-center gap-3 text-white">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-4 h-4 accent-brandColorThree"
          />
          <span>I have read and understood all instructions</span>
        </div>

        {/* Start Button */}
        <button
          disabled={!agreed}
          onClick={handleStartExam}
          className={`w-full py-3 rounded-xl cursor-pointer font-semibold transition-all duration-300
          ${agreed
              ? "bg-brandColorThree hover:bg-brandColorThree/90 text-white shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Start Exam
        </button>

      </div>
    </div>
  );
}

/* Reusable Legend Component */
function LegendBox({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-5 h-5 rounded ${color}`}></div>
      <span className="text-gray-600">{label}</span>
    </div>
  );
}
