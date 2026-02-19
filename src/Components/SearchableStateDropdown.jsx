import React, { useState, useEffect, useRef } from "react";

const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
];

const SearchableStateDropdown = ({ value, onChange, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredStates = indianStates.filter((state) =>
        state.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full border border-gray-500 placeholder:text-gray-400 focus:outline-none focus:border-1 focus:border-brandColorOne p-3 rounded-lg bg-white cursor-pointer"
            >
                {value || "Select State"}
            </div>

            {isOpen && (
                <div className="absolute left-0 top-full mt-1 w-full focus:outline-none focus:border-1 focus:border-brandColorOne bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    <input
                        type="text"
                        placeholder="Search state..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 border-b outline-none"
                    />

                    {filteredStates.length > 0 ? (
                        filteredStates.map((state) => (
                            <div
                                key={state}
                                className="p-2 hover:bg-gray-100 cursor-pointer focus:outline-none focus:border-1 focus:border-brandColorOne"
                                onClick={() => {
                                    onChange(state);
                                    setIsOpen(false);
                                    setSearch("");
                                }}
                            >
                                {state}
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">
                            No states found
                        </div>
                    )}
                </div>
            )}

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default SearchableStateDropdown;
