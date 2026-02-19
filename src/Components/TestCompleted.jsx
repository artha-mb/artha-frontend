import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExamHall from "../assets/ExamHall.jpg";

export default function TestCompleted() {
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

            {/* 🔥 Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${ExamHall})` }}
            ></div>

            {/* 🔥 Overlay */}
            <div className="absolute inset-0 bg-brandColorOne/80 backdrop-blur-[2px]"></div>

            {/* 🔥 Card */}
            <div className="relative z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-black/50 p-10 max-w-md w-full text-center space-y-6">

                {/* ✅ Animated Circle + Tick */}
                <div className="flex justify-center">
                    <div
                        className={`w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-lg
              transition-all duration-500 ease-out
              ${animate ? "scale-100 opacity-100" : "scale-0 opacity-0"}
            `}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="w-12 h-12"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                d="M5 13l4 4L19 7"
                                className={animate ? "tick animate-draw" : "tick"}
                            />
                        </svg>
                    </div>
                </div>

                {/* ✅ Title */}
                <h1 className="text-2xl font-bold text-gray-800">
                    Test Completed Successfully!
                </h1>

                {/* ✅ Subtitle */}
                <p className="text-gray-600 text-sm">
                    Your responses have been recorded successfully.
                    You can now review your results or return to dashboard.
                </p>

                {/* ✅ Buttons */}
                <div className="space-y-3 pt-4">
                    <button
                        onClick={() => navigate("/examreport")}
                        className="w-full py-3 rounded-lg font-semibold text-white bg-brandColorThree hover:bg-brandColorFour transition cursor-pointer"
                    >
                        View Report
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full py-3 rounded-lg font-semibold border border-brandColorThree text-brandColorThree hover:bg-brandColorThree hover:text-white transition cursor-pointer"
                    >
                        Go to Dashboard
                    </button>
                </div>

            </div>

            {/* 🎬 Tick Draw Animation */}
            <style>
                {`
          .tick {
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
          }

          .animate-draw {
            animation: drawTick 0.6s ease-out 0.5s forwards;
          }

          @keyframes drawTick {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
            </style>

        </div>
    );
}
