import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: "" });
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.cardName)
            newErrors.cardName = "Card holder name is required";

        if (!formData.cardNumber)
            newErrors.cardNumber = "Card number is required";
        else if (!/^[0-9]{16}$/.test(formData.cardNumber))
            newErrors.cardNumber = "Card number must be 16 digits";

        if (!formData.expiry)
            newErrors.expiry = "Expiry date is required";

        if (!formData.cvv)
            newErrors.cvv = "CVV is required";
        else if (!/^[0-9]{3}$/.test(formData.cvv))
            newErrors.cvv = "CVV must be 3 digits";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        // Fake payment processing
        setTimeout(() => {
            setLoading(false);
            navigate("/payment-success", {
                state: location.state
            });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-orange-50 flex items-center justify-center px-6 py-10">
            <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-2xl grid md:grid-cols-2 gap-10">

                {/* LEFT SIDE – PAYMENT METHODS */}
                <div>
                    <h2 className="text-2xl font-bold text-brandColorThree mb-6">
                        Choose Payment Method
                    </h2>

                    {/* Card Preview */}
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl p-6 mb-6 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-semibold">Credit / Debit Card</span>
                            <div className="flex gap-2 text-2xl">
                                <span>💳</span>
                            </div>
                        </div>

                        <div className="text-lg tracking-widest mb-4">
                            {formData.cardNumber
                                ? formData.cardNumber.replace(/(.{4})/g, "$1 ")
                                : "•••• •••• •••• ••••"}
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>{formData.cardName || "CARD HOLDER"}</span>
                            <span>{formData.expiry || "MM/YYYY"}</span>
                        </div>
                    </div>

                    {/* UPI Options */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between border p-4 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
                            <span className="font-semibold">📱 PhonePe</span>
                            <span className="text-indigo-600 font-medium">UPI</span>
                        </div>

                        <div className="flex items-center justify-between border p-4 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
                            <span className="font-semibold">💙 Google Pay</span>
                            <span className="text-indigo-600 font-medium">UPI</span>
                        </div>

                        <div className="flex items-center justify-between border p-4 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
                            <span className="font-semibold">💰 Paytm</span>
                            <span className="text-indigo-600 font-medium">Wallet</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE – CARD FORM */}
                <div>
                    <h2 className="text-2xl font-bold text-center text-brandColorThree mb-6">
                        Payment Details
                    </h2>

                    <form onSubmit={handlePayment} className="space-y-4">

                        {/* Card Holder Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Card Holder Name"
                                value={formData.cardName}
                                onChange={(e) => handleChange("cardName", e.target.value)}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            {errors.cardName && (
                                <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                            )}
                        </div>

                        {/* Card Number */}
                        <div>
                            <input
                                type="text"
                                placeholder="Card Number"
                                maxLength="16"
                                value={formData.cardNumber}
                                onChange={(e) => handleChange("cardNumber", e.target.value)}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            {errors.cardNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                            )}
                        </div>

                        {/* Expiry + CVV */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <input
                                    type="month"
                                    value={formData.expiry}
                                    onChange={(e) => handleChange("expiry", e.target.value)}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                                {errors.expiry && (
                                    <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                                )}
                            </div>

                            <div className="w-1/2">
                                <input
                                    type="password"
                                    placeholder="CVV"
                                    maxLength="3"
                                    value={formData.cvv}
                                    onChange={(e) => handleChange("cvv", e.target.value)}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                                {errors.cvv && (
                                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                                )}
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r cursor-pointer hover:bg-brandColorFour from-orange-500 to-orange-400 text-white py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition"
                        >
                            {loading ? "Processing..." : "Pay Securely"}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}