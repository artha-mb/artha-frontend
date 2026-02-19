import React, { useEffect, useState } from "react";
import { getUserById, updateUserStats } from "../apis/userApi";
import BackButton from "./BackButton";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");

    const [user, setUser] = useState(null);

    // ✅ Always fetch fresh data from JSON server
    useEffect(() => {
        const fetchUser = async () => {
            const freshUser = await getUserById(storedUser.id);
            setUser(freshUser);
            localStorage.setItem("loggedUser", JSON.stringify(freshUser));
        };

        if (storedUser?.id) fetchUser();
    }, []);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-white">

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
                <div onClick={() => navigate("/chatsystem")}>
                    <BackButton />
                </div>
                <ProfileMenu variant="light" />
            </div>

            {/* CONTENT */}
            <div className="flex justify-center px-4 py-12">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

                    <h1 className="text-3xl font-bold text-gray-800 mb-8">
                        Welcome, {user.fullName}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <EditableField label="Full Name" name="fullName" user={user} setUser={setUser} />
                        <EditableField label="Mobile" name="mobile" user={user} setUser={setUser} />
                        <EditableField label="Class / Grade" name="classGrade" user={user} setUser={setUser} />
                        <EditableField label="Target Exam" name="exam" user={user} setUser={setUser} />
                        <EditableField label="Language" name="language" user={user} setUser={setUser} />
                        <EditableField label="Email" name="email" user={user} setUser={setUser} />
                        <EditableField label="Username" name="userName" user={user} setUser={setUser} />

                        {/* Non Editable */}
                        <DisplayField label="Status" value={user.status} />
                        <DisplayField label="Created Date" value={user.createdDate} />

                    </div>

                    {/* Stats */}
                    <div className="mt-10 grid grid-cols-2 gap-6">
                        <StatCard title="Attempts" value={user.attempts || 0} />
                        <StatCard title="Average Score" value={`${user.averageScore || 0}%`} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserDashboard;


/* ===============================
   Editable Field Component
================================ */
function EditableField({ label, name, user, setUser }) {
    const [editing, setEditing] = useState(false);
    const [tempValue, setTempValue] = useState(user[name]);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);

        try {
            const updatedUser = await updateUserStats(user.id, {
                [name]: tempValue,
            });

            setUser(updatedUser);
            localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
            setEditing(false);
        } catch (error) {
            alert("Failed to update");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setTempValue(user[name]);
        setEditing(false);
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">{label}</p>

                {!editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="text-[17px] text-brandColorOne cursor-pointer font-semibold"
                    >
                        Edit
                    </button>
                )}
            </div>

            {editing ? (
                <>
                    <input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg mb-2"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-green-600 text-white cursor-pointer rounded-lg text-sm"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                        <button
                            onClick={handleCancel}
                            className="px-3 py-1 bg-gray-300 cursor-pointer rounded-lg text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-lg font-semibold text-gray-800">
                    {user[name]}
                </p>
            )}
        </div>
    );
}


/* ===============================
   Non Editable Field
================================ */
function DisplayField({ label, value }) {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="text-lg font-semibold text-gray-800">{value}</p>
        </div>
    );
}


/* ===============================
   Stat Card
================================ */
function StatCard({ title, value }) {
    return (
        <div className="bg-brandColorOne/10 border border-brandColorOne/20 rounded-xl p-6">
            <p className="text-sm text-brandColorOne">{title}</p>
            <p className="text-3xl font-bold text-brandColorOne mt-2">{value}</p>
        </div>
    );
}
