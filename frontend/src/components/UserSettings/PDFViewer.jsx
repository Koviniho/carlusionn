import React from "react";
import { AiOutlineEye, AiOutlineDownload } from "react-icons/ai"; // Import icons from react-icons
import Images from "../../assets/images";

const PDFViewer = ({ fileName = "Verkaufbericht.pdf", delIcon }) => {
  const handleView = () => {
    console.log("Viewing PDF:", fileName);
  };

  const handleDownload = () => {
    console.log("Downloading PDF:", fileName);
  };

  return (
    <div className="flex items-center gap-3 w-full  p-3 bg-white rounded border border-gray-200">
      {/* PDF Icon */}
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center ">
        <img src={Images.pdf} alt="pdf" />
      </div>

      {/* File Name */}
      <span className="flex-grow text-gray-700 truncate">{fileName}</span>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleView}
          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="View PDF"
        >
          <AiOutlineEye className="w-5 h-5 text-secondary" />
        </button>
        {delIcon && <button>{delIcon}</button>}
        <button
          onClick={handleDownload}
          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Download PDF"
        >
          <img src={Images.download} className="w-5 h-5 text-grayText" />
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
