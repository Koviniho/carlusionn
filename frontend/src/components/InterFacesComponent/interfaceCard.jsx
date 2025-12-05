/* eslint-disable react/prop-types */

import Icons from "../../assets/icons";
import Images from "../../assets/images";

const InterfaceCard = ({ title, icon,width }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between ${width} gap-4 `}>
      <div className="flex items-center justify-between gap-2 w-full">
        <h3 className="text-base font-medium text-darkBlue text-left">
          {title}
        </h3>
        <div className="rounded-full bg-[#1E599B33] h-12 w-12 flex items-center justify-center text-primary flex-shrink-0 ">
          {icon}
        </div>
      </div>
      <div className="flex justify-start gap-3 mt-4 self-start">
        <Icons.FiEdit className="text-darkBlue hover:text-gray-800 cursor-pointer" />
        <img src={Images.bin} className="w-4 h-4" />
        <Icons.IoEyeOutline size={18} className="text-secondary " />
      </div>
    </div>
  );
};
export default InterfaceCard;
