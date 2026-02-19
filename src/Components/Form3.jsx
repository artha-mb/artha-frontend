import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import BackButton from "./BackButton";
import { createCareerRequest } from "../apis/careerRequestApi";
import ProfileMenu from "./ProfileMenu";
import ExamHall from "../assets/ExamHall.jpg";

function Form3() {
  const location = useLocation();
  const prefilledData = location.state?.formData || {};
  const navigate = useNavigate();

  console.log("=== Form3 Debug ===");
  console.log("Full prefilledData from chat:", prefilledData);

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  const [formData, setFormData] = useState({
    fullName: loggedUser.fullName || prefilledData.fullName || "",
    mobile: loggedUser.mobile || prefilledData.mobile || "",
    degree: prefilledData.degree || "",
    stream: prefilledData.stream || "",
    interest: prefilledData.interest || "",
    time: prefilledData.time || "",
    purpose: prefilledData.purpose || ""
  });

  const [loading, setLoading] = useState(false);


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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, mobile: numericValue });
      }
      return;
    }

    if (name === "fullName") {
      const formattedValue = value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setFormData({ ...formData, fullName: formattedValue });
      return;
    }

    if (name === "degree") {
      setFormData({
        ...formData,
        degree: value,
        stream: "",
        interest: "",
      });
      return;
    }

    if (name === "stream") {
      setFormData({
        ...formData,
        stream: value,
        interest: "",
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.fullName.trim();

    if (!trimmedName) {
      alert("Please enter your name");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    if (!formData.degree || !formData.stream || !formData.interest || !formData.time || !formData.purpose) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const savedRequest = await createCareerRequest({
        fullName: trimmedName,
        mobile: formData.mobile,
        degree: formData.degree,
        stream: formData.stream,
        interest: formData.interest,
        time: formData.time,
        purpose: formData.purpose,
        status: "pending",
        createdDate: new Date().toISOString(),
      });

      navigate("/callsuccessform", { state: savedRequest });

    } catch (error) {
      alert("Failed to save request. Make sure JSON Server is running.");
      console.error(error);
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

      {/* 🔥 Top Header */}
      <div className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/10 backdrop-blur-md">
        <div onClick={() => navigate("/chatsystem")}>
          <BackButton />
        </div>
        <ProfileMenu variant="light" />
      </div>

      {/* 🔥 Main Content */}
      <div className="relative z-20 flex justify-center px-4 py-12">
        <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-black/50 mt-10 mb-20 border border-white/30 p-8">

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-brandColorOne/10 rounded-full flex items-center justify-center">
              <Phone className="text-brandColorThree" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Schedule a Call
              </h2>
              <p className="text-gray-500 text-sm">
                Our counselors will call you at your preferred time
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-1 focus:border-brandColorThree outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Name from registration
              </p>
            </div>

            <div>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-1 focus:border-brandColorThree outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Mobile from registration
              </p>
            </div>

            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-1 focus:border-brandColorThree outline-none transition"
            >
              <option value="">Select Degree *</option>
              <option value="B.Tech">B.Tech</option>
              <option value="Degree">Degree</option>
              <option value="Diploma">Diploma</option>
            </select>

            {formData.degree && (
              <select
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-1 focus:border-brandColorThree outline-none transition"
              >
                <option value="">Select Stream *</option>
                {streamOptions[formData.degree]?.map((stream, index) => (
                  <option key={index} value={stream}>{stream}</option>
                ))}
              </select>
            )}

            {formData.stream && (
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-1 focus:border-brandColorThree outline-none transition"
              >
                <option value="">Select Interest *</option>
                {interestOptions[formData.stream]?.map((interest, index) => (
                  <option key={index} value={interest}>{interest}</option>
                ))}
              </select>
            )}

            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-1 focus:border-brandColorThree outline-none transition"
            >
              <option value="">Select time slot *</option>
              <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
              <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
              <option value="Evening (4PM - 8PM)">Evening (4PM - 8PM)</option>
            </select>

            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="What would you like to discuss? *"
              rows={4}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-1 focus:border-brandColorThree outline-none transition"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-brandColorThree hover:bg-brandColorFour text-white py-3 rounded-lg cursor-pointer transition ${loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-brandColorFour"
                }`}
            >
              {loading ? "Booking..." : "Book a Call Appointment →"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );

}

export default Form3;