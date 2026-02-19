import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import ProfileMenu from "./ProfileMenu";

function ChatSystem({ mode, onStartExam, onBack }) {
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [step, setStep] = useState("menu");
    const [selectedOption, setSelectedOption] = useState(null);
    const [chatFormData, setChatFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [redirectInfo, setRedirectInfo] = useState(null);
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("loggedUser");
        navigate("/login");
    };


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

    useEffect(() => {
        if (isLoading && redirectInfo) {
            const timer = setTimeout(() => {
                navigate(redirectInfo.path, { state: redirectInfo.data });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, redirectInfo, navigate]);

    const askNextQuestion = (option, currentData) => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");

        const enrichedData = {
            ...currentData,
            fullName: currentData.fullName || loggedUser.fullName || "",
            mobile: currentData.mobile || loggedUser.mobile || "",
        };

        const streamOptions = {
            "B.Tech": ["CSE", "ECE", "EEE", "Mechanical", "Civil"],
            "Degree": ["BSc", "BCom", "BA", "BBA"],
            "Diploma": ["Polytechnic CSE", "Polytechnic ECE", "Mechanical"],
        };

        const interestOptions = {
            CSE: ["IT Jobs", "Software Development", "Cyber Security"],
            ECE: ["Core Jobs", "IT Jobs", "Govt Jobs"],
            EEE: ["Core Jobs", "Govt Jobs"],
            Mechanical: ["Core Jobs", "Govt Jobs", "Business"],
            Civil: ["Core Jobs", "Govt Jobs"],
            BSc: ["IT Jobs", "Non-IT Jobs", "Higher Studies"],
            BCom: ["Bank Jobs", "Govt Jobs", "Business"],
            BA: ["Govt Jobs", "Teaching"],
            BBA: ["Business", "MBA", "Corporate Jobs"],
        };

        if (option === "1") {
            if (!enrichedData.classGrade) {
                botMessage("Enter your Class (10th / Intermediate / Graduation / Post Graduation)");
                setStep("classGrade");
            } else if (!enrichedData.exam) {
                botMessage("Enter Target Exam (JEE Mains / NEET / EAMCET / Government Exams / Private Exams)");
                setStep("exam");
            } else if (!enrichedData.language) {
                botMessage("Preferred Language? (English / Telugu / Hindi)");
                setStep("language");
            } else {
                finishForm(option, enrichedData);
            }
        }

        if (option === "2") {
            if (!enrichedData.classGrade) {
                botMessage("Enter your Class (10th / Intermediate / Graduation / Post Graduation)");
                setStep("classGrade");
            } else if (!enrichedData.exam) {
                botMessage("Which exam do you want mock tests for? (JEE Mains / NEET / EAMCET / Government Exams)");
                setStep("exam");
            } else if (!enrichedData.language) {
                botMessage("Preferred Language? (English / Telugu / Hindi)");
                setStep("language");
            } else {
                finishForm(option, enrichedData);
            }
        }

        if (option === "3") {
            if (!enrichedData.degree) {
                botMessage("Select your Degree (B.Tech / Degree / Diploma)");
                setStep("degree");
            } else if (!enrichedData.stream) {
                const streams = streamOptions[enrichedData.degree] || [];
                botMessage(`Available Streams:\n${streams.join("\n")}`);
                setStep("stream");
            } else if (!enrichedData.interest) {
                const interests = interestOptions[enrichedData.stream] || [];
                botMessage(`Available Interests:\n${interests.join("\n")}`);
                setStep("interest");
            } else if (!enrichedData.time) {
                botMessage("Preferred Time? (Morning / Afternoon / Evening)");
                setStep("time");
            } else if (!enrichedData.purpose) {
                botMessage("What would you like to discuss?");
                setStep("purpose");
            } else {
                finishForm(option, enrichedData);
            }
        }

        if (option === "4") {
            if (!enrichedData.degree) {
                botMessage("Select your Degree (B.Tech / Degree / Diploma)");
                setStep("degree");
            } else if (!enrichedData.stream) {
                const streams = streamOptions[enrichedData.degree] || [];
                botMessage(`Available Streams:\n${streams.join("\n")}`);
                setStep("stream");
            } else if (!enrichedData.interest) {
                const interests = interestOptions[enrichedData.stream] || [];
                botMessage(`Available Interests:\n${interests.join("\n")}`);
                setStep("interest");
            } else if (!enrichedData.time) {
                botMessage("Preferred Time? (Morning / Afternoon / Evening)");
                setStep("time");
            } else if (!enrichedData.purpose) {
                botMessage("What would you like to discuss?");
                setStep("purpose");
            } else {
                finishForm(option, enrichedData);
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
                const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
                setChatFormData({
                    fullName: loggedUser.fullName || "",
                    mobile: loggedUser.mobile || ""
                });
                askNextQuestion(userInput, {
                    fullName: loggedUser.fullName || "",
                    mobile: loggedUser.mobile || ""
                });
            } else {
                botMessage("Please enter only 1, 2, 3 or 4.");
            }
        } else {
            let value = userInput;

            if (step === "exam") {
                const exams = {
                    jee: "JEE Mains",
                    "jee mains": "JEE Mains",
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

            if (step === "degree") {
                const degrees = {
                    "b.tech": "B.Tech",
                    "btech": "B.Tech",
                    "degree": "Degree",
                    "diploma": "Diploma"
                };
                value = degrees[userInput.toLowerCase()] || userInput;
            }

            if (step === "stream") {
                const streamMap = {
                    cse: "CSE",
                    ece: "ECE",
                    eee: "EEE",
                    mechanical: "Mechanical",
                    civil: "Civil",
                    bsc: "BSc",
                    bcom: "BCom",
                    ba: "BA",
                    bba: "BBA",
                    "polytechnic cse": "Polytechnic CSE",
                    "polytechnic ece": "Polytechnic ECE"
                };
                value = streamMap[userInput.toLowerCase()] || userInput;
            }

            if (step === "interest") {
                const interestMap = {
                    "it jobs": "IT Jobs",
                    "software development": "Software Development",
                    "cyber security": "Cyber Security",
                    "core jobs": "Core Jobs",
                    "govt jobs": "Govt Jobs",
                    business: "Business",
                    "higher studies": "Higher Studies",
                    "bank jobs": "Bank Jobs",
                    teaching: "Teaching",
                    mba: "MBA",
                    "corporate jobs": "Corporate Jobs",
                    "non-it jobs": "Non-IT Jobs"
                };
                value = interestMap[userInput.toLowerCase()] || userInput;
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

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-brandColorOne text-white px-6 py-4 flex justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="p-2 rounded-full transition duration-200 bg-white text-brandColorThree hover cursor-pointer">
                        <ArrowLeft size={22} />
                    </button>
                    <h2 className="text-xl font-semibold">Chat with Artha</h2>
                </div>


                <ProfileMenu variant="dark" />
            </div>

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
                                        ? "bg-brandColorOne text-white rounded-br-none"
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

            <div className="bg-white p-4 flex gap-3">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1
                                border
                                border-gray-500
                                rounded-xl
                                px-4 py-2
                                outline-none
                                focus:border
                                focus:border-brandColorThree
                                transition-all duration-200"
                    placeholder="Type your answer..."
                />

                <button
                    onClick={handleSend}
                    className="bg-brandColorThree text-white px-4 rounded-xl cursor-pointer"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}

export default ChatSystem;