import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExamHall from "../assets/ExamHall.jpg";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Reset requested for:", email);
        setIsSubmitted(true);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

            {/* 🔥 Background Image (Same as Form1) */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${ExamHall})` }}
            ></div>

            {/* 🔥 Blue Overlay (Same as Form1) */}
            <div className="absolute inset-0 bg-brandColorOne/80 backdrop-blur-[2px]"></div>

            {/* 🔥 FORM CARD */}
            <div className="relative z-20 w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 p-8 shadow-xl shadow-black/50 space-y-5">

                {!isSubmitted ? (
                    <>
                        <h2 className="text-2xl font-bold text-center text-gray-800">
                            Forgot Password
                        </h2>

                        <p className="text-sm text-gray-500 text-center">
                            Enter your email and we’ll send you a reset link.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-brandColorThree transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg font-semibold text-white transition bg-brandColorThree hover:bg-brandColorFour cursor-pointer"
                            >
                                Send Reset Link
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center text-gray-800">
                            Check Your Email
                        </h2>

                        <p className="text-center text-gray-600 text-sm">
                            If an account exists for <b>{email}</b>, you will receive a
                            password reset link shortly.
                        </p>

                        <div className="text-center mt-4">
                            <Link
                                to="/login"
                                className="text-brandColorThree font-semibold hover:underline"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
