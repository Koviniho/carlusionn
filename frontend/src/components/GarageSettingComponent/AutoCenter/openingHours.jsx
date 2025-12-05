import React from "react";
import { MdEdit } from "react-icons/md";
import Text from "../../Heading/text";

function OpeningHours() {
  const openingHoursData = [
    {
      day: "Monday",
      timings: ["07.30 - 12.00", "13.30 - 18.30"],
      isOpen: true,
    },
    {
      day: "Tuesday",
      timings: ["07.30 - 12.00", "13.30 - 18.30"],
      isOpen: true,
    },
    {
      day: "Wednesday",
      timings: ["Closed"],
      isOpen: false,
    },
    {
      day: "Thursday",
      timings: ["07.30 - 12.00", "13.30 - 18.30"],
      isOpen: true,
    },
    {
      day: "Friday",
      timings: ["07.30 - 12.00", "13.30 - 18.30"],
      isOpen: true,
    },
    {
      day: "Saturday",
      timings: ["07.30 - 12.00"],
      isOpen: true,
    },
    {
      day: "Sunday",
      timings: ["Closed"],
      isOpen: false,
    },
  ];

  return (
    <div className="border my-3 border-lightGray rounded-md bg-white w-full pb-4">
      {/* Header */}
      <div className="flex items-center justify-start gap-2 border-b border-lightGray px-4 py-2">
        <Text
          content="Opening Hours"
          textColor="text-darkBlue"
          fontWeight="font-semibold"
          textSize="text-xl"
        />
        <MdEdit className="text-secondary cursor-pointer" size={20} />
      </div>

      {/* Table */}
      <div className="">
        <div className="grid grid-cols-3 gap-4 text-left font-semibold text-white px-4 py-2 bg-primary">
          <div>Days</div>
          <div>Timings</div>
          <div>Availability</div>
        </div>
        {openingHoursData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 p-4 gap-4 py-2 items-center"
          >
            {/* Day */}
            <div className="font-medium text-sm text-black">{item.day}</div>

            {/* Timings */}
            <div>
              {item.timings.map((time, idx) => (
                <div
                  key={idx}
                  className={`text-sm ${
                    time === "Closed" ? "text-error" : "text-grayText"
                  }`}
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="">
              <div
                className={`w-12  border-red-400 h-5 flex items-center rounded-full  cursor-pointer ${
                  item.isOpen ? "bg-secondary" : "bg-red-500"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    item.isOpen ? "translate-x-[30px]" : "translate-x-[2px]"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpeningHours;
