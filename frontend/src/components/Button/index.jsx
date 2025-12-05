/* eslint-disable react/prop-types */

import { FaSpinner } from "react-icons/fa";
function Button({
  type = "submit",
  text,
  bgColor = "primary",
  borderColor = "transparent",
  borderRadius = "rounded-full",
  padding = "px-6 py-2",
  onClick,
  icon,
  iconPosition = "left",
  isLoading = false,
  loadingText = "Loading...",
  textColor = "secondary",
  className,
  disabled = isLoading,
  fontSize = "text-[16px]",
}) {
  const resolveTextColor = () =>
    textColor == "grayText"
      ? "text-grayText"
      : textColor == "primary"
      ? "text-primary"
      : textColor == "secondary"
      ? "text-secondary"
      : `text-${textColor}`;

  const resolveBgColor = () =>
    bgColor == "primary"
      ? "bg-primary"
      : bgColor == "secondary"
      ? "bg-secondary"
      : bgColor == "grayText"
      ? "bg-grayText"
      : `bg-${bgColor}`;

  const resolveHoverColor = () =>
    bgColor == "primary"
      ? "hover:text-primary hover:border-primary hover:bg-white"
      : bgColor == "secondary"
      ? "hover:text-secondary hover:border-secondary"
      : bgColor == "darkBlue"
      ? "hover:text-darkBlue hover:border-darkBlue"
      : bgColor == "grayText"
      ? "hover:text-grayText hover:border-grayText"
      : bgColor == "white"
      ? `hover:text-primary  hover:border-primary`
      : bgColor == "white"
      ? `hover:text-primary  hover:border-primary`
      : `hover:text-${bgColor} hover:border-${bgColor}`;

  return (
    <button
      type={type}
      className={`flex items-center justify-center font-medium ${fontSize} transition-all duration-300 border-2
        ${padding}
        ${resolveBgColor()}
        border-${borderColor}
        ${borderRadius}
        hover:bg-transparent
        ${resolveHoverColor()} 
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${resolveTextColor()} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {!isLoading && icon && iconPosition == "left" && (
        <span className={`${text ? "mr-2" : "mr-0 "}`}>{icon}</span>
      )}

      {isLoading ? (
        <>
          <FaSpinner className="animate-spin mr-2" />
          {loadingText}
        </>
      ) : text ? (
        text
      ) : null}

      {!isLoading && icon && iconPosition == "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}

export default Button;
