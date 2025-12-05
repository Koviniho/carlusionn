/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Text from "../Heading/text";

import "react-photo-view/dist/react-photo-view.css";
import VehicleDetailGraph from "../VehicleManagementComponent/vehicleDetailGraph";
import { FaAngleDown } from "react-icons/fa6";
import DetailsRightSide from "../VehicleManagementComponent/detailsRightSide";
import Button from "../Button";
import { IoIosArrowDown } from "react-icons/io";

import Breadcrumb from "../Breadcrumb";
import { getSingleVehicle } from "../../store/features/vehicle/vehicleSlice";
import MainHeading from "../Heading/mainHeading";
import Icons from "../../assets/icons";
import Images from "../../assets/images";
import Modal from "../modal/modal";
import VehicleAssessment from "./vehicleAssessment";
import PriceBreakdown from "./priceBreakDown";
import ChartThree from "../Charts/ChartThree";
import ChartFour from "../Charts/ChartFour";
const VehicleAssessmentDetail = () => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(true);
  const [showTechnicalInfo, setShowTechnicalInfo] = useState(true);
  const [infoFirst, setInfoFirst] = useState(true);
  const [infoSecond, setInfoSecond] = useState(true);
  const [infoThird, setInfoThird] = useState(true);

  const { id } = useParams();
  const { singleVehicle } = useSelector((state) => state.vehicle);
  const vehicleDetails = singleVehicle?.vehicle || {};

  useEffect(() => {
    dispatch(getSingleVehicle(id));
  }, [id]);
  const details = [
    { label: "Brand", value: vehicleDetails?.brand || "-" },
    { label: "Model", value: vehicleDetails?.model || "-" },
    { label: "First registration.", value: "03.2019" || "-" },
    { label: "Typengenehmigung ", value: "BB7D94" || "-" },
    { label: "Version", value: "Mansory" || "-" },
    { label: "Body type", value: "Limousine" || "-" },
    { label: "Kilometer", value: "90’000 Km" || "-" },
    { label: "Fahrgestellnummer", value: "CHI-F4354-43BL-2JA8" || "-" },
    { label: "Drive system *", value: "Front-wheel drive" || "-" },
    { label: "Transmission", value: "Automatic transmission" || "-" },
    { label: "PS", value: "249 Ps" || "-" },
    { label: "KW ", value: "490 kw" || "-" },
    { label: "Stammnummer", value: "CHI-BF94-43BL-2JA8" || "-" },
    { label: "Vehicle color", value: "Black" || "-" },
    { label: "Interior color", value: "Black" || "-" },
    { label: "New price", value: "80’000 CHF" || "-" },
    { label: "Warranty", value: "California" || "-" },
    { label: "Letzer MFK", value: "20.12.2024" || "-" },
    { label: "Number of gears", value: "$20,000" || "-" },
    { label: "Displacement (cm3) ", value: "4050 cm" || "-" },
    { label: "Seats", value: "5" || "-" },
    { label: "Doors", value: "5" || "-" },

    { label: "Vehicle condition", value: "California" || "-" },
  ];
  const infoDetailsOne = [
    { label: "Fuel", value: "Petrol" || "-" },
    { label: "Energy chain (kg)", value: "2012" || "-" },
    { label: "Emission standard * (mm)", value: "F" || "-" },
    { label: "Standard equipment", value: "View optional equipment" || "-" },
    { label: "Optional equipment", value: "View standard equipment" || "-" },
  ];
  const infoDetailsSecond = [
    { label: "Curb weight (kg)", value: "2012" || "-" },
    { label: "Payload (kg)", value: "2012" || "-" },
    { label: "Wheelbase (mm)", value: "2012" || "-" },
    { label: "Length (mm)", value: "2012" || "-" },
    { label: "Height (mm)", value: "2012" || "-" },
    { label: "Width (mm)", value: "2012" || "-" },
  ];
  const infoDetailsThird = [
    { label: "Damaged vehicle", value: "NO" || "-" },
    { label: "Accessible for disabled persons", value: "NO" || "-" },
    { label: "Direct parallel import", value: "NO" || "-" },
    { label: "Race car", value: "NO" || "-" },
    { label: "Tuning", value: "NO" || "-" },

    { label: "Extras", value: "8-tire set" || "-" },
  ];
  //////////////////// rate the car Modal//////////////
  const [showRateCar, setShowRateCar] = useState(false);
  const [formData, setFormData] = useState({
    car: "",
    kilometer: "",
    fuelType: "",
    registration: "",
    verification: "",
    lastMOT: "",
    optionalEquipment: [],
    detailData: [],
    storagePackage: "",
    demageDetails: "",
    smokingVehicles: "",
    exteriorCondition: "",
    priceDetails: "",
    technicalCondition: [],
    serviceData: "",
    lastInspection: "",
    maintenanceNotes: "",
    wearDetails: "",
    images: [],
    interiorImages: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch("https://your-api-endpoint.com/submit", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const result = await response.json();
      console.log("Success:", formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Vehicles Management" />
      <div className="mt-4 mb-2 w-full">
        <button
          // onClick={handleButtonClick}
          style={{
            backgroundImage: ` url(${Images.vehiclecheckimage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className=" w-full  text-white rounded-[10px] cursor-pointer w"
        >
          <div className="py-24 flex flex-col items-center justify-center gap-4 ">
            <img src={Images.loginLogo} alt="" className="object-cover " />
            <p className="font-medium text-lg">
              Welcome back! Continue checking vehicles?
            </p>
          </div>
        </button>
      </div>

      <div className="mt-8">
        <div className=" mb-20">
          <MainHeading
            className="font-poppins"
            textColor="darkBlue"
            textSize="text-[30px]"
            fontWeight="font-semibold"
            // heading={vehicleDetails?.brand + " " + vehicleDetails?.model || "-"}
            heading={"BMW X5 XDrive M50d"}
          />
        </div>
        <div className="flex items-center  justify-between border px-4">
          <div className="space-y-20 ">
            <div>
              <MainHeading
                className="font-poppins"
                textColor="darkBlue"
                textSize="text-[24px]"
                fontWeight="font-semibold"
                // heading={vehicleDetails?.brand + " " + vehicleDetails?.model || "-"}
                heading={"Financial Breakdown"}
              />
              <Text
                content={"Detailed pricing analysis for your vehicle inventory"}
                textColor="text-grayText"
                fontWeight="font-medium"
                textSize="text-base"
              />
            </div>
            <MainHeading
              className="font-poppins"
              textColor="darkBlue"
              textSize="text-[24px]"
              fontWeight="font-medium"
              // heading={vehicleDetails?.brand + " " + vehicleDetails?.model || "-"}
              heading={"BMW X5 XDrive M50d #CH32420"}
            />
          </div>
          <img src={Images.checkCar} alt="" className="" />
        </div>
        <PriceBreakdown />
        <div className="grid grid-cols-10 gap-4 mt-10  items-start justify-start  ">
          <div className=" col-span-7 space-y-5 ">
            <div className="bg-white p-5 flex items-center pb-2 border rounded">
              <div className=" w-full ">
                <VehicleDetailGraph color="#1E599B" />
              </div>
            </div>
          </div>
          <div className="col-span-3 rounded font-semibold space-y-2 border h-full flex flex-col items-center justify-center">
            {/* <DetailsRightSide /> */}

            <div>
              <p className="text-lg ">Sale price</p>
              <p className=" text-[32px] text-primary "> 59’900 CHF</p>
            </div>
            <div>
              <p className=" text-lg">Purchase price</p>
              <p className=" text-[32px] text-error "> 59’900 CHF</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 my-10">
          <div className="w-6/12">
            <ChartThree assessment={true} />
          </div>
          <div className="w-6/12">
            <ChartFour assessment={true} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap pt-5 border px-4 rounded">
            <div className="flex items-start w-full mb-5  gap-3 sm:gap-5">
              <div className=" w-full">
                <Text
                  content={"Dealer Selling Price (B2B)"}
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                />
                <Text
                  content={"Average price dealers ask for this model"}
                  textColor="text-[#6B7280]"
                  textSize="text-[12px]"
                />
                <h1 className="text-3xl font-semibold">52,300 CHF</h1>
              </div>
              <div className="relative text-left w-full    flex items-center justify-end">
                <span className="bg-red-100 text-red-500 py-1 px-3 rounded-[21px] font-medium text-[10px]">
                  {" "}
                  2.3% ↓
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap pt-5 border px-4 rounded">
            <div className="flex items-start w-full mb-5  gap-3 sm:gap-5">
              <div className=" w-full">
                <Text
                  content={"Private Sale Price (B2C)"}
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                />
                <Text
                  content={"Average price for private sales"}
                  textColor="text-[#6B7280]"
                  textSize="text-[12px]"
                />
                <h1 className="text-3xl font-semibold">48,100 CHF</h1>
              </div>
              <div className="relative text-left w-full    flex items-center justify-end">
                <span className="bg-[#F0FFF7] text-[#338246] py-1 px-3 rounded-[21px] font-medium text-[10px]">
                  {" "}
                  10.3% ↑
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded mt-5">
          <div className="flex items-center gap-4 border-b p-4">
            <Text
              content="Vehicle Information"
              textColor="text-darkBlue"
              fontWeight="font-semibold"
            />
            <Icons.FaChevronDown
              className={`cursor-pointer text-darkBlue transition-transform duration-300 ${
                showDetails ? "" : "rotate-180"
              }`}
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>

          <div
            className={`overflow-hidden  transition-all duration-500 ease-in-out ${
              showDetails ? "max-h-full opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {" "}
            <div className="flex items-start border-b ">
              <div className="grid grid-cols-8  p-4 gap-4 w-full">
                {details?.map((detail, index) => (
                  <div key={index} className="col-span-2">
                    <p className="font-medium text-darkBlue">{detail?.label}</p>
                    <p className={`font-normal text-grayText`}>
                      {detail?.value}
                    </p>
                  </div>
                ))}
              </div>
              <img src={Images.checkCar} alt="" className="p-4" />
            </div>
            {/* <div>
              <ExpandableSection
                title="Vehicle Information"
                details={infoDetailsOne}
                isOpen={infoFirst}
                toggleOpen={() => setInfoFirst(!infoFirst)}
              />
              <ExpandableSection
                title="Vehicle Information"
                details={infoDetailsSecond}
                isOpen={infoSecond}
                toggleOpen={() => setInfoSecond(!infoSecond)}
              />
              <ExpandableSection
                title="Vehicle Information"
                details={infoDetailsThird}
                isOpen={infoThird}
                toggleOpen={() => setInfoThird(!infoThird)}
              />
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-2 w-full gap-4">
          {["", "", "", ""]?.map((detail, index) => (
            <img
              src={Images.vehicleInfo}
              key={index}
              alt=""
              className="w-full"
            />
          ))}
        </div>
      </div>
      {/* <VehicleAssessment /> */}
    </>
  );
};

export default VehicleAssessmentDetail;

const ExpandableSection = ({ title, details, isOpen, toggleOpen }) => {
  return (
    <div className="border-b pb-4">
      <div className="flex items-center p-4 gap-4 ">
        <Text
          content={title}
          textColor="text-DarkBlue"
          fontWeight="font-semibold"
        />
        <FaAngleDown
          className={`cursor-pointer text-grayText transition-transform duration-300 ${
            isOpen ? "" : "rotate-180"
          }`}
          onClick={toggleOpen}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-8 gap-3 px-4 text-gray-800">
          {details?.map((detail, index) => (
            <div key={index} className="col-span-2">
              <p className="font-semibold text-darkBlue">{detail?.label}</p>
              <p className={`text-grayText`}>{detail?.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
