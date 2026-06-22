'use client';

import { useState } from "react";

const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('Ask Pikachu what we should do...');
  }

  return (
    <button
      className="bg-yellow-500 text-white font-mono m-auto w-fit text-lg px-6 py-3 my-12 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-md cursor-pointer"
      onClick={() => {
        setHasError(true);
      }}
    >
      Error Boundary
    </button> 
  )
}

export default ErrorButton;