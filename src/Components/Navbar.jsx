import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import PainPoints from "./PainPoints";
import HowItWorks from "./HowItWorks";
import ExamCoverage from "./ExamCoverage";
import Pricing from "./Pricing";
import MentalHealth from "./MentalHealth";
import Footer from "./Footer";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">

          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* Logo */}
            <h1 className="text-2xl font-bold text-[#8806CE]">
              Artha
            </h1>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8 font-medium">
              <a href="#exams" className="hover:text-orange-500">Exams</a>
              <a href="#how" className="hover:text-orange-500">How It Works</a>
              <a href="#pricing" className="hover:text-orange-500">Pricing</a>
              <a href="#contact" className="hover:text-orange-500">Contact</a>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">

              <button
                onClick={() => navigate("/login")}
                className="border border-orange-500 text-orange-500 px-5 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-orange-500 hover:text-white cursor-pointer"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-300 shadow-md cursor-pointer"
              >
                Start Test
              </button>

            </div>


            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-[#8806CE] cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={28} />
            </button>

          </div>
        </header>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >

          {/* Sidebar Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-[#8806CE]">Menu</h2>
            <button
              className=" cursor-pointer hover:text-red-500"
              onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* Sidebar Links */}
          <nav className="flex flex-col p-6 space-y-6 font-medium text-gray-700">
            <a
              href="#exams"
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-500"
            >
              Exams
            </a>

            <a
              href="#how"
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-500"
            >
              How It Works
            </a>

            <a
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-500"
            >
              Pricing
            </a>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-orange-500"
            >
              Contact
            </a>
          </nav>


          {/* Sidebar Buttons */}
          <div className="flex flex-col px-6 space-y-4">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="w-full border border-orange-500 text-orange-500 px-5 py-2 rounded-lg font-semibold hover:bg-orange-500 hover:text-white cursor-pointer"
            >
              Login
            </button>


            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/register");
              }}
              className="w-full bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-400 shadow-md cursor-pointer"
            >
              Start Test
            </button>

          </div>

        </div>
        <Hero />
        <PainPoints />
        <HowItWorks />
        <ExamCoverage />
        <Pricing />
        <MentalHealth />
        <Footer />
      </div>
    </>
  );
}

export default Navbar;
