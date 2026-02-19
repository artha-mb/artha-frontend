import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Trophy,
  Target,
  XCircle,
  Circle,
  BarChart3,
  LayoutDashboard,
} from "lucide-react";
import { updateUserStats } from "../apis/userApi";
import ExamHall from "../assets/ExamHall.jpg";

function ExamResult() {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    return <div>No Exam Data Found</div>;
  }

  const {
    examId,
    exam,
    answers = {},
    questions = [],
    user,
  } = location.state;

  /* ============================
     CALCULATIONS
  ============================ */

  let correct = 0;
  let incorrect = 0;
  let unattempted = 0;

  questions.forEach((question) => {
    const selectedOption = answers[question.id];

    if (!selectedOption) {
      unattempted++;
    } else if (selectedOption === question.correctAnswer) {
      correct++;
    } else {
      incorrect++;
    }
  });

  const totalQuestions = questions.length;
  const marksPerQuestion = 4;

  let negativeMark = 0;

  if (exam?.negativeMarking) {
    const match = exam.negativeMarking.match(/-?\d+(\.\d+)?/);
    negativeMark = match ? Math.abs(parseFloat(match[0])) : 0;
  }

  const totalMarks =
    correct * marksPerQuestion -
    incorrect * negativeMark;

  const maxMarks = totalQuestions * marksPerQuestion;

  const percentage =
    totalQuestions > 0
      ? parseFloat(((totalMarks / maxMarks) * 100).toFixed(1))
      : 0;

  /* ============================
     UPDATE USER STATS
  ============================ */

  useEffect(() => {
    const updateStats = async () => {
      if (!user || !user.id) return;

      const previousAttempts = Number(user.attempts) || 0;
      const previousAverage = Number(user.averageScore) || 0;

      const newAttempts = previousAttempts + 1;

      const newAverage =
        ((previousAverage * previousAttempts) + percentage) /
        newAttempts;

      try {
        await updateUserStats(user.id, {
          attempts: newAttempts,
          averageScore: Number(newAverage.toFixed(1)),
        });
      } catch (error) {
        console.error("Error updating stats:", error);
      }
    };

    updateStats();
  }, [percentage, user]);

  /* ============================ */

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🔥 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ExamHall})` }}
      ></div>

      {/* 🔥 Blue Overlay */}
      <div className="absolute inset-0 bg-brandColorOne/85 backdrop-blur-[2px]"></div>

      {/* 🔥 Content */}
      <div className="relative z-20 px-4 py-10 text-gray-800">

        <h1 className="text-center text-2xl font-semibold mb-8 text-white">
          Exam Result
        </h1>

        <div className="max-w-4xl mx-auto rounded-2xl p-10 bg-white/95 backdrop-blur-md shadow-xl border border-white/30">

          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full border-8 border-brandColorOne flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-brandColorOne">
                {percentage}%
              </p>
              <span className="text-sm text-gray-500">Score</span>
            </div>
          </div>

          <h2 className="text-center text-4xl font-bold mb-6 text-gray-800">
            {totalMarks} / {maxMarks}
          </h2>

          <p className="text-center text-brandColorThree flex justify-center items-center gap-2 font-medium">
            <Trophy className="w-5 h-5" />
            {percentage >= 75
              ? "Excellent Performance!"
              : percentage >= 50
                ? "Good Job!"
                : "Keep Practicing!"}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg">
            <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Target className="text-green-600 w-6 h-6" />
            </div>
            <p className="text-3xl font-bold">{correct}</p>
            <p className="text-gray-500 mt-1">Correct</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
              <XCircle className="text-red-600 w-6 h-6" />
            </div>
            <p className="text-3xl font-bold">{incorrect}</p>
            <p className="text-gray-500 mt-1">Incorrect</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg">
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Circle className="text-gray-500 w-6 h-6" />
            </div>
            <p className="text-3xl font-bold">{unattempted}</p>
            <p className="text-gray-500 mt-1">Unattempted</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mt-10">

          <button
            className="flex items-center justify-center gap-2 bg-brandColorThree text-white py-4 rounded-xl font-semibold cursor-pointer shadow-lg"
            onClick={() => navigate("/payment", {
              state: {
                exam,
                questions,
                answers,
              },
            })}>
            <BarChart3 className="w-5 h-5" />
            View Detailed Analysis
          </button>

          <button
            className="flex items-center justify-center gap-2 bg-white/90 py-4 rounded-xl font-semibold cursor-pointer shadow-lg"
            onClick={() => navigate("/")}
          >
            <LayoutDashboard className="w-5 h-5" />
            Go to Dashboard
          </button>

        </div>
      </div>
    </div>
  );
}

export default ExamResult;
