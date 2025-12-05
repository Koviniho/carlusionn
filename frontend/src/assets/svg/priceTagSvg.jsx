import React from "react";

const PriceTagSvg = ({ width = "2em", height = "2em", color = "#19DB8C" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 21 21"
    aria-labelledby="priceTagIconTitle"
  >
    <title id="priceTagIconTitle">Price Tag Icon</title>
    <g fill="none" fillRule="evenodd" transform="translate(1 3)">
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.914.5H15.5a2 2 0 0 1 2 2v3.586a1 1 0 0 1-.293.707l-6.793 6.793a2 2 0 0 1-2.828 0l-3.172-3.172a2 2 0 0 1 0-2.828L11.207.793A1 1 0 0 1 11.914.5"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7.5 13.5l-2.013 1.006A2 2 0 0 1 2.72 13.42L1.105 9.114a2 2 0 0 1 .901-2.45L9.5 2.5"
      />
      <rect width="2" height="2" x="14" y="2" fill={color} rx="1" />
    </g>
  </svg>
);

export default PriceTagSvg;
