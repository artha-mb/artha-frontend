import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const texts = [
    "JEE లేదా NEET? UPSC లేదా SSC?",
    "JEE या NEET? UPSC या SSC?",
    "JEE or NEET? UPSC or SSC?"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === texts.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden bg-[url('/education-bg.jpg.jpg')] bg-cover bg-center">

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/70 to-purple-600"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-6">

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 transition-all duration-700">
          {texts[currentIndex]}
        </h1>

        <p className="text-lg md:text-xl mb-8 opacity-95">
          Find your perfect career path with Artha’s scientifically
          designed Career Readiness Test.
        </p>

        <button
          className="bg-orange-500 cursor-pointer hover:bg-orange-400 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl"
          onClick={() => navigate("/register")}
        >
          Start Free Test Now
        </button>

      </div>

    </section>
  );
}

export default Hero;
