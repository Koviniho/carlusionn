/* eslint-disable react/prop-types */
/* eslint-disable no-constant-binary-expression */
import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleVehicle } from "../../../store/features/vehicle/vehicleSlice";
import MainHeading from "../../../components/Heading/mainHeading";
import Text from "../../../components/Heading/text";
import "react-photo-view/dist/react-photo-view.css";
import VehicleDetailGraph from "../../../components/VehicleManagementComponent/vehicleDetailGraph";
import { FaAngleDown } from "react-icons/fa6";
import DetailsRightSide from "../../../components/VehicleManagementComponent/detailsRightSide";
import Button from "../../../components/Button";
import Icons from "../../../assets/icons";
import axios from "../../../services/api";
import showToast from "../../../utils/toaster";
import CheckLoader from "../../../components/Loading/carLoader";
function SingleVehicleManagemenPage() {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(true);
  const [showTechnicalInfo, setShowTechnicalInfo] = useState(true);
  const [infoFirst, setInfoFirst] = useState(true);
  const [infoSecond, setInfoSecond] = useState(true);
  const [infoThird, setInfoThird] = useState(true);

  const { id } = useParams();
  const { singleVehicle, isLoading } = useSelector((state) => state?.vehicle);
  const vehicleDetails = singleVehicle?.vehicle || {};
  console.log(
    "🚀 ~ SingleVehicleManagemenPage ~ vehicleDetails:",
    vehicleDetails
  );

  useEffect(() => {
    dispatch(getSingleVehicle(id));
  }, [id]);
  const details = [
    { label: "Brand", value: vehicleDetails?.make || "-" },
    { label: "Model", value: vehicleDetails?.model || "-" },
    {
      label: "First registration.",
      value: vehicleDetails?.firstRegistration
        ? new Date(vehicleDetails.firstRegistration).toISOString().split("T")[0]
        : "-",
    },
    { label: "Typengenehmigung ", value: vehicleDetails?.typeApproval || "-" },
    { label: "Version", value: vehicleDetails?.version || "-" },
    { label: "Body type", value: vehicleDetails?.bodyType || "-" },
    { label: "Kilometer", value: vehicleDetails?.condition?.kilometer || "-" },
    { label: "Fahrgestellnummer", value: "CHI-F4354-43BL-2JA8" || "-" },
    { label: "Drive system *", value: vehicleDetails?.drive || "-" },
    { label: "Transmission", value: vehicleDetails?.transmission || "-" },
    { label: "PS/KW", value: vehicleDetails?.psKw || "-" },
    // { label: "KW ", value: "490 kw" || "-" },
    { label: "Stammnummer", value: vehicleDetails?.trunkNumber || "-" },
    {
      label: "Vehicle color",
      value: vehicleDetails?.vehicleFeatures?.vehicleColor || "-",
    },
    {
      label: "Interior color",
      value: vehicleDetails?.vehicleFeatures?.interiorColor || "-",
    },
    { label: "New price", value: vehicleDetails?.price?.newPrice_CHF || "-" },
    { label: "Warranty", value: vehicleDetails?.condition?.warranty || "-" },
    {
      label: "Last MFK",
      value: vehicleDetails?.condition?.lastMFK
        ? new Date(vehicleDetails?.condition?.lastMFK)
            .toISOString()
            .split("T")[0]
        : "-",
    },
    { label: "Number of gears", value: vehicleDetails?.noOfGears || "-" },
    {
      label: "Displacement (cm3) ",
      value: vehicleDetails?.capacity_cm3 || "-",
    },
    { label: "Seats", value: vehicleDetails?.seats || "-" },
    { label: "Doors", value: vehicleDetails?.doors || "-" },

    {
      label: "Vehicle condition",
      value: vehicleDetails?.condition?.vehicleCondition || "-",
    },
  ];
  const infoDetailsOne = [
    { label: "Fuel", value: vehicleDetails?.fuel || "-" },
    { label: "Energy chain (kg)", value: vehicleDetails?.energyLabel || "-" },
    {
      label: "Emission standard * (mm)",
      value: vehicleDetails?.emissionStandard || "-",
    },
    { label: "Standard equipment", value: "View optional equipment" || "-" },
    { label: "Optional equipment", value: "View standard equipment" || "-" },
  ];
  const infoDetailsSecond = [
    { label: "Curb weight (kg)", value: vehicleDetails?.curbWeight_kg || "-" },
    { label: "Payload (kg)", value: vehicleDetails?.payload_kg || "-" },
    { label: "Wheelbase (mm)", value: vehicleDetails?.wheelbase_mm || "-" },
    {
      label: "Length (mm)",
      value:
        vehicleDetails?.optionalEquipment?.vehicleDimension?.length_mm || "-",
    },
    {
      label: "Height (mm)",
      value:
        vehicleDetails?.optionalEquipment?.vehicleDimension?.height_mm || "-",
    },
    {
      label: "Width (mm)",
      value:
        vehicleDetails?.optionalEquipment?.vehicleDimension?.width_mm || "-",
    },
  ];
  const detailedData = vehicleDetails?.detailedData || [];
  const extras = vehicleDetails?.extras;
  const infoDetailsThird = [
    { label: "Damaged vehicle", key: "accidentVehicle" },
    { label: "Accessible for disabled persons", key: "disability-friendly" },
    { label: "Direct parallel import", key: "direct/parallel-import" },
    { label: "Race car", key: "raceCar" },
    { label: "Tuning", key: "tuning" },
    { label: "Extras", value: extras ? "8-tire set" : "-" }, // Extras remain unchanged
  ].map((item) => ({
    label: item.label,
    value: item.value || (detailedData.includes(item.key) ? "YES" : "NO"),
  }));

  ///////////////status Change ///////////
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setStatus(vehicleDetails?.status); // Set the fetched status
      } catch (error) {
        console.error("Error fetching status:", error);
        showToast("error", "Failed to fetch vehicle status.");
      }
    };

    fetchStatus();
  }, [id, vehicleDetails]);
  const [status, setStatus] = useState("");
  const statusOptions = [
    { label: "Available", value: "available" },
    { label: "Sold", value: "sold" },
    { label: "Reserved", value: "reserved" },
  ];
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.put("/vehicle/update-status", {
        id: id,
        status: newStatus,
      });
      console.log("🚀 ~ handleStatusChange ~ response:", response);

      setStatus(newStatus); // Update local state
      showToast("success", response.data.message);
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("error", error.payload.message);
    }
  };
  if (isLoading) {
    return <CheckLoader size={80} />;
  }
  return (
    <>
      <Breadcrumb pageName="Vehicles Management" />

      <div className="mt-20">
        <div className="flex items-center justify-between">
          <MainHeading
            className="font-poppins"
            textColor="darkBlue"
            textSize="text-[24px]"
            fontWeight="font-semibold"
            heading={vehicleDetails?.make + " " + vehicleDetails?.model || "-"}
            // heading={"BMW X5 XDrive M50d"}
          />
          {/* <GoBack pageName="Vehicles List" /> */}
          <div className="flex items-center gap-3">
            <Button
              icon={<Icons.BiQrScan size={24} />}
              borderRadius="rounded-md"
              textColor="white"
            />
            {/* <Button
              icon={<IoIosArrowDown size={24} />}
              borderRadius="rounded-md"
              bgColor="secondary"
              textColor="white"
              text="Available"
              iconPosition="right"
                fontSize="text-[16px]"
            /> */}
            <div className="relative">
              <select
                value={status}
                onChange={handleStatusChange}
                className="rounded-md bg-secondary text-white p-2 text-[16px] cursor-pointer appearance-none pr-8 outline-none"
              >
                {statusOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-white text-darkBlue"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 7l5 5 5-5"
                  />
                </svg>
              </div>
            </div>
            <Button
              icon={<Icons.BiEditAlt size={20} />}
              borderRadius="rounded-md"
              bgColor="primary"
              textColor="white"
              text="Edit"
              fontSize="text-[16px]"
            />
            <Button
              borderRadius="rounded-md"
              bgColor="primary"
              textColor="white"
              text="Advertise on Carlano"
              fontSize="text-[16px]"
            />
          </div>
        </div>
        <div className="grid grid-cols-10 gap-4 mt-10  items-start justify-start  ">
          <div className=" col-span-7 space-y-5 ">
            <div className="bg-white p-5 flex items-center pb-2 border rounded">
              <div className="w-4/12 font-semibold space-y-2">
                <div>
                  <p className="text-lg ">Sale price</p>
                  <p className=" text-[32px] text-primary ">
                    {" "}
                    {vehicleDetails?.price?.sellingPrice_CHF} CHF
                  </p>
                </div>
                <div>
                  <p className=" text-lg">Purchase price</p>
                  <p className=" text-[32px] text-error ">
                    {" "}
                    {vehicleDetails?.purchaseDetails?.purchasePrice_CHF} CHF
                  </p>
                </div>
              </div>
              <div className=" w-full ">
                <VehicleDetailGraph />
              </div>
            </div>
            <div className=" border rounded">
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
                <div className="grid grid-cols-8  p-4 gap-4 ">
                  {details?.map((detail, index) => (
                    <div key={index} className="col-span-2">
                      <p className="font-medium text-darkBlue">
                        {detail?.label}
                      </p>
                      <p className={`font-normal text-grayText`}>
                        {detail?.value}
                      </p>
                    </div>
                  ))}
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
                <div className="">
                  <div className="flex items-center p-4 gap-4">
                    <Text
                      content={"Technical information"}
                      textColor="text-darkBlue"
                      fontWeight="font-semibold"
                    />
                    <FaAngleDown
                      className={`cursor-pointer text-grayText transition-transform duration-300 ${
                        showTechnicalInfo ? "" : "rotate-180"
                      }`}
                      onClick={() => setShowTechnicalInfo(!showTechnicalInfo)}
                    />
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500  p-4 ease-in-out ${
                      showTechnicalInfo
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <label className="font-semibold text-normal text-darkBlue">
                        Additional Title
                      </label>
                      {/* <textarea
                        className="border border-lightGray rounded-sm p-2 focus:outline-none"
                        rows="4"
                       
                      /> */}
                      <p className="px-4 pb-12 pt-4 bg-white rounded-md border">
                        {vehicleDetails?.additionalTitle || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 mt-2">
                      <label className="font-semibold text-normal text-darkBlue">
                        Vehicle Description
                      </label>
                      {/* <textarea
                        className="border border-lightGray rounded-sm p-2 focus:outline-none"
                        rows="4"
                       
                      /> */}
                      <p className="px-4 pb-12 pt-4 bg-white rounded-md border">
                        {vehicleDetails?.vehicleDescription || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 rounded-md ">
            <DetailsRightSide />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleVehicleManagemenPage;

const ExpandableSection = ({ title, details, isOpen, toggleOpen }) => {
  return (
    <div className="">
      <div className="flex items-center p-4 gap-4">
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
