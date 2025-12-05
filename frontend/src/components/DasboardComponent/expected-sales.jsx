/* eslint-disable react/prop-types */

import Text from "../Heading/text";
import { GiSandsOfTime } from "react-icons/gi";

import { MdAccessTimeFilled } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";

function ExpectedSales() {
  const metrics = [
    {
      title: "Total Sales",
      value: "$90,209",
      icon: GiSandsOfTime,
      color: { bg: "green", textColor: "text-[#0D9960]" },
    },
    {
      title: "Sales Today",
      value: "$34,732",
      icon: FaFile,
      color: { bg: "orange", textColor: "text-[#F48550]" },
    },
    {
      title: "Total Profit",
      value: "$120",
      icon: FaWrench,
      color: { bg: "blue", textColor: "text-[#05779D]" },
    },
    {
      title: "Total Loss",
      value: "34",
      icon: MdAccessTimeFilled,
      color: { bg: "purple", textColor: "text-[#8D1BB5]" },
    },
  ];

  return (
    <div className="rounded-lg shadow-lg bg-white p-5 border border-gray-100 my-8">
      <Text content="Expected sales" textColor="text-darkBlue" fontWeight="font-semibold" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {metrics.map((metric, index) => (
          <ExpectedCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpectedSales;

const ExpectedCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    green: "text-[#0D9960] bg-green-100",
    orange: "text-[#F48550] bg-orange-100",
    blue: "text-[#05779D] bg-blue-100",
    purple: "text-[#8D1BB5] bg-purple-100",
  };

  // Determine the border color based on the color.textColor
  const borderColorClass =
    color.textColor === "text-[#0D9960]"
      ? "border-[#0D9960]"
      : color.textColor === "text-[#F48550]"
      ? "border-[#F48550]"
      : color.textColor === "text-[#05779D]"
      ? "border-[#05779D]"
      : "border-[#8D1BB5]";

  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-sm border ${borderColorClass}`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          {/* Apply border to <p> tag for value */}

          <Text
            content={value}
            fontWeight="font-semibold"
            textColor={`${color.textColor}`}
           
          />
          <Text
            content={title}
            fontWeight="font-medium"
            textSize="text-[14px]"
            textColor={`${color.textColor}`}
          />
        </div>
        <div
          className={`p-3 rounded-full flex items-center justify-center h-[48px] w-[48px] ${
            colorClasses[color.bg]
          }`}
        >
          <Icon className={`w-[28px] h-[28px] ${color.textColor}`} />
        </div>
      </div>
    </div>
  );
};
