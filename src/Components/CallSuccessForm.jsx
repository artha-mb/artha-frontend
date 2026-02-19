import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import BackButton from "./BackButton";
import ExamHall from "../assets/ExamHall.jpg";

function CallSuccessForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* 🔥 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ExamHall})` }}
      ></div>

      {/* 🔥 Blue Overlay */}
      <div className="absolute inset-0 bg-brandColorOne/80 backdrop-blur-[2px]"></div>

      {/* 🔥 Card */}
      <div className="relative z-20 w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-10 shadow-2xl text-center">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button className="bg-brandColorOne px-4 py-2 rounded-lg text-white cursor-pointer"
            onClick={() => navigate("/chatsystem")}>
            ← Back
          </button>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-brandColorOne/10 rounded-full flex items-center justify-center">
            <CheckCircle className="text-brandColorOne w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Call Request Confirmed!
        </h1>

        <p className="text-gray-500 mb-8">
          Our counselor will call you at your preferred time.
        </p>

        {/* Details Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-6 text-left mb-8">

          <p className="text-sm text-gray-500 mb-2">
            Preferred Call Time
          </p>

          <p className="text-lg font-medium text-brandColorOne">
            {data?.time || "Not Selected"}
          </p>

          {data?.fullName && (
            <p className="text-sm text-gray-600 mt-3">
              Name: {data.fullName}
            </p>
          )}

          {data?.phone && (
            <p className="text-sm text-gray-600">
              Phone: {data.phone}
            </p>
          )}

          {data?.purpose && (
            <p className="text-sm text-gray-600 mt-2">
              Purpose: {data.purpose}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-lg font-semibold text-white bg-brandColorThree hover:bg-brandColorFour transition shadow-md cursor-pointer"
        >
          Go to Dashboard →
        </button>

      </div>
    </div>
  );

}

export default CallSuccessForm;
