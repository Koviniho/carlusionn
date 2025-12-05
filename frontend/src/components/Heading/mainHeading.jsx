/* eslint-disable react/prop-types */


function MainHeading({
  heading,
  textSize = "text-[56px]",
  fontWeight = "font-normal",
  fontFamily = "bebas-neue", // Default font family
  className = "",
  textColor = "white",
  lineHeight,
  bgColor
}) {
  return (
    <h1
      className={`${textSize} ${fontWeight} ${fontFamily} ${className} bg-${bgColor}  text-${textColor} font-${fontFamily} ${lineHeight? lineHeight:""}  `}
    >
      {heading}
    </h1>
  );
}

export default MainHeading;
