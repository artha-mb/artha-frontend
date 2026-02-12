import React from "react";

function ExamResult() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white px-4 py-10">

      {/* 🔵 Page Title */}
      <h1 className="text-center text-2xl font-semibold mb-8">
        Exam Result
      </h1>

      {/* 🔵 Main Result Card */}
      <div className="max-w-4xl mx-auto border border-blue-500 rounded-2xl p-10 bg-gradient-to-r from-[#0B1B34] to-[#0D1A2B]">

        {/* Score Circle */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full border-[8px] border-blue-500 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold">80.0%</p>
            <span className="text-sm text-gray-300">Score</span>
          </div>
        </div>

        {/* Marks */}
        <h2 className="text-center text-4xl font-bold mb-6">
          240 / 300
        </h2>

        {/* Rank + Percentile */}
        <div className="flex justify-center items-center gap-10 mb-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Rank</p>
            <p className="text-xl font-semibold">1247</p>
          </div>

          <div className="h-10 w-[1px] bg-gray-600"></div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">Percentile</p>
            <p className="text-xl font-semibold">92.5%</p>
          </div>
        </div>

        {/* Performance */}
        <p className="text-center text-yellow-400 flex justify-center items-center gap-2">
          🏆 Excellent Performance!
        </p>
      </div>

      {/* 🔵 Stats Cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-10">

        {/* Correct */}
        <div className="bg-[#2B3A4D] rounded-2xl border border-gray-600 p-8 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            🎯
          </div>
          <p className="text-3xl font-bold">65</p>
          <p className="text-gray-300 mt-1">Correct</p>
        </div>

        {/* Incorrect */}
        <div className="bg-[#2B3A4D] rounded-2xl border border-gray-600 p-8 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            ⭕
          </div>
          <p className="text-3xl font-bold">15</p>
          <p className="text-gray-300 mt-1">Incorrect</p>
        </div>

        {/* Unattempted */}
        <div className="bg-[#2B3A4D] rounded-2xl border border-gray-600 p-8 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-gray-400/20 flex items-center justify-center mb-4">
            ⚪
          </div>
          <p className="text-3xl font-bold">10</p>
          <p className="text-gray-300 mt-1">Unattempted</p>
        </div>

      </div>

      {/* 🔵 Bottom Buttons */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mt-10">

        <button className="bg-blue-500 hover:bg-blue-600 py-4 rounded-xl font-semibold">
          📊 View Detailed Analysis
        </button>

        <button className="bg-[#33475B] hover:bg-[#3d556d] py-4 rounded-xl font-semibold">
          📈 Go to Dashboard
        </button>

      </div>

    </div>
  );
}

export default ExamResult;
