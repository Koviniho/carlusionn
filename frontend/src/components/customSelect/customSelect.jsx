/* eslint-disable react/prop-types */
import Icons from "../../assets/icons";

const CustomSelect = ({
  // label = "Select",
  options = [],
  defaultValue,
  name = "select",
  onChange,
  borderColor = "border-black",
  backgroundColor = "bg-white",
  textColor = "text-DarkBlue",
  icon,
  label,
  borderRadius="rounded",
  value,
  fontSize="text-base"
}) => {
  return (
    <div className="relative  ">
        { label && (
                 <div className=" text-darkBlue mb-1">
               
                   {label}
                 </div>
               )}
      <div className={`relative border ${borderColor}  ${borderRadius}`}>
        {/* Icon positioned inside the select field */}
        {icon  && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
            {icon}
          
          </div>
        )}
        <select
          id={name}
          name={name}
          value={value}
          defaultValue={defaultValue || (options.length > 0 ? options[0] : "")}
          onChange={onChange}
          className={`w-full appearance-none rounded ${backgroundColor} py-2 ${
            icon ? " pl-8" : "pl-4"
          } pr-10 text-sm ${textColor} font-medium outline-none    sm:${fontSize}`}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>

        {/* Downward arrow inside the field */}
        <Icons.IoIosArrowDown
          aria-hidden="true"
          className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none size-5 ${textColor} sm:size-4`}
        />
      </div>
    </div>
  );
};

export default CustomSelect;
