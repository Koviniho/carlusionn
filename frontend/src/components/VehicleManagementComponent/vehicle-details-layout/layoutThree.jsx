/* eslint-disable react/prop-types */
import React from "react";
import Images from "../../../assets/images";
import MainHeading from "../../Heading/mainHeading";
import Text from "../../Heading/text";
import CarSlider from "../../CarDetailsComponent/CarSlider";
import ContractSlider from "../../templateComponents/templateContracts/contractSlider";

function LayoutThree({ details, content, dashBoard,myImages }) {

  return (
    <div className="bg-white">
      <div className="grid grid-cols-12 gap-4  ">
        <div className="col-span-8 p-4">
          <div className="">
            <MainHeading
              heading="BMW X5M Competition Steptronic Competition"
              textColor="text-primary"
              textSize="text-2xl"
              fontFamily="popins"
              fontWeight="font-semibold"
            />

            <Text
              content="Ab 799.- pro Monat ohne Anzahlung* Adaptiver Tempomat* Harman&Kardon* Laserlicht* 360°Kamera* Head-Up Display*"
              textSize="text-[8px]"
            />
           {!dashBoard &&( <Text
              content="Fahrzeuginfomationen"
              textColor="text-secondary"
              fontWeight="font-bold"
              className="my-10"
            />)}
            <div className={`grid grid-cols-9 gap-y-4 text-gray-800 ${dashBoard? "pt-4":""}`}>
              {details?.map((detail, index) => (
                <div key={index} className={`${dashBoard?"text-[10px]":""} col-span-3`}>
                  <p className={`font-semibold  `}>
                    {detail?.label}
                    {detail?.required && (
                      <span className="text-secondary">*</span>
                    )}{" "}
                  </p>
                  <p className={detail?.valueClass || `${dashBoard?"font-normal text-[8px] ":""}`}>{detail?.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smaller section */}
        <div className="col-span-4  pr-4 space-y-4  py-4">
        {dashBoard ? null:(  <img
            src={Images.icnLogo}
            className="w-[279px] mx-2 "
            alt="logo"
          />
        )}
          {dashBoard ? (
            <div className="">
            <ContractSlider dashBoard={dashBoard} myImages={myImages} />
            </div>
          ) : (
            <img
              src={Images.QRCode}
              alt="qr code"
              className=" w-[312px] h-[295px]  border border-lightGray"
            />
          )}{" "}
        </div>
      </div>
      <div className="px-4 pb-4 space-y-2">
        <Text
          content="Standard equipment"
          textColor="text-darkBlue"
          fontWeight="font-semibold"
        />
        <Text
          content={content + content}
          textColor="text-black"
          textSize="text-[8px]"
           fontWeight="font-medium"
        />
        <Text
          content="Optional equipment"
          textColor="text-darkBlue"
          fontWeight="font-semibold"
        />
        <div className="grid grid-cols-12 gap-4">
          <div className={` ${dashBoard?"col-span-12":"col-span-9"}`}>
            <Text
              content={content}
              textColor="text-black"
              textSize="text-[8px]"
            />
          </div>
          <div className={`col-span-3  space-y-1 ${dashBoard?"hidden":""}`}>
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
            <div className="w-[312px]  ml-5">
              <p className="border-b border-primary  -my-1"></p>
              <p className="border-b border-primary  "></p>
            </div>
          </div>
        </div>
        <img src={Images.detailCar} className={`w-full h-[511px] bg-cover ${dashBoard?"hidden":""}`} />
      </div>
    </div>
  );
}

export default LayoutThree;
