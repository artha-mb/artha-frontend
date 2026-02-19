import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {

  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate("/chatsystem")}
        className="
      bg-brandColorThree 
      text-white 
      cursor-pointer 
      flex items-center justify-center
      w-10 h-10 rounded-full           /* Mobile: circle */
      sm:w-auto sm:h-auto sm:px-4 sm:py-2 sm:rounded-lg  /* Desktop: normal button */
    "
      >
        <span className='text-2xl'>←</span>
        <span className="hidden sm:inline ml-1">Back</span>
      </button>
    </div>

  )
}

export default BackButton
