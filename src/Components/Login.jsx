import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../apis/userApi";
import LoadingScreen from "./LoadingScreen";
import loginImage from "../assets/LoginImage.png";
import ExamHall from "../assets/ExamHall.jpg";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const user = await loginUser(
                formData.emailOrUsername,
                formData.password
            );

            if (!user) {
                setErrorMessage("Invalid email/username or password");
                setIsLoading(false);
                return;
            }

            if (user.status === "blocked") {
                setErrorMessage("Your account is blocked. Contact support.");
                setIsLoading(false);
                return;
            }

            localStorage.setItem("loggedUser", JSON.stringify(user));

            setShowLoadingScreen(true);
            setIsLoading(false);

            setTimeout(() => {
                navigate("/chatsystem");
            }, 2000);

        } catch (error) {
            setErrorMessage("Login failed. Please try again.");
            setIsLoading(false);
        }
    };

    if (showLoadingScreen) {
        return <LoadingScreen />;
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={ExamHall}
                    alt="Exam Hall"
                    className="w-full h-full object-cover brightness-55 contrast-75"
                />
            </div>

            {/* Blue Overlay */}
            <div className="absolute inset-0 bg-brandColorOne/70 z-0"></div>

            {/* Main Content */}
            <div className="relative z-20 w-full max-w-6xl flex">

                {/* LEFT SIDE - IMAGE */}
                <div className="hidden md:flex md:w-1/3 ml-10 items-center justify-center">
                    <img
                        src={loginImage}
                        alt="Login Illustration"
                        className="w-[450px] max-w-lg object-contain"
                    />
                </div>

                {/* RIGHT SIDE - FORM */}
                <div className="w-full md:w-2/3 xl:ml-40 sm:ml-10 md:ml-10 flex items-center justify-center px-6">
                    <form
                        onSubmit={handleLogin}
                        className="bg-white/95 backdrop-blur-sm border border-brandColorOne p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
                    >
                        <h2 className="text-2xl font-bold text-center text-brandColorThree uppercase">
                            Login
                        </h2>

                        <input
                            type="text"
                            placeholder="Email or Username"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:border-brandColorThree"
                            onChange={(e) => {
                                setFormData({ ...formData, emailOrUsername: e.target.value });
                                setErrorMessage("");
                            }}
                            required
                            disabled={isLoading}
                        />

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full border p-3 rounded-lg focus:outline-none focus:border-brandColorThree"
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value });
                                    setErrorMessage("");
                                }}
                                required
                                disabled={isLoading}
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                onClick={() => !isLoading && setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 text-sm text-left">
                                {errorMessage}
                            </p>
                        )}

                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className={`text-sm text-brandColorOne hover:underline ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-brandColorThree hover:bg-brandColorFour text-white py-3 rounded-lg font-semibold transition cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>

                        <div className="text-center mt-4">
                            <p className="text-gray-700">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-[#FA862E] font-semibold hover:underline"
                                >
                                    Register here
                                </Link>
                            </p>
                        </div>
                        <div className="text-center mt-2">
                            <Link
                                to="/"
                                className="inline-block mt-2 text-sm font-medium text-brandColorOne/90 hover:text-brandColorOne"
                            >
                                ← Back to Home
                            </Link>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );

}
