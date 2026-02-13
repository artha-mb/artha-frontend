import { useState } from "react";
import { CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";


export default function Instructions() {

    const location = useLocation();
const previousPage = location.state?.from || "/form1";


    const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const instructions = [
    "This assessment platform is designed solely for evaluation and skill assessment purposes.",
    "We do not promote, endorse, or require enrollment in any specific course, training program, or paid service.",
    "Participation in this test does not guarantee job placement, employment, internship, or career opportunities.",
    "No promises of hiring, salary, or selection are made based on test performance.",
    "This platform does not act as a recruitment agency or job placement service.",
    "The company shall not be held responsible for third-party claims regarding guaranteed placements."
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
          onClick={() => navigate(previousPage)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-lg font-semibold">Instructions</h1>

        <div></div>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Company Disclaimer Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">
            Company Disclaimer & Instructions
          </h2>

          <ul className="space-y-4 text-slate-300">
            {instructions.map((item, index) => (
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
                This platform does not guarantee employment or paid opportunities.
                Any individual or organization claiming guaranteed job placement
                on behalf of this company is unauthorized.
                Please report suspicious activity immediately.
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
            />
          </div>
        </div>

        {/* Agreement */}
        <div className="flex items-center justify-center gap-3 text-slate-300">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 accent-emerald-500"
          />
          <span>
            I have read and understood the company disclaimer and instructions
          </span>
        </div>

        {/* Next Button  */}
        <div className="flex justify-end mt-6">
          <button
            disabled={!agreed}
            onClick={() => navigate("/examinstruction")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300
            ${
              agreed
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}


/* Reusable Legend Component */
function LegendBox({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-5 h-5 rounded ${color}`}></div>
      <span>{label}</span>
    </div>
  );
}