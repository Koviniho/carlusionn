import React from "react";
import Images from "../../assets/images";

const RecentPostCard = () => {
  return (
    <div className="hover:bg-white rounded-lg cursor-pointer hover:shadow-md p-2  flex items-center space-x-4 max-w-sm">
      {/* Image */}
      <img
        className="w-20 h-20 rounded-md object-cover"
        src={Images.cardCar} // Replace with actual image URL
        alt="Car Image"
      />

      {/* Content */}
      <div>
        <h2 className="text-lg font-semibold text-primary">
          2018 Chevrolet Camaro ZL1 1LE: Review
        </h2>
        <p className="text-gray-500 text-sm">On August 22, 2017</p>
      </div>
    </div>
  );
};

export default RecentPostCard;
