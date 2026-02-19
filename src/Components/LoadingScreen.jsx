import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoadingScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { redirectPath, formData } = location.state || {};

        const timer = setTimeout(() => {
            if (redirectPath) {
                navigate(redirectPath, {
                    state: { formData }   // ✅ FIXED
                });
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate, location.state]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-brandColorOne z-50">
            <div className="text-center text-white">
                <div className="w-16 h-16 border-4 border-brandColorThree border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-xl font-semibold tracking-wide">
                    Loading...
                </h2>
                <p className="text-sm opacity-80 mt-2">
                    Please wait while we prepare your form
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
