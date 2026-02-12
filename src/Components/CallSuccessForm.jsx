import React from "react";
import { useLocation } from "react-router-dom";

function CallSuccessForm() {

  // 👇 receive data from Form2
  const location = useLocation();
  const data = location.state;

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4 text-white">
      
      <div className="w-full max-w-xl bg-[#2B3A4D] rounded-2xl border border-gray-600 p-10 text-center">

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-3xl text-green-400">
            ✔
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Call Request Confirmed!
        </h1>

        <p className="text-gray-300 mb-8">
          Our counselor will call you at your preferred time.
        </p>

        {/* 🔥 Dynamic Time */}
        <div className="bg-[#33475B] rounded-xl border border-gray-500 p-6 text-left mb-8">
          <p className="text-sm text-gray-200 mb-2">
            📅 Expected Call Time
          </p>
          <p className="text-gray-300">
            {data?.time || "Not Selected"}
          </p>
        </div>

        <button className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg font-semibold">
          🏠 Go to Dashboard
        </button>

      </div>
    </div>
  );
}

export default CallSuccessForm;
