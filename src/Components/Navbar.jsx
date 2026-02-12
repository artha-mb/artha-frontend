import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import HeroSection from "./HeroSection";
import Services from "./Services";
import WhyArtha from "./WhyArtha";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
    <header className="fixed top-0 left-0 w-full z-50 bg-white text-gray-600 shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide text-[#8806CE]">
          Artha
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="hover:text-gray-800 transition">Home</a>
          <a href="#" className="hover:text-gray-800 transition">About</a>
          <a href="#" className="hover:text-gray-800 transition">Services</a>
          <a href="#" className="hover:text-gray-800 transition">Pricing</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
            {/* Filled Button */}
            <button className="bg-[#8806CE] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#65049C] transition shadow-md">
                Contact
            </button>
            {/* Outline Button */}
            <button className="border-2 border-[#8806CE] text-[#8806CE] px-6 py-1.5 rounded-lg font-semibold hover:bg-violet-50 transition">
                Login
            </button>
        </div>


        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#8806CE]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 px-6 py-6 space-y-6 text-gray-600">
          <nav className="flex flex-col space-y-4">
            <a href="#" className="hover:text-gray-800">Home</a>
            <a href="#" className="hover:text-gray-800">About</a>
            <a href="#" className="hover:text-gray-800">Services</a>
            <a href="#" className="hover:text-gray-800">Pricing</a>
          </nav>

          <div className="flex flex-col space-y-3">
  
          {/* Filled Button */}
            <button className="bg-[#8806CE] text-white px-6 py-2 text-sm rounded-md font-medium hover:bg-[#65049C] transition w-fit shadow-sm">
                Contact
            </button>
          {/* Outline Button */}
            <button className="border-2 border-[#8806CE] text-[#8806CE] px-7 py-2 text-sm rounded-md font-medium hover:bg-violet-50 transition w-fit">
                Login
            </button>
        </div>

        </div>
      )}
      
    </header>
    <HeroSection />
    <Services />
    <WhyArtha />
    <Contact />
    <Footer />

    </div>
    
  );

}
