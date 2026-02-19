import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../apis/userApi";
import SearchableStateDropdown from "./SearchableStateDropdown";
import ExamHall from "../assets/ExamHall.jpg";

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        currentGrade: "",
        targetExam: "",
        preferredLanguage: "",
        state: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: "" });
    };

    const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

    const validatePassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/.test(password);

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    const nextStep = () => {
        let newErrors = {};

        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.userName) newErrors.userName = "Username is required";
        if (!formData.email)
            newErrors.email = "Email is required";
        else if (!validateEmail(formData.email))
            newErrors.email = "Enter a valid email address";

        if (!formData.mobile) newErrors.mobile = "Phone number is required";
        else if (!validatePhone(formData.mobile))
            newErrors.mobile = "Phone must be 10 digits";

        if (!formData.password)
            newErrors.password = "Password is required";
        else if (!validatePassword(formData.password))
            newErrors.password =
                "Min 8 chars, include upper, lower, number & special char";

        if (!formData.confirmPassword)
            newErrors.confirmPassword = "Confirm your password";
        else if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) setStep(2);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!formData.currentGrade)
            newErrors.currentGrade = "Select current grade";
        if (!formData.targetExam)
            newErrors.targetExam = "Select target exam";
        if (!formData.preferredLanguage)
            newErrors.preferredLanguage = "Select language";
        if (!formData.state)
            newErrors.state = "Select state";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                await createUser(formData);
                navigate("/verify-otp", { state: { phone: formData.mobile } });
            } catch {
                alert("Registration failed");
            }
        }
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
            <div className="relative z-20 bg-white/95 backdrop-blur-md border border-white/30 p-8 rounded-xl shadow-2xl w-full max-w-md">

                <h2 className="text-2xl font-bold text-center text-brandColorThree mb-6">
                    Create Account
                </h2>

                {/* Step Toggle */}
                <div className="relative flex w-[250px] mx-auto bg-gray-200 rounded-full mb-6 overflow-hidden">
                    <div
                        className={`absolute top-0 left-0 h-full w-1/2 bg-brandColorThree rounded-full transition-all duration-500 ${step === 2 ? "translate-x-full" : ""
                            }`}
                    ></div>

                    <div className={`w-1/2 py-2 text-center font-semibold z-10 ${step === 1 ? "text-white" : "text-gray-600"}`}>
                        Step 1
                    </div>

                    <div className={`w-1/2 py-2 text-center font-semibold z-10 ${step === 2 ? "text-white" : "text-gray-600"}`}>
                        Step 2
                    </div>
                </div>

                <form onSubmit={handleRegister}>

                    {step === 1 && (
                        <div className="space-y-3">

                            <InputField
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={(e) => handleChange("fullName", e.target.value)}
                                error={errors.fullName}
                            />

                            <InputField
                                placeholder="Username"
                                value={formData.userName}
                                onChange={(e) => handleChange("userName", e.target.value)}
                                error={errors.userName}
                            />

                            <InputField
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                error={errors.email}
                            />

                            <InputField
                                type="tel"
                                placeholder="Phone (10 digits)"
                                value={formData.mobile}
                                onChange={(e) => handleChange("mobile", e.target.value)}
                                error={errors.mobile}
                            />

                            <PasswordField
                                placeholder="Password"
                                show={showPassword}
                                toggle={() => setShowPassword(!showPassword)}
                                onChange={(e) => handleChange("password", e.target.value)}
                                error={errors.password}
                            />

                            <PasswordField
                                placeholder="Confirm Password"
                                show={showConfirm}
                                toggle={() => setShowConfirm(!showConfirm)}
                                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                error={errors.confirmPassword}
                            />

                            <button
                                type="button"
                                onClick={nextStep}
                                className="w-full bg-brandColorThree hover:bg-brandcolorFour text-white py-3 rounded-lg font-semibold transition cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-3">

                            <SelectField
                                label="Current Exam / Grade"
                                value={formData.currentGrade}
                                onChange={(e) => handleChange("currentGrade", e.target.value)}
                                options={["10th", "Inter", "Graduation", "Post Graduation"]}
                                error={errors.currentGrade}
                            />

                            <SelectField
                                label="Target Exam"
                                value={formData.targetExam}
                                onChange={(e) => handleChange("targetExam", e.target.value)}
                                options={["JEE Mains", "NEET", "EAMCET", "Private Exams", "Govt Exams"]}
                                error={errors.targetExam}
                            />

                            <SelectField
                                label="Preferred Language"
                                value={formData.preferredLanguage}
                                onChange={(e) => handleChange("preferredLanguage", e.target.value)}
                                options={["English", "Hindi", "Telugu"]}
                                error={errors.preferredLanguage}
                            />

                            <SearchableStateDropdown
                                value={formData.state}
                                onChange={(val) => handleChange("state", val)}
                                error={errors.state}
                            />

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-1/2 bg-brandColorThree hover:bg-brandcolorFour cursor-pointer text-white py-3 rounded-lg"
                                >
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    className="w-1/2 bg-brandColorFour hover:bg-brandColorFour text-white py-3 rounded-lg font-semibold transition cursor-pointer"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                <div className="text-center mt-6">
                    <Link to="/login" className="text-gray-700 font-semibold">
                        Already have an account?{" "}
                        <span className="text-brandColorThree">Login here</span>
                    </Link>
                </div>
                <div className="text-center mt-2">
                    <Link
                        to="/"
                        className="inline-block mt-2 text-sm font-medium text-brandColorOne hover:underline"
                    >
                        ← Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
}

/* Reusable Components */

const InputField = ({ type = "text", placeholder, value, onChange, error }) => (
    <div>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-brandColorThree"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

const PasswordField = ({ placeholder, show, toggle, onChange, error }) => (
    <div>
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-brandColorThree"
            />
            <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={toggle}
            >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

const SelectField = ({ label, value, onChange, options, error }) => (
    <div>
        <select
            value={value}
            onChange={onChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-brandColorThree bg-white"
        >
            <option value="">Select {label}</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);
