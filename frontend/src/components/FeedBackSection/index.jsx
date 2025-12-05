import React from "react";
import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import Images from "../../assets/images";
import FeedBackCard from "../FeedBackCard";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

const CustomerFeedback = () => {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  return (
    <>
      <div className="bg-darkBlue py-16 h-[400px]">
        {/* Title Section */}
        <div className="text-center text-white mb-12 flex flex-col items-center justify-center">
          <MainHeading heading={t("product.customerFeedback.heading")} />
          <Text
            content={t("product.customerFeedback.content")}
            textColor="white"
          />
        </div>

        {/* Feedback Cards */}
      </div>
      <div className="relative z-50 -mt-36">
        <div className="flex justify-center space-x-8 px-4">
          {[1, 2].map((_, index) => (
            <FeedBackCard key={index} />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="my-12 flex justify-center items-center space-x-4">
          <button className="!w-10 h-10 border bg-white hover:bg-darkBlue text-lg text-black hover:text-white  rounded flex items-center justify-center  transition">
          {"<"}
          </button>
          <button className="!w-10 h-10 border bg-white hover:bg-darkBlue text-lg text-black hover:text-white  rounded flex items-center justify-center  transition">
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerFeedback;
