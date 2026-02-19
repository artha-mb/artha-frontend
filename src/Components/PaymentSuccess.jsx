import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-6">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">

                <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Payment Successful 🎉
                </h2>

                <p className="text-gray-600 mb-6">
                    Your payment has been processed successfully.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg"
                >
                    Go to Home
                </button>
                <button
                    onClick={() => navigate("/exam-detailed-report", {
                        state: location.state
                    })}
                    className="bg-green-600 ml-4 cursor-pointer text-white px-6 py-3 rounded-lg"
                >
                    Go to Detailed Analytics
                </button>


            </div>
        </div>
    );
}
