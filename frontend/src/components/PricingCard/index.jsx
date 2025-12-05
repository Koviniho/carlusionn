import React from "react";
import MainHeading from "../Heading/mainHeading";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

const PricingCard = ({ bgColor, planName, price, description, features, borderRadius , btnText }) => {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  return (
    <div
      className={`bg-${bgColor} text-white px-14 p-6  ${borderRadius ? borderRadius : 'rounded-lg' } shadow-lg mt-5 flex flex-col `}
    >
      <MainHeading
        heading={planName.toUpperCase()}
        className="font-bebas-neue"
      />
      <p className="text-2xl font-bold mt-4">
        {price}{" "}
        <span className="font-medium">
          {localStorage.getItem("preferredLanguage") == "it"
            ? "/mese"
            : "/month"}
        </span>
      </p>
      <p className="text-2xl mt-2">{description}</p>

      <ul className="mt-4 space-y-2 ">
        {features.map((feature, index) => (
          <li key={index} className="text-[20px] font-medium text-white">
            {feature}
          </li>
        ))}
      </ul>
<div className=" mt-auto pt-8">
      <button
        className={`  mb-5 bg-white font-semibold py-2 px-8 rounded-md hover:bg-gray-100 transition  ${
          bgColor === "primary" ? "text-primary" : bgColor==="darkBlue" ?"text-darkBlue":"text-secondary"} 
        }`}
      >
        
        {btnText ?btnText : t("pricing.ourPricing.startFreeTrial")}
      </button>
      </div>
    </div>
  );
};

export default PricingCard;
