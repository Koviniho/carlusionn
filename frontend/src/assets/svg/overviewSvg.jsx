import React from "react";

const OverviewSvg = ({ hoverColor = "#000", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    viewBox="0 0 24 24"
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    style={{
      transition: "stroke 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.stroke = hoverColor)}
    onMouseLeave={(e) => (e.currentTarget.style.stroke = "currentColor")}
  >
    <path d="M18.5 21a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9ZM10 7h4M1.5 14.5S5.5 5 6 4s1.5-1 2-1s2 0 2 2v11m-4.5 5a4.5 4.5 0 1 1 0-9a4.5 4.5 0 0 1 0 9Zm17-6.5S18.5 5 18 4s-1.5-1-2-1s-2 0-2 2v11m-4 0h4" />
  </svg>
);

export default OverviewSvg;
