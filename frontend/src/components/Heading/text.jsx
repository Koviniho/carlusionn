/* eslint-disable react/prop-types */

const Text = ({
  textColor = "text-grayText",
  fontWeight = "font-normal",
  textSize = "text-[18px]", // Default text size
  content = "",
  icon,
  iconPosition = "left", // Default position is 'left'
  className = "", // Additional className prop
}) => {
  return (
    <p
      className={`${textColor} ${fontWeight} ${textSize} flex items-center  ${className}`}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {content}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </p>
  );
};

export default Text;
