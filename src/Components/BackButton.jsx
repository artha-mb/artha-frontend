import React from 'react'

const BackButton = () => {
  return (
    <div>
        <button className="bg-[#2B3A4D] px-4 py-2 rounded-lg"
            onClick={() => navigate("/chatsystem")}>
            ← Back
        </button>
    </div>
  )
}

export default BackButton