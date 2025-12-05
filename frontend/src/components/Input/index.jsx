import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  type = "text",
  name,
  label,
  onChange,
  value,
  required = false,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        className={`text-white text-[13px] ${isFocused ? "focused" : ""}`}
        htmlFor={name}
      >
        {label} {required && <span className="text-secondary">*</span>}
      </label>
      <div
        className={`relative rounded bg-white ${
          error ? "border-red-500 border" : "border border-white"
        }`}
      >
        <input
          id={name}
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          autoComplete="off"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== "")}
          className="w-full bg-transparent focus:outline-none rounded text-grayText p-2"
        />
        {type === "password" && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-grayText"
            onClick={handleTogglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
