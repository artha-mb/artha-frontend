import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateUserStats } from "../apis/userApi";
import ProfileMenu from "./ProfileMenu";
import ExamHall from "../assets/ExamHall.jpg";
import BackButton from "./BackButton";

function Form2() {
  const location = useLocation();
  const prefilledData = location.state?.formData || {};
  const navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  const [formData, setFormData] = useState({
    fullName: loggedUser.fullName || prefilledData.fullName || "",
    mobile: loggedUser.mobile || prefilledData.mobile || "",
    classGrade: prefilledData.classGrade || "",
    exam: prefilledData.exam || "",
    language: prefilledData.language || "English",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, mobile: numericValue });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.fullName.trim();

    if (!trimmedName || !formData.exam) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    if (!formData.exam) {
      alert("Please select an exam");
      return;
    }

    try {
      setLoading(true);

      const updatedUser = await updateUserStats(loggedUser.id, {
        fullName: trimmedName,
        mobile: formData.mobile,
        classGrade: formData.classGrade,
        exam: formData.exam,
        language: formData.language,
        averageScore: 0,
        attempts: 0,
      });

      const updatedUserData = { ...loggedUser, ...updatedUser };
      localStorage.setItem("loggedUser", JSON.stringify(updatedUserData));

      navigate("/instructions", {
        state: updatedUserData
      });

    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error saving user. Make sure JSON Server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🔥 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ExamHall})` }}
      ></div>

      {/* 🔥 Blue Overlay */}
      <div className="absolute inset-0 bg-brandColorOne/80 backdrop-blur-[2px]"></div>

      {/* 🔥 Top Header (Back + Profile) */}
      <div className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/10 backdrop-blur-md">
        <BackButton />
        <ProfileMenu variant="light" />
      </div>

      {/* 🔥 FORM CARD */}
      <div className="relative z-20 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white/95 backdrop-blur-md mt-10 mb-20 rounded-2xl shadow-xl shadow-black/50 border border-white/30 p-8">

          <h1 className="text-3xl font-bold text-center text-gray-900">
            Complete Your Profile
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Tell us about yourself to personalize your experience
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">
                Full Name *
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-1 focus:border-brandColorThree transition"
              />
              <p className="text-xs text-gray-500 mt-1">Name from registration</p>
            </div>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">
                Mobile Number *
              </label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter 10 digit mobile number"
                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-1 focus:border-brandColorThree transition"
              />
              <p className="text-xs text-gray-500 mt-1">Mobile from registration</p>
            </div>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">
                Current Class / Grade *
              </label>
              <select
                name="classGrade"
                value={formData.classGrade}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-1 focus:border-brandColorThree outline-none transition"
              >
                <option value="">Select class</option>
                <option value="10th">10th</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Graduation">Graduation</option>
                <option value="Post Graduation">Post Graduation</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">
                Target Exam *
              </label>
              <select
                name="exam"
                value={formData.exam}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-1 focus:border-brandColorThree outline-none transition"
              >
                <option value="">Select exam</option>
                <option value="JEE Mains">JEE Mains</option>
                <option value="NEET">NEET</option>
                <option value="EAMCET">EAMCET</option>
                <option value="Government Exams">Government Exams</option>
                <option value="Private Exams">Private Exams</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">
                Preferred Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-1 focus:border-brandColorThree outline-none transition"
              >
                <option value="English">English</option>
                <option value="Telugu">Telugu</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-brandColorThree hover:bg-brandColorFour text-white font-medium py-3 rounded-lg transition duration-200 shadow-md cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Saving..." : "Submit →"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Form2;
