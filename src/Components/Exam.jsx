import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TOTAL_QUESTIONS = 90;
const EXAM_DURATION_MINUTES = 20; // 🔥 Change this to control exam time

export default function Exam() {

    const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_MINUTES * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ⏳ TIMER
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSelectOption = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleMarkForReview = () => {
    if (!markedForReview.includes(currentQuestion)) {
      setMarkedForReview([...markedForReview, currentQuestion]);
    }
  };

  const handleSubmit = (auto = false) => {
    setIsSubmitted(true);
    alert(auto ? "Time's up! Auto submitted." : "Exam Submitted!");
    navigate("/examreport")
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">Exam Submitted ✅</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* HEADER */}
      <div className="bg-blue-800 px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">JEE Main Mock Test</h1>

        <div className="flex items-center gap-6">
          <div className="bg-blue-700 px-4 py-2 rounded-lg font-mono">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>

          <button
            onClick={() => handleSubmit(false)}
            className="bg-emerald-500 px-6 py-2 rounded-lg font-semibold"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex flex-1">

        {/* LEFT SECTION */}
        <div className="flex-1 p-8">

          {/* QUESTION CARD */}
          <div className="bg-slate-900 p-8 rounded-2xl shadow-xl">

            <div className="flex justify-between mb-6">
              <span className="text-sm text-blue-400">
                Question {currentQuestion} of {TOTAL_QUESTIONS}
              </span>

              <button
                onClick={handleMarkForReview}
                className="border border-slate-700 px-4 py-1 rounded-lg text-sm"
              >
                Mark for Review
              </button>
            </div>

            <h2 className="mb-6">
              Sample Question {currentQuestion}: What is the value of the expression?
            </h2>

            <div className="space-y-4">
              {["A", "B", "C", "D"].map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  className={`p-4 rounded-lg border cursor-pointer transition
                  ${
                    answers[currentQuestion] === option
                      ? "bg-blue-600 border-blue-400"
                      : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  Option {option}
                </div>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="flex justify-between mt-8">
            <button
              disabled={currentQuestion === 1}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="bg-slate-800 px-6 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={currentQuestion === TOTAL_QUESTIONS}
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
              className="bg-slate-800 px-6 py-2 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* RIGHT SECTION - QUESTION PALETTE */}
        <div className="w-80 bg-slate-900 p-6 overflow-y-auto">
          <h3 className="mb-4 font-semibold">Question Palette</h3>

          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => {
              const number = i + 1;

              let style = "bg-slate-700";

              if (currentQuestion === number) {
                style = "border-2 border-blue-400";
              } else if (markedForReview.includes(number)) {
                style = "bg-yellow-500";
              } else if (answers[number]) {
                style = "bg-blue-600";
              }

              return (
                <button
                  key={number}
                  onClick={() => setCurrentQuestion(number)}
                  className={`h-10 rounded text-sm ${style}`}
                >
                  {number}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}