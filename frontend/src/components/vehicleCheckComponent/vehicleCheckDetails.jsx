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
const SingleVehicleCheckManagement = () => {
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

      <div className="mt-20">
        <div className="flex items-center justify-between mb-20">
          <MainHeading
            className="font-poppins"
            textColor="darkBlue"
            textSize="text-[24px]"
            fontWeight="font-semibold"
            // heading={vehicleDetails?.brand + " " + vehicleDetails?.model || "-"}
            heading={"BMW X5 XDrive M50d"}
          />
          <div className="flex items-center gap-3">
            <Button
              borderRadius="rounded-md"
              bgColor="primary"
              textColor="white"
              text="Rate car"
              fontSize="text-[16px]"
              padding="px-16 py-2"
              onClick={() => setShowRateCar(true)}
            />
            <Modal
              isOpen={showRateCar}
              onClose={() => setShowRateCar(false)}
              title={"Rate Car"}
              width={"w-[50%]"}
              fontSize={"text-2xl"}
              fontWeight="font-medium"
              setModalOpen={setShowRateCar}
            >
              <form className=" text-left" onSubmit={handleSubmit}>
                <label className="block mb-2">Car</label>
                <input
                  name="car"
                  value={formData.car}
                  placeholder="TG Number | Carname and model"
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 rounded"
                />

                <label className="block mb-2">Kilometer</label>
                <input
                  name="kilometer"
                  value={formData.kilometer}
                  placeholder="80000km"
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 rounded"
                />

                <label className="block mb-2">Fuel Type</label>
                <input
                  name="fuelType"
                  placeholder="Dropdown"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 rounded"
                />

                <label className="block mb-2">Registration</label>
                <input
                  name="registration"
                  placeholder="Verkäufer auswählen"
                  value={formData.registration}
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 rounded"
                />

                <label className="block mb-2">Verification</label>
                <input
                  name="verification"
                  placeholder="verification"
                  value={formData.verification}
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 rounded"
                />

                <label className="block mb-2">Last MOT</label>
                <input
                  name="lastMOT"
                  type="date"
                  value={formData.lastMOT}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
                <div className="flex  items-center justify-start gap-2 mt-4 mb-8">
                  <input
                    name="mfk"
                    type="checkbox"
                    value={formData.lastMOT}
                    onChange={handleChange}
                    className="border w-5 h-5 rounded"
                  />
                  <label className="">Ab MFK</label>
                </div>
                <h2 className="block mb-2 font-semibold text-darkBlue">
                  Optional Equipment
                </h2>

                <label className="block mb-2">search function</label>
                <input
                  type="text"
                  name="search"
                  placeholder="Enter Search"
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 rounded"
                />
                <div className="grid grid-cols-1 gap-4 mb-4">
                  {[
                    "Storage package",
                    "Adaptive cruise control",
                    "Adaptive cornering lights",
                    "Towbar with detachable attachment",
                    "Apps",
                    "Assist: Park Distance Control (rear)",
                    "Assist: Park Distance Control (front and rear)",
                    "Exterior mirror package",
                    "BMW Individual fine wood trim",
                    "BMW Individual extended",
                    "BMW Individual wood inlays for",
                    "BMW Individual composition",
                  ].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="optionalEquipment"
                        value={item}
                        checked={formData.optionalEquipment.includes(item)}
                        onChange={handleChange}
                        className="w-4 h-4 border-gray-300 rounded"
                      />
                      <span className="text-grayText">{item}</span>
                    </label>
                  ))}
                </div>
                <h2 className="block mb-4 font-semibold text-darkBlue mt-12">
                  Detailed Data
                </h2>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    "Disability-Friendly",
                    "Race Car",
                    "Direct/Parallel Import",
                    "Towbar with detachable attachment",
                  ].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="detailData"
                        value={item}
                        checked={formData.detailData.includes(item)}
                        onChange={handleChange}
                        className="w-4 h-4 border-gray-300 rounded"
                      />
                      <span className="text-grayText">{item}</span>
                    </label>
                  ))}
                </div>
                <h2 className="block mb-2 font-medium text-darkBlue mt-12">
                  Extras
                </h2>
                <div className="flex  items-center justify-start gap-2  mb-8">
                  <input
                    name="storagePackage"
                    type="checkbox"
                    value={formData.storagePackage}
                    onChange={handleChange}
                    className="border w-5 h-5 rounded"
                  />
                  <label className="">Storage package</label>
                </div>
                <h2 className="block mb-2 font-semibold  text-darkBlue mt-12">
                  Bodywork Condition
                </h2>
                <label className="block mb-2">
                  Damage Details (Scratches, Dents, Other)
                </label>
                <textarea
                  name="demageDetails"
                  value={formData.demageDetails}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe scratches, dents, etc........"
                  className="border p-2 w-full mb-4 rounded"
                />
                <label className="block mb-2 font-medium">Upload Images</label>
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 pl-7 rounded"
                />
                <h2 className="block mb-2 font-semibold  text-darkBlue mt-4 border-t pt-4">
                  Interior Condition
                </h2>
                <label className="block mb-2">Smoking Vehicle</label>
                <select
                  name="smokingVehicles"
                  value={formData.smokingVehicles}
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 outline-none rounded"
                >
                  <option value="">Yes/No</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                <label className="block mb-2">Wear and Tear Details</label>
                <textarea
                  name="wearDetails"
                  value={formData.wearDetails}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe seat, dashboard, and upholstery condition......."
                  className="border p-2 w-full mb-4 rounded"
                />
                <h2 className="block mb-2 font-medium">
                  Upload Interior Images
                </h2>
                <input
                  type="file"
                  name="interiorImages"
                  multiple
                  onChange={handleChange}
                  className="border p-2 w-full rounded mb-4 pl-7"
                />
                <h2 className="block mb-2 font-medium border-t pt-8 mt-8">
                  Technical Conditions
                </h2>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {[
                    "Brakes",
                    "Electronics",
                    "Clutch",
                    "Battery",
                    "Engine",
                    "Chassis",
                    "Suspension",
                    "Tires & Wheels",
                  ].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="technicalCondition"
                        value={item}
                        checked={formData.technicalCondition.includes(item)}
                        onChange={handleChange}
                        className="w-4 h-4 border-gray-300 rounded"
                      />
                      <span className="text-grayText">{item}</span>
                    </label>
                  ))}
                </div>
                <h2 className="block mb-5  font-semibold border-t pt-8 mt-8">
                  Maintenance & Service History
                </h2>

                <label className="block mb-2">Service Data Available?</label>
                <select
                  name="serviceData"
                  value={formData.serviceData}
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 outline-none rounded"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                <label className="block mb-2">Last Technical Inspection</label>
                <select
                  name="lastInspection"
                  value={formData.lastInspection}
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 outline-none rounded"
                >
                  <option value="">Select an option</option>
                  <option value="Less than 6 months ago">
                    Less than 6 months ago
                  </option>
                  <option value="6 months to 1 year ago">
                    6 months to 1 year ago
                  </option>
                  <option value="More than 1 year ago">
                    More than 1 year ago
                  </option>
                </select>

                <label className="block mb-2">
                  Additional Maintenance Notes
                </label>
                <textarea
                  name="maintenanceNotes"
                  rows={5}
                  placeholder="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore verit"
                  value={formData.maintenanceNotes}
                  onChange={handleChange}
                  className="border p-2  w-full mb-4 rounded"
                />

                <label className="block mb-2">Upload Images</label>
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleChange}
                  className="border p-2 w-full mb-4 rounded"
                />

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg mb-12 mt-4"
                >
                  Checkout
                </button>
              </form>
            </Modal>
          </div>
        </div>
        <div className="border rounded">
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
            <div>
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
            </div>
          </div>
        </div>

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
      </div>
      <VehicleAssessment />
    </>
  );
};

export default SingleVehicleCheckManagement;

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
