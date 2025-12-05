import React from "react";
import { FaSpinner } from "react-icons/fa";

function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <FaSpinner className="animate-spin mr-2 text-secondary" size={70} />
    </div>
  );
}

export default Loading;


