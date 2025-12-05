import React from "react";

const CloseSvg = ({
  className,
  height = "1.2rem",
  width = "1.2rem",
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
      />
    </svg>
  );
};
export default CloseSvg;
