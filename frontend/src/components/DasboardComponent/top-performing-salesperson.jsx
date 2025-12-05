import React from "react";
import Text from "../Heading/text";

const TopPerformanceSalesPersons = () => {
  const salesData = [
    { rank: "1st", name: "Rich Jerry", contributions: 785 },
    { rank: "2nd", name: "Rich Jerry", contributions: 620 },
    { rank: "3rd", name: "Rich Jerry", contributions: 587 },
    { rank: "4th", name: "Rich Jerry", contributions: 324 },
    { rank: "5th", name: "Rich Jerry", contributions: 290 },
  ];

  return (
    <div className="w-full  mx-auto bg-white rounded-lg shadow-xl ">
      <Text
        content="Top Performing Salespersons"
        fontWeight="font-semibold"
        textColor="darkBlue"
        className="p-6"
      />
      <div className="grid grid-cols-3 gap-4 px-6 pb-4">
        <Text
          content="Sr No."
          fontWeight="font-medium"
          textColor="darkBlue"
        />{" "}
        <Text
          content="Contributions"
          fontWeight="font-medium"
          textColor="darkBlue"
        />{" "}
        <Text
          content="Salespersons"
          fontWeight="font-medium"
          textColor="darkBlue"
        />
      </div>

      <div className="space-y-3">
        {salesData.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-3 gap-4 items-center py-3 hover:bg-gray-50 transition-colors px-6
        ${index === 0 ? "border-t" : ""} 
        ${index === salesData.length - 1 ? "" : "border-b"}
      `}
          >
            <div className="text-grayText font-medium">{item.rank}</div>
            <div className="text-darkBlue font-medium">{item.name}</div>
            <div className="flex items-center font-medium">
              <span className="inline-block px-3 py-3 bg-green-50 text-green-600 rounded-full text-sm">
                {item.contributions} Contributions
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformanceSalesPersons;
