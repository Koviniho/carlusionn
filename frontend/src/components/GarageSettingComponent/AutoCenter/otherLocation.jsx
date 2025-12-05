import React from "react";
import { MdEdit, MdOutlineLocalTaxi } from "react-icons/md";
import Text from "../../Heading/text";
import MainHeading from "../../Heading/mainHeading";
import { CiLocationOn } from "react-icons/ci";
import Images from "../../../assets/images";
function OtherLocation() {
  return (
    <div className="border my-3 border-lightGray rounded-md bg-white w-full">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-lightGray px-4 py-2">
        <Text
          content="Other Locations"
          textColor="text-darkBlue"
          fontWeight="font-semibold"
        />
      </div>

      {/* Locations List */}
      <div className="grid grid-cols-4 p-4 gap-2">
        {["", "", "", ""].map((location, index) => (
          <div
            key={index}
            className="flex flex-col gap-5   shadow-md bg-gray-100 p-2 rounded-[10px] relative"
          >
            <img
              src={Images.login}
              alt="location image"
              className="w-full h-[159px] rounded-md object-cover"
            />
            <div>
              <Text
                content={"Sale"}
                textSize="text-sm"
                fontWeight="font-semibold"
                textColor="text-primary"
                fontFamily="poppins"
              />
              <Text
                content={"Autocenter Zollikofen"}
                textSize="text-normal"
                textColor="text-darkBlue"
                className="capitalize"
                fontWeight="font-semibold"
              />
              <Text
                icon={<CiLocationOn size={16} />}
                content={"18-11 Sutphin Blvd Jamaica, NY 11434"}
                textSize="text-[10px]"
                className="capitalize"
                fontWeight="font-thin"
              />
              <Text
                icon={<MdOutlineLocalTaxi size={16} />}
                content={"230"}
                textSize="text-[10px]"
                className="capitalize my-2"
                fontWeight="font-thin"
              />
            </div>
           {index===0 && (  <div className="bg-green-700 absolute right-0 top-0 px-4 py-1 text-xs rounded-tr-[10px] text-white">Current</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OtherLocation;
