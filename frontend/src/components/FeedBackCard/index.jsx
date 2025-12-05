import React from "react";
import Images from "../../assets/images";

function FeedBackCard() {
  return (
    <div>
      {" "}
      <div className="relative bg-white text-gray-800 p-8 rounded-lg shadow-xl max-w-[500px] w-full flex flex-col ">
        {/* User Image */}
        <div className="absolute -top-14 left-24 transform -translate-x-1/2">
          <img
            className="w-[126px] h-[126px] rounded-2xl border border-secondary object-cover"
            src={Images.girlPhoto}
            alt="User"
          />
        </div>

        {/* Card Content */}
        <div className="mt-16 text-start ">
          <h3 className="text-lg font-semibold">James William</h3>
          <p className="text-sm text-gray-600 mt-1">
            Quality Assurance Manager
          </p>
          <p className="text-sm text-gray-600 ">
            A dedicated professional responsible for ensuring that products and
            services meet the highest quality standards, overseeing testing
            processes, and implementing
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeedBackCard;
