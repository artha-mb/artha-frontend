import { useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import ProfileMenu from "./ProfileMenu";
import ExamHall from "../assets/ExamHall.jpg";

export default function Instructions() {

    const location = useLocation();
    console.log("Received data:", location.state);
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

                <div className="
            flex items-center justify-between
            px-6 py-6
            max-w-4xl mx-auto
            2xl:max-w-full 2xl:px-16
        ">

                    {/* Left Side */}
                    <div onClick={() => navigate(previousPage)}>
                        <BackButton />
                    </div>

                    {/* Center Title */}
                    <h1 className="text-lg font-semibold text-white">
                        Instructions
                    </h1>

                    {/* Right Side Profile */}
                    <ProfileMenu variant="light" />

                </div>
            </div>

            {/* 🔥 Main Content */}
            <div className="relative z-20 max-w-3xl mx-auto px-6 py-10 space-y-8">

                {/* Disclaimer Card */}
                <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Company Disclaimer & Instructions
                    </h2>

                    <ul className="space-y-4 text-gray-600">
                        {instructions.map((item, index) => (
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
                            className="text-red-500 -mt-1"
                            size={34}
                        />
                        <div>
                            <h3 className="text-red-600 font-semibold mb-2">
                                Important Notice
                            </h3>
                            <p className="text-gray-700">
                                This platform does not guarantee employment or paid opportunities.
                                Any individual or organization claiming guaranteed job placement
                                on behalf of this company is unauthorized.
                                Please report suspicious activity immediately.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Question Palette Legend */}
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
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 accent-brandColorThree"
                    />
                    <span>
                        I have read and understood the company disclaimer and instructions
                    </span>
                </div>

                {/* Next Button */}
                <div className="flex justify-end mt-6">
                    <button
                        disabled={!agreed}
                        onClick={() =>
                            navigate("/examinstruction", {
                                state: location.state,
                            })
                        }
                        className={`px-6 py-2 cursor-pointer rounded-lg font-medium transition-all duration-300
            ${agreed
                                ? "bg-brandColorThree hover:bg-brandColorThree/90 text-white shadow-lg"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
            <span className="text-gray-600">{label}</span>
        </div>
    );
}
