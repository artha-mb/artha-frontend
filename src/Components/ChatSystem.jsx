import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function ChatSystem({ mode, onStartExam, onBack }) {
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [step, setStep] = useState("menu");
    const [selectedOption, setSelectedOption] = useState(null);
    const [chatFormData, setChatFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [redirectInfo, setRedirectInfo] = useState(null); // 🔥 important

    useEffect(() => {
        setMessages([
            {
                type: "bot",
                content:
                    "Hello! I'm Artha, your AI mentor.\n\n1️⃣ Exam preparation\n2️⃣ Mock tests\n3️⃣ Career guidance\n4️⃣ Call assistance\n\nWhat would you like help with today?",
            },
        ]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 🔥 Navigation happens AFTER loader renders
    useEffect(() => {
        if (isLoading && redirectInfo) {
            const timer = setTimeout(() => {
                navigate(redirectInfo.path, { state: redirectInfo.data });
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoading, redirectInfo, navigate]);

    const askNextQuestion = (option, currentData) => {
        if (option === "1" || option === "2") {
            if (!currentData.fullName) {
                botMessage("Please enter your Full Name only (Example: Bindu)");
                setStep("fullName");
            } else if (!currentData.classGrade) {
                botMessage("Enter your Class (10th / Intermediate / Graduation / Post Graduation)");
                setStep("classGrade");
            } else if (!currentData.exam) {
                botMessage("Enter Target Exam (JEE / NEET / EAMCET / Government Exams / Private Exams)");
                setStep("exam");
            } else if (!currentData.language) {
                botMessage("Preferred Language? (English / Telugu / Hindi)");
                setStep("language");
            } else {
                finishForm(option, currentData);
            }
        }

        if (option === "3" || option === "4") {
            if (!currentData.fullName) {
                botMessage("Please enter your Full Name only.");
                setStep("fullName");
            } else if (!currentData.phone) {
                botMessage("Enter your 10-digit phone number only.");
                setStep("phone");
            } else if (!currentData.time) {
                botMessage("Preferred Time? (Morning / Afternoon / Evening)");
                setStep("time");
            } else if (!currentData.purpose) {
                botMessage("What would you like to discuss?");
                setStep("purpose");
            } else {
                finishForm(option, currentData);
            }
        }
    };

    const finishForm = (option, data) => {
        setMessages((prev) => [
            ...prev,
            {
                type: "bot",
                content: (
                    <div>
                        <p className="mb-2">✅ Thank you <strong>{data.fullName}</strong>!</p>
                        <p className="mt-3 text-sm text-gray-500">
                            Redirecting you now...
                        </p>
                    </div>
                ),
            },
        ]);

        let path = "";
        if (option === "1") path = "/form1";
        if (option === "2") path = "/form2";
        if (option === "3") path = "/form3";
        if (option === "4") path = "/form4";

        navigate("/loading", {
            state: { redirectPath: path, formData: data }
        });
    };

    const botMessage = (text) => {
        setMessages((prev) => [...prev, { type: "bot", content: text }]);
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userInput = inputValue.trim();
        setMessages((prev) => [...prev, { type: "user", content: userInput }]);

        if (step === "menu") {
            if (["1", "2", "3", "4"].includes(userInput)) {
                setSelectedOption(userInput);
                askNextQuestion(userInput, {});
            } else {
                botMessage("Please enter only 1, 2, 3 or 4.");
            }
        } else {
            let value = userInput;

            if (step === "exam") {
                const exams = {
                    jee: "JEE",
                    neet: "NEET",
                    eamcet: "EAMCET",
                    "government exams": "Government Exams",
                    "private exams": "Private Exams",
                };
                value = exams[userInput.toLowerCase()] || userInput;
            }

            if (step === "language") {
                const languages = {
                    english: "English",
                    telugu: "Telugu",
                    hindi: "Hindi",
                };
                value = languages[userInput.toLowerCase()] || userInput;
            }

            if (step === "classGrade") {
                const classes = {
                    "10th": "10th",
                    intermediate: "Intermediate",
                    graduation: "Graduation",
                    "post graduation": "Post Graduation",
                };
                value = classes[userInput.toLowerCase()] || userInput;
            }

            if (step === "time") {
                const times = {
                    morning: "Morning (9AM - 12PM)",
                    afternoon: "Afternoon (12PM - 4PM)",
                    evening: "Evening (4PM - 8PM)",
                };
                value = times[userInput.toLowerCase()] || userInput;
            }

            if (step === "fullName") {
                value = userInput
                    .toLowerCase()
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
            }

            const updatedData = { ...chatFormData, [step]: value };
            setChatFormData(updatedData);
            askNextQuestion(selectedOption, updatedData);
        }

        setInputValue("");
    };

    // 🔥 Loader replaces entire UI
    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-[#2D4A9E] text-white px-6 py-4 flex justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <button onClick={onBack}>
                        <ArrowLeft size={22} />
                    </button>
                    <h2 className="text-xl font-semibold">Chat with Artha</h2>
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                    <User size={22} />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                {messages.map((msg, i) => {
                    const isWelcomeMessage = i === 0 && msg.type === "bot";

                    return (
                        <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`
                                    ${isWelcomeMessage ? "max-w-2xl px-6 py-6 text-base" : "max-w-xl px-5 py-4 text-sm"}
                                    rounded-2xl whitespace-pre-line shadow
                                    ${msg.type === "user"
                                        ? "bg-[#2D4A9E] text-white rounded-br-none"
                                        : "bg-gray-200 text-gray-800 rounded-bl-none"}
                                `}
                            >
                                {msg.content}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white p-4 flex gap-3">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 border rounded-xl px-4 py-2"
                    placeholder="Type your answer..."
                />
                <button
                    onClick={handleSend}
                    className="bg-[#2D4A9E] text-white px-4 rounded-xl"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}

export default ChatSystem;
