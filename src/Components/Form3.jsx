import React, { useState } from "react";

function Form3() {

  // 🟢 form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    time: "",
    purpose: "",
  });

  // 🟢 local array storage
  const [requests, setRequests] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setRequests([...requests, formData]);
    console.log("Stored Requests:", [...requests, formData]);

    // reset form
    setFormData({
      fullName: "",
      phone: "",
      time: "",
      purpose: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">

      {/* 🔵 Top Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <button className="bg-[#2B3A4D] px-4 py-2 rounded-lg">
          ← Back
        </button>

        <h1 className="text-lg font-semibold">Request Call</h1>

        <div></div>
      </div>

      {/* 🔵 Form Card */}
      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-[#2B3A4D] rounded-2xl border border-gray-600 p-8">

          {/* Title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              📞
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Schedule a Call
              </h2>
              <p className="text-gray-300 text-sm">
                Our counselors will call you at your preferred time
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-200 mb-2 block">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-[#0B1220] px-4 py-3 rounded-lg border border-gray-600 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-200 mb-2 block">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="w-full bg-[#0B1220] px-4 py-3 rounded-lg border border-gray-600 outline-none"
              />
            </div>

            {/* Preferred Time */}
            <div>
              <label className="text-sm text-gray-200 mb-2 block">
                Preferred Time
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-[#0B1220] px-4 py-3 rounded-lg border border-gray-600 outline-none"
              >
                <option value="">Select time slot</option>
                <option>Morning (9AM - 12PM)</option>
                <option>Afternoon (12PM - 4PM)</option>
                <option>Evening (4PM - 8PM)</option>
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="text-sm text-gray-200 mb-2 block">
                Purpose
              </label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                rows={4}
                className="w-full bg-[#0B1220] px-4 py-3 rounded-lg border border-gray-600 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg font-semibold"
            >
              Request Call
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Form3;
