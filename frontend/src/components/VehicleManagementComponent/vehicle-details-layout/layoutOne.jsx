import React from "react";
import { useSelector } from "react-redux";
import MainHeading from "../../Heading/mainHeading";
import Text from "../../Heading/text";
import Images from "../../../assets/images";

function LayoutOne({ content, details }) {
  const { errorMessage, isLoading, singleVehicle } = useSelector(
    (state) => state.vehicle
  );
  const vehicleDetails = singleVehicle?.vehicle || {};

  return (
    <div className="bg-white">
      <img src={Images.detailCar} className="w-full h-[600px] bg-cover" />
      <div className="grid grid-cols-10 gap-4 mt-10  items-start justify-start px-5 py-2 ">
        <div className=" col-span-7 space-y-2 ">
          <MainHeading
            heading="BMW X5M Competition Steptronic Competition"
            textColor="primary"
            textSize="text-2xl"
            fontWeight="font-semibold"
            fontFamily="poppins"
          />
          <Text
            content="From MFK & service / Top equipment / 12-month warranty / AMG performance exhaust system / Trade-in / Leasing possible"
            fontWeight="font-medium"
            textSize="text-normal"
          />
          <Text
            content="Fahrzeuginfomationen"
            textColor="text-secondary"
            fontWeight="font-bold"
          />
          <div className="grid grid-cols-8 gap-y-4 text-gray-800">
            {details?.map((detail, index) => (
              <div key={index} className="col-span-2">
                <p className="font-semibold">
                  {detail?.label}
                  {detail?.required && (
                    <span className="text-secondary">*</span>
                  )}{" "}
                </p>
                <p className={detail?.valueClass || ""}>{detail?.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className=" col-span-3  space-y-3">
          <img
            src={Images.QRCode}
            alt="qr code"
            className=" w-[312px] h-[295px]"
          />
          <div className="px-5">
            <Text
              content="Sale price:"
              textColor="text-primary"
              textSize="text-2xl"
              fontWeight="font-medium"
              className="-mt-4"
            />
            <MainHeading
              heading="59’900 CHF"
              textColor="secondary"
              fontFamily="poppins"
            />
            <p className="border-b border-primary w-9/12 mb-0.5 -mt-2"></p>
            <p className="border-b border-primary w-9/12"></p>
            <Text
              content="New price:"
              textColor="text-primary"
              textSize="text-2xl"
              fontWeight="font-medium"
              className="mt-2"
            />
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <Text
          content="Standard equipment"
          textColor="text-secondary"
          fontWeight="font-bold"
        />
        <Text
          content={content + content}
          textColor="text-black"
          textSize="ttext-[13px]"
        />
        <Text
          content="Optional equipment"
          textColor="text-secondary"
          fontWeight="font-bold"
        />
        <Text
          content={content}
          textColor="text-black"
          textSize="ttext-[13px]"
        />
      </div>
    </div>
  );
}

export default LayoutOne;
