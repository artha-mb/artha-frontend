import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ChatSystem({ mode, onStartExam, onBack }) {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentMode, setCurrentMode] = useState(mode || "general");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        type: "bot",
        content:
          "Hello! I'm Artha, your AI mentor.\n\n1️⃣ Exam preparation\n2️⃣ Mock tests\n3️⃣ Career guidance\n4️⃣ Call assistance\n\nWhat would you like help with today?",
      },
    ]);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    // 🔥 Navigation Logic
    const value = inputValue.trim();

    if (value === "1") {
      navigate("/form1");
    } else if (value === "2") {
      navigate("/form2");
    } else if (value === "3") {
      navigate("/form3");
    } else if (value === "4") {
      navigate("/form4");
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: "Please choose option 1, 2, 3 or 4." },
        ]);
      }, 500);
    }

    setInputValue("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-[#2D4A9E] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack}>
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-xl font-semibold">Chat with Artha</h2>
        </div>

        {/* 🔥 Profile Icon Instead of 4 Buttons */}
        <div>
          <div className="bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer transition">
            <User size={22} />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xl px-5 py-4 rounded-2xl text-sm whitespace-pre-line shadow
              ${
                msg.type === "user"
                  ? "bg-[#2D4A9E] text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D4A9E]"
        />
        <button
          onClick={handleSend}
          className="bg-[#2D4A9E] text-white p-3 rounded-xl hover:bg-[#1f3573] transition"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatSystem;
