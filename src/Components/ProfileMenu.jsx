import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { logoutUser } from "../apis/userApi";


function ProfileMenu({ variant = "dark" }) {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");

    const handleLogout = async () => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");

        if (loggedUser?.id) {
            await logoutUser(loggedUser.id);
        }

        navigate("/login");
    };

    // Dynamic styles based on background
    const circleStyle =
        variant === "dark"
            ? "w-10 h-10 bg-white text-brandColorThree rounded-full flex items-center justify-center font-bold"
            : "w-10 h-10 bg-brandColorThree text-white rounded-full flex items-center justify-center font-bold";

    const textStyle =
        variant === "dark" ? "font-medium text-white" : "font-medium text-white";

    return (
        <div className="relative">
            <div
                onClick={() => setShowProfileMenu(true)}
                className="flex items-center gap-3 cursor-pointer"
            >
                <div className={circleStyle}>
                    {loggedUser?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <p className={`${textStyle} hidden sm:block`}>
                    {loggedUser?.fullName || "User"}
                </p>
            </div>

            {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-44 border border-brandColorOne bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <div className="flex justify-end px-3">
                        <button
                            onClick={() => setShowProfileMenu(false)}
                            className="text-gray-400 cursor-pointer hover:text-gray-600"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            navigate("/dashboard");
                            setShowProfileMenu(false);
                        }}
                        className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-200"
                    >
                        Go to Dashboard
                    </button>
                    <div className="border-t border-gray-300 my-1"></div>


                    <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}


export default ProfileMenu;
