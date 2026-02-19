import React from "react";

const StartLearningButton = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Saving..." : "Start Learning →"}
    </button>
  );
};

export default StartLearningButton;
