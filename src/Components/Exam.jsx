import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchExamByCategory,
  fetchQuestionsByExamId,
} from "../apis/examApi";

export default function Exam() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [autoSubmit, setAutoSubmit] = useState(false);


  /* ================= FETCH ================= */
  useEffect(() => {
    const loadExamData = async () => {
      try {
        if (!user?.exam) {
          alert("No exam selected");
          navigate("/");
          return;
        }

        const selectedExam = await fetchExamByCategory(user.exam);
        if (!selectedExam) {
          alert("No published exam found");
          navigate("/");
          return;
        }

        setExam(selectedExam);

        const examQuestions = await fetchQuestionsByExamId(
          selectedExam.id
        );

        const filteredQuestions = examQuestions.filter(
          (q) => q.examId === selectedExam.id
        );

        setQuestions(filteredQuestions);
        setTimeLeft(parseInt(selectedExam.duration) * 60);
      } catch (error) {
        console.error("Error loading exam:", error);
      } finally {
        setLoading(false);
      }
    };

    loadExamData();
  }, []);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAutoSubmit(true);
          setShowSubmitPopup(true);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isSubmitted]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = (currentQuestion / questions.length) * 100;

  const currentQ = questions[currentQuestion - 1];

  const handleSelectOption = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option,
    }));
  };

  const handleMarkForReview = () => {
    if (!markedForReview.includes(currentQuestion)) {
      setMarkedForReview((prev) => [...prev, currentQuestion]);
    }
  };

  const handleSubmit = (auto = false) => {
    if (!auto) {
      setShowSubmitPopup(true);
      return;
    }

    // Auto submit directly
    navigate("/examreport", {
      state: { examId: exam.id, exam, answers, questions, user },
    });
  };

  const confirmSubmit = () => {
    setIsSubmitted(true);
    setShowSubmitPopup(false);

    navigate("/examreport", {
      state: { examId: exam.id, exam, answers, questions, user },
    });
  };


  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!exam || questions.length === 0)
    return <div className="p-10 text-center">No Questions Available</div>;

  const answeredCount = Object.keys(answers).length;
  const markedCount = markedForReview.length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-800">

      {/* ================= HEADER ================= */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-extrabold text-indigo-500">
            {exam.name}
          </div>

          <div
            className={`flex items-center gap-2 text-lg font-semibold ${timeLeft < 300 ? "text-red-500 animate-pulse" : "text-slate-900"
              }`}
          >
            ⏱ {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* ================= PROGRESS ================= */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>
              Progress: <strong>{currentQuestion}/{questions.length}</strong>
            </span>
            <span>{exam.category}</span>
          </div>

          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 p-6">

        {/* ================= QUESTION CARD ================= */}
        <div className="bg-white rounded-2xl shadow-md p-10">

          <span className="inline-block bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-6">
            {exam.category}
          </span>

          <div className="text-sm text-slate-500 mb-6">
            Question {currentQuestion} of {questions.length}
          </div>

          <h2 className="text-2xl font-semibold mb-8 text-slate-900 leading-relaxed">
            {currentQ.questionText}
          </h2>

          <div className="flex flex-col gap-4">
            {["A", "B", "C", "D"].map((option) => (
              <div
                key={option}
                onClick={() => handleSelectOption(option)}
                className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${answers[currentQ.id] === option
                    ? "border-indigo-500 bg-indigo-50 font-semibold"
                    : "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40"
                  }`}
              >
                <span className="font-bold text-indigo-600 mr-3">
                  {option})
                </span>
                {currentQ.options?.[option]}
              </div>
            ))}
          </div>

          {/* NAVIGATION */}
          <div className="flex justify-between items-center mt-10 gap-4 flex-wrap">

            <button
              disabled={currentQuestion === 1}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="px-6 py-3 rounded-lg border-2 border-slate-200 cursor-pointer bg-brandColorThree text-white hover:bg-brandColorFour hover:text-white disabled:opacity-50"
            >
              ← Previous
            </button>

            <button
              onClick={handleMarkForReview}
              className="px-6 py-3 cursor-pointer rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-100"
            >
              ⭐ Mark for Review
            </button>

            <button
              disabled={currentQuestion === questions.length}
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold shadow-md hover:-translate-y-1 transition disabled:opacity-50 cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>

        {/* ================= PALETTE ================= */}
        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-28 h-fit">

          <h3 className="text-lg font-bold mb-6 text-slate-900">
            Question Palette
          </h3>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, index) => {
              const number = index + 1;
              let style =
                "border border-slate-200 text-slate-500 bg-white";

              if (currentQuestion === number)
                style = "bg-indigo-500 text-white";
              else if (markedForReview.includes(number))
                style = "bg-orange-500 text-white";
              else if (answers[q.id])
                style = "bg-green-500 text-white";

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(number)}
                  className={`aspect-square cursor-pointer rounded-md text-sm font-semibold transition hover:scale-105 ${style}`}
                >
                  {number}
                </button>
              );
            })}
          </div>

          {/* STATS */}
          <div className="mt-6 border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Answered:</span>
              <span className="font-semibold">{answeredCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Not Answered:</span>
              <span className="font-semibold">{unansweredCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Marked:</span>
              <span className="font-semibold">{markedCount}</span>
            </div>
          </div>

          <button
            onClick={() => handleSubmit(false)}
            className="w-full cursor-pointer mt-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 hover:bg-brandColorFour text-white font-semibold shadow-md hover:-translate-y-1 transition"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* ================= SUBMIT POPUP ================= */}
      {showSubmitPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center">

            <h2 className="text-xl font-bold mb-4 text-slate-800">
              {autoSubmit ? "Time's Up!" : "Confirm Submission"}
            </h2>

            <p className="text-slate-600 mb-6">
              {autoSubmit
                ? "Your exam time has ended. Do you want to submit your test?"
                : "Are you sure you want to submit your test?"}
            </p>

            <div className="flex justify-center gap-4">
              {!autoSubmit && (
                <button
                  onClick={() => setShowSubmitPopup(false)}
                  className="px-5 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={confirmSubmit}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold shadow-md cursor-pointer"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}


