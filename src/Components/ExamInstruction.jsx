import { useState } from "react";
import { CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExamInstruction() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
        onClick={() => navigate("/instructions")}>
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-lg font-semibold">Instructions</h1>

        <div></div>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto space-y-8">
        {/* General Instructions Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">
            General Instructions
          </h2>

          <ul className="space-y-4 text-slate-300">
            {[
              "The test contains 90 multiple choice questions divided into 3 sections",
              "Each correct answer awards 4 marks, incorrect answer deducts 1 mark",
              "You can mark questions for review and return to them later",
              "Use the question palette on the right to navigate between questions",
              "Click Submit when you are done - you cannot resume after submitting",
              "Auto-submit will happen when time runs out"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 mt-1" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Notice */}
        <div className="bg-red-950/40 border border-red-600 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-500 mt-1" size={20} />
            <div>
              <h3 className="text-red-400 font-semibold mb-2">
                Important Notice
              </h3>
              <p className="text-slate-300">
                Do not refresh or close the browser during the exam.
                Your progress will be lost and you cannot restart the same exam.
              </p>
            </div>
          </div>
        </div>

        {/* Question Palette Legend */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Question Palette Legend</h3>

          <div className="flex flex-wrap gap-6 text-sm items-center">
            <LegendBox color="bg-slate-700" label="Not Visited" />
            <LegendBox color="bg-blue-600" label="Answered" />
            <LegendBox color="bg-yellow-500" label="Marked for Review" />
            <LegendBox
              color="border-2 border-blue-500"
              label="Current"
              isBorder
            />
          </div>
        </div>

        {/* Agreement */}
        <div className="flex items-center justify-center gap-3 text-slate-300">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-4 h-4 accent-emerald-500"
          />
          <span>I have read and understood all instructions</span>
        </div>

        {/* Start Button */}
        <button
          disabled={!agreed}
          onClick={() => navigate("/exam")}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
          ${
            agreed
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"
          }`}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}

/* Reusable Legend Component */
function LegendBox({ color, label, isBorder = false }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-5 h-5 rounded ${
          isBorder ? color : color
        }`}
      ></div>
      <span>{label}</span>
    </div>
  );
}