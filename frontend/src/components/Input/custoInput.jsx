/* eslint-disable react/prop-types */
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CustomInput = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  className = "",
  options = [],
  required = false,
  placeholder = "",
  paddingY,
  fontWeight,
  border = true,
  rows = "5",
  readOnly,
  ...rest
}) => {
  const [enabled, setEnabled] = useState(value || false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onChange({
        target: {
          name: e.target.name,
          value: e.target.files[0],
        },
      });
    }
  };

  const handleToggleChange = () => {
    setEnabled(!enabled);
    onChange({
      target: {
        name,
        value: !enabled,
      },
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`custom-input-group ${
        type === "checkbox" || type === "toggle"
          ? "flex items-center gap-2"
          : ""
      }`}
    >
      {type === "checkbox" ? (
        <>
          <input
            id={name}
            type={type}
            name={name}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            {...rest}
            className={`cursor-pointer w-4 h-4 appearance-none border border-gray-300 rounded-sm
            checked:bg-primary checked:border-primary ${
              error && touched ? "border-red-500" : "border-gray-300"
            } ${className}`}
          />
          {label && (
            <label
              htmlFor={name}
              className={` "font-bold text-start" ${
                rest.disabled ? "opacity-30 cursor-not-allowed" : ""
              } `}
            >
              <span className="capitalize">{label}</span>
              {required && <span className="text-secondary ml-1">*</span>}
            </label>
          )}
        </>
      ) : type === "toggle" ? (
        <div
          className={`${
            paddingY ? paddingY : ""
          } flex justify-between items-center w-full`}
        >
          {label && (
            <label
              htmlFor={name}
              className={`${
                fontWeight ? fontWeight : "font-medium"
              }  text-start mr-2 flex-grow`}
            >
              {label}
              {required && <span className="text-secondary ml-1">*</span>}
            </label>
          )}
          <Switch
            checked={enabled}
            onChange={handleToggleChange}
            {...rest}
            className={`group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent outline-none ${
              enabled ? "bg-secondary" : "bg-gray-200"
            } transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                enabled ? "translate-x-5" : ""
              }`}
            />
          </Switch>
        </div>
      ) : (
        <>
          {label && (
            <label htmlFor={name} className="block font-medium mb-1 text-start">
              <span className={`${fontWeight?fontWeight:"font-[600]" }  capitalize`}>{label}</span>
              {required && <span className="text-secondary ml-1">*</span>}
            </label>
          )}
          {type === "file" ? (
            <input
              id={name}
              type={type}
              name={name}
              onChange={handleFileChange}
              onBlur={onBlur}
              required={required}
              className={`w-full p-2 border text-black outline-none rounded-md ${
                error && touched ? "border-red-500" : "border-gray-300"
              } ${className}`}
            />
          ) : type === "select" ? (
            <div className="relative">
              <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full p-2 pr-8 ${paddingY} border text-sm  rounded-md outline-none text-black ${
                  error && touched ? "border-red-500" : "border-gray-300"
                } appearance-none`}
              >
                {options?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
              {/* Custom dropdown icon */}
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 7l5 5 5-5"
                  />
                </svg>
              </div>
            </div>
          ) : type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              required={required}
              className={`w-full p-2 border rounded-md resize-none outline-none text-black placeholder:text-sm ${
                error && touched ? "border-red-500" : "border-gray-300"
              } ${className}`}
              rows={rows} // Default rows for textarea
            />
          ) : (
            <div className="relative">
              <input
                id={name}
                type={showPassword && type === "password" ? "text" : type}
                name={name}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                onBlur={onBlur}
                placeholder={placeholder}
                required={required}
                
                border={border}
                className={`w-full p-2 ${paddingY} ${
                  border ? "border" : "border-none"
                } text-darkBlue text-sm outline-none placeholder:text-sm rounded-md ${
                  error && touched ? "border-red-500" : "border-gray-300"
                } ${className}`}
              />
              {type === "password" && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 "
                  onClick={handlePasswordToggle}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              )}
            </div>
          )}
        </>
      )}
      {error && touched && (
        <p className="text-red-500 text-sm mt-1 text-start">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
