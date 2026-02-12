import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Form2() {

  // 🟢 form values
  const [formData, setFormData] = useState({
    fullName: "",
    classGrade: "",
    exam: "",
    language: "English",
  });

  // 🟢 array storage (temporary instead of backend)
  const [profiles, setProfiles] = useState([]);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // push into array
    setProfiles([...profiles, formData]);

    console.log("Stored Profiles:", [...profiles, formData]);

    // reset form
    setFormData({
      fullName: "",
      classGrade: "",
      exam: "",
      language: "English",
    });

    navigate("/instructions")
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-[#2B3A4D] rounded-2xl border border-gray-600 p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-center text-white">
          Complete Your Profile
        </h1>

        <p className="text-center text-gray-300 mt-2 mb-8">
          Tell us about yourself to personalize your experience
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div>
            <label className="text-gray-200 text-sm mb-2 block">
              Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full bg-[#0B1220] text-white px-4 py-3 rounded-lg border border-gray-600 outline-none"
            />
          </div>

          {/* Class */}
          <div>
            <label className="text-gray-200 text-sm mb-2 block">
              Current Class / Grade
            </label>
            <select
              name="classGrade"
              value={formData.classGrade}
              onChange={handleChange}
              className="w-full bg-[#0B1220] text-white px-4 py-3 rounded-lg border border-gray-600 outline-none"
            >
              <option value="">Select class</option>
              <option>10th</option>
               <option>Intermediate</option>
                <option>Graduation</option>
                <option>Post Graduation</option>
            </select>
          </div>

          {/* Exam */}
          <div>
            <label className="text-gray-200 text-sm mb-2 block">
              Target Exam
            </label>
            <select
              name="exam"
              value={formData.exam}
              onChange={handleChange}
              className="w-full bg-[#0B1220] text-white px-4 py-3 rounded-lg border border-gray-600 outline-none"
            >
              <option value="">Select exam</option>
              <option>JEE</option>
              <option>NEET</option>
              <option>EAMCET</option>
              <option>Government Exams</option>
              <option>Private Exams</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="text-gray-200 text-sm mb-2 block">
              Preferred Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full bg-[#0B1220] text-white px-4 py-3 rounded-lg border border-gray-600 outline-none"
            >
              <option>English</option>
              <option>Telugu</option>
              <option>Hindi</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-lg font-semibold"
          >
            Start Learning →
          </button>
        </form>

      </div>
    </div>
  );
}

export default Form2;
