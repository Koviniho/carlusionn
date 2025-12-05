import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import MainHeading from "../../../components/Heading/mainHeading";
import GoBack from "../../../components/GoBack";
import Images from "../../../assets/images";
import { getSingleVehicle } from "../../../store/features/vehicle/vehicleSlice";
import { useParams } from "react-router-dom";
import Text from "../../../components/Heading/text";
import Button from "../../../components/Button";
import { IoIosArrowDown } from "react-icons/io";
import LayoutOne from "../../../components/VehicleManagementComponent/vehicle-details-layout/layoutOne";
import LayoutTwo from "../../../components/VehicleManagementComponent/vehicle-details-layout/layoutTwo";
import LayoutThree from "../../../components/VehicleManagementComponent/vehicle-details-layout/layoutThree.jsx";

const content =
  "Acoustic glass | Electric detachable towbar | BMW Night Vision with pedestrian detection | Bowers & Wilkins sound system | Display key | Driving Assistant Professional | Luggage compartment package | Individual high-gloss shadow line roof rails | Integrated universal remote controlLaser headlights | M Driver's Package | Panorama glass roof Sky Lounge | Wheels: Tire repair kit (Tire Fit) | Seats: Front and rear seat heatingSeats: Ventilated front seats | Soft-close automatic for doors | Sun protection glazing | Front seats with massage functionHeating comfort package for the front | Armrests in the front center console heated | Armrests in the front doors, heated | Steering wheel heating";

function VehicleDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { errorMessage, isLoading, singleVehicle } = useSelector(
    (state) => state.vehicle
  );
  const vehicleDetails = singleVehicle?.vehicle || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("Layout 1");

  const handleButtonClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLayoutSelect = (layout) => {
    setSelectedLayout(layout);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    dispatch(getSingleVehicle(id));
  }, [id]);
  const details = [
    { label: "Marke", value: vehicleDetails?.brand || "-" },
    { label: "Model", value: vehicleDetails?.model || "-" },
    { label: "First registration.", value: "03.2019" || "-" },
    { label: "Last vehicle inspection ", value: "20.12.2024" || "-" },
    { label: "Version", value: "Mansory" || "-" },
    { label: "Structure", value: "Limousine" || "-" },
    { label: "Kilometer", value: "90’000 Km" || "-" },
    { label: "Vehicle condition", value: "Bodywork" || "-" },
    { label: "Drive", value: "Front-wheel drive" || "-", required: true },
    { label: "Transmission", value: "Automatic transmission" || "-" },
    { label: "PS", value: "249 Ps" || "-" },
    { label: "KW ", value: "490 kw" || "-" },
    { label: "Guarantee", value: "1 Year" || "-" },
    { label: "Vehicle color", value: "Black" || "-" },
    { label: "Interior color", value: "Black" || "-" },

    { label: "Seats", value: "5" || "-" },
    { label: "Doors", value: "5" || "-" },

    { label: "Number of gears", value: "6" || "-" },
    { label: "Engine displacement (cm³)", value: "4050 cm" || "-" },
  ];
  return (
    <div>
      <Breadcrumb pageName="Vehicles Information" />
      <div className="mt-20">
        <div className="flex items-center justify-between my-3">
          <MainHeading
            className="font-poppins"
            textColor="primary"
            textSize="text-[24px]"
            fontWeight="font-semibold"
            heading={vehicleDetails?.brand + " " + vehicleDetails?.model || "-"}
          />
          <div className="relative">
            <Button
              icon={<IoIosArrowDown size={24} />}
              borderRadius="rounded-md"
              bgColor="primary"
              textColor="white"
              text="Layout"
              iconPosition="right"
              onClick={handleButtonClick}
            />{" "}
            {isDropdownOpen && (
              <ul className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLayoutSelect("Layout 1")}
                >
                  Layout 1
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLayoutSelect("Layout 2")}
                >
                  Layout 2
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLayoutSelect("Layout 3")}
                >
                  Layout 3
                </li>
              </ul>
            )}
          </div>
        </div>
        {selectedLayout === "Layout 1" ? (
          <LayoutOne content={content} details={details} />
        ) : selectedLayout === "Layout 2" ? (
          <LayoutTwo content={content} details={details} />
        ) : (
          <LayoutThree content={content} details={details} />
        )}
        <div className="bg-[#313131] p-3 flex items-center justify-between">
          <div className="w-3/12 flex items-center justify-center">
            <img src={Images.whiteLogo} alt="white logo" className="pb-2" />
          </div>
          <div className="flex items-center gap-3 px-10">
            <img
              src={Images.facebookLogo}
              alt="facebook logo"
              className="pb-2"
            />
            <img
              src={Images.instagramLogo}
              alt="insatagram logo"
              className="pb-2"
            />
            <img src={Images.twitterLogo} alt="twitter logo" className="pb-2" />
            <img src={Images.googleLogo} alt="google logo" className="pb-2" />
            <img src={Images.youtubeLogo} alt="youtube logo" className="pb-2" />
          </div>
        </div>
        <div className="flex items-end justify-end gap-3 my-5">
          <Button
            text="Send"
            borderRadius="rounded-md "
            bgColor="white"
            borderColor="primary"
            textColor="primary"
          />
          <Button
            text="Download"
            borderRadius="rounded-md "
            bgColor="secondary"
            borderColor="secondary"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
}

export default VehicleDetailsPage;
