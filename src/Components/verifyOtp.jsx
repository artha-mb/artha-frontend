import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ExamHall from "../assets/ExamHall.jpg";

export default function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();
    const phone = location.state?.phone;

    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleVerify = (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (otp.length !== 6) {
            setErrorMessage("Please enter a valid 6-digit OTP");
            return;
        }

        setSuccessMessage("Phone verified successfully! Redirecting...");

        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={ExamHall}
                    alt="Exam Hall"
                    className="w-full h-full object-cover brightness-60"
                />
            </div>

            {/* Blue Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/50 to-blue-900/70 z-10"></div>

            {/* Glass Card */}
            <form
                onSubmit={handleVerify}
                className="relative z-20 bg-white/95 backdrop-blur-md border border-white/30 p-8 rounded-xl shadow-2xl w-full max-w-md space-y-5"
            >
                <h2 className="text-xl font-bold text-center text-brandColorThree">
                    Verify OTP
                </h2>

                <p className="text-sm text-gray-600 text-center">
                    OTP sent to <span className="font-semibold">{phone}</span>
                </p>

                <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-brandColorThree focus:ring-1 focus:ring-brandColorThree transition"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, ""));
                        setErrorMessage("");
                    }}
                    required
                />

                {errorMessage && (
                    <p className="text-red-500 text-sm text-center">
                        {errorMessage}
                    </p>
                )}

                {successMessage && (
                    <p className="text-green-600 text-sm text-center">
                        {successMessage}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-brandColorThree/90 hover:bg-brandColorThree cursor-pointer text-white py-3 rounded-lg font-semibold transition"
                >
                    Verify
                </button>

                <p className="text-center text-sm text-gray-600">
                    Didn’t receive OTP?{" "}
                    <span className="text-brandColorThree cursor-pointer hover:underline">
                        Resend
                    </span>
                </p>
            </form>
        </div>
    );
}
