import React from "react";
import Images from "../../../assets/images";
import MainHeading from "../../Heading/mainHeading";
import Text from "../../Heading/text";

function LayoutTwo({ details, content }) {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-12 gap-4  ">
        <div className="col-span-8 p-4">
          <img src={Images.icnLogo} alt="logo" />
          <div className="my-4">
            <MainHeading
              heading="BMW X5M Competition Steptronic Competition"
              textColor="text-primary"
              textSize="text-2xl"
              fontFamily="popins"
              fontWeight="font-semibold"
            />

            <Text
              content="From MFK & service / Top equipment / 12-month warranty / AMG
          performance exhaust system / Trade-in / Leasing possible"
              textSize="text-normal"
            />
            <Text
              content="Fahrzeuginfomationen"
              textColor="text-secondary"
              fontWeight="font-bold"
              className="my-10"
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
        </div>

        {/* Smaller section */}
        <div className="col-span-4  p-4">
          <img src={Images.detailCar} className="w-full h-[333px] bg-cover" />
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
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9">
            <Text
              content={content}
              textColor="text-black"
              textSize="ttext-[13px]"
            />
          </div>
          <div className=" col-span-3  space-y-1">
            <div className="px-5">
              <Text
                content="Sale price:"
                textColor="text-primary"
                textSize="text-2xl"
                fontWeight="font-medium"
              />
              <MainHeading
                heading="59’900 CHF"
                textColor="secondary"
                fontFamily="poppins"
              />
            </div>
            <div className="w-[312px]">
              <p className="border-b border-primary w-[90%] ml-4 my-1"></p>
              <p className="border-b border-primary w-[90%] ml-4 "></p>
              <img
                src={Images.QRCode}
                alt="qr code"
                className=" w-full  h-[295px]"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutTwo;
