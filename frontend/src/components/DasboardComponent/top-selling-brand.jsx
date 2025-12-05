import React from "react";
import Text from "../Heading/text";
import Images from "../../assets/images/index";
const TopSellingBrands = () => {
  const salesData = [
    { logo: Images.porscheLogo, name: "BMW", sales: 785 },
    { logo: Images.porscheLogo, name: "BMW", sales: 620 },
    { logo: Images.porscheLogo, name: "BMW", sales: 587 },
    { logo: Images.porscheLogo, name: "BMW", sales: 324 },
    { logo: Images.porscheLogo, name: "BMW", sales: 290 },
    { logo: Images.porscheLogo, name: "BMW", sales: 140 },
    { logo: Images.porscheLogo, name: "BMW", sales: 240 },


  ];

  return (
    <div className="w-full  mx-auto bg-white rounded-lg shadow-lg ">
      <Text
        content="Top Selling Brands"
        fontWeight="font-semibold"
        textColor="darkBlue"
        className="p-6"
      />
      <div className="grid grid-cols-3 gap-4 px-6 pb-4">
        <Text content="Logo" textColor="text-darkBlue" />{" "}
        <Text content="Brands" textColor="text-darkBlue" />{" "}
        <Text content="Sales" textColor="text-darkBlue" />
      </div>

      <div className="space-y-3">
        {salesData.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-3 gap-4 items-center py-1 hover:bg-gray-50 transition-colors px-6
        ${index === 0 ? "border-t" : ""} 
        ${index === salesData.length - 1 ? "" : "border-b"}
      `}
          >
            <img src={item.logo} alt="brand-logo" className=" h-10" />
            <div className="text-darkBlue font-medium">{item.name}</div>
            <div className="flex items-center">
              <span className="inline-block px-3 py-1 rounded-full text-base">
                {item.sales}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingBrands;
