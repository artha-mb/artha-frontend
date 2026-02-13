import React from 'react'

const StartLearningButton = () => {
    return (
        <div>
            {/* Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-lg font-semibold"
            >
                Start Learning →
            </button>
        </div>
    )
}

export default StartLearningButton