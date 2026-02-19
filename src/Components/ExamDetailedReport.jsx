import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Circle, ArrowLeft } from "lucide-react";

function ExamDetailedReport() {
    const location = useLocation();
    const navigate = useNavigate();

    if (!location.state) {
        return <div className="p-10 text-center">No Report Data Found</div>;
    }

    const { exam, questions = [], answers = {} } = location.state;

    return (
        <div className="min-h-screen bg-gradient-to-br from-brandColorOne/5 via-white to-brandColorThree/5 px-4 py-10">

            {/* 🔥 Header */}
            <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-brandColorOne">
                    {exam?.title || "Exam"} - Detailed Report
                </h1>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 bg-brandColorThree text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
            </div>

            {/* 🔥 Questions List */}
            <div className="max-w-5xl mx-auto space-y-6">

                {questions.map((question, index) => {
                    const selected = answers[question.id];
                    const correctAnswer = question.correctAnswer;

                    const isCorrect = selected === correctAnswer;
                    const isUnattempted = !selected;

                    return (
                        <div
                            key={question.id}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                        >
                            {/* Question */}
                            <h2 className="font-semibold text-lg mb-4">
                                Q{index + 1}. {question.questionText}
                            </h2>

                            {/* Options */}
                            <div className="space-y-3">
                                {["A", "B", "C", "D"].map((key) => {
                                    const optionText = question.options?.[key];
                                    const isSelected = selected === key;
                                    const isCorrectOption = correctAnswer === key;

                                    let optionStyle =
                                        "p-3 rounded-lg border text-sm";

                                    if (isCorrectOption) {
                                        optionStyle +=
                                            " border-green-500 bg-green-50 text-green-700";
                                    } else if (isSelected && !isCorrectOption) {
                                        optionStyle +=
                                            " border-red-500 bg-red-50 text-red-700";
                                    } else {
                                        optionStyle +=
                                            " border-gray-200";
                                    }

                                    return (
                                        <div key={key} className={optionStyle}>
                                            <span className="font-semibold mr-2">{key})</span>
                                            {optionText}
                                        </div>
                                    );
                                })}

                            </div>

                            {/* Result Indicator */}
                            <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                                {isUnattempted ? (
                                    <>
                                        <Circle className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-500">Unattempted</span>
                                    </>
                                ) : isCorrect ? (
                                    <>
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span className="text-green-600">Correct</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-4 h-4 text-red-600" />
                                        <span className="text-red-600">Incorrect</span>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ExamDetailedReport;
