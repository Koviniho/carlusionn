import { useEffect, useState } from "react";
import {
  FaEye,
  FaHeart,
  FaArchive,
  FaTh,
  FaList,
  FaPlus,
} from "react-icons/fa";
import { IoGridOutline, IoSearchOutline } from "react-icons/io5";
import Images from "../../assets/images";
import Breadcrumb from "../Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { getSingleQuotation } from "../../store/features/quotationSlice/getSingleQuotationSlice";
import { useNavigate, useParams } from "react-router-dom";
import Icons from "../../assets/icons";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Button from "../Button";
import NoDataFound from "../NoDataFound";
import { formatDateToDDMMYYYY } from "../../utils/dateFormate";
import { openModal } from "../../store/designSlice/designSlice";
import PopUpModel from "../Modals/pop-up-modals";
import AddQuotationStepper from "./addQuotation";
import CheckLoader from "../Loading/carLoader";

const QuotationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleQuotation, loading } = useSelector(
    (state) => state?.getSingleQuotationSlice
  );
  const currentCar = {
    title: singleQuotation?.quotation?.filters?.model,
    id: formatDateToDDMMYYYY(singleQuotation?.quotation?.updatedAt),
    date: `${singleQuotation?.quotation?.filters?.yearFrom} - ${singleQuotation?.quotation?.filters?.yearTo}`,
    mileage: singleQuotation?.quotation?.filters?.mileageTo,
  };
  console.log("🚀 ~ QuotationDetail ~ singleQuotation:", singleQuotation);
  useEffect(() => {
    dispatch(getSingleQuotation(id));
  }, [dispatch, id]);
  //////////////TAB MANAGEMENT//////////
  const [selectedTab, setSelectedTab] = useState("All");

  // Render the content for the selected tab
  const tabs = ["All", "Unread", "Archieve"];
  const [layout, setLayout] = useState("list"); // Default to 'grid'

  const handleNavigate = (item) => {
    navigate(`/dashboard/vehicle-management/${item?.id}`);
  };

  ////////////////////// for edit the model //////////////////
  const [modalOpen, setModalOpen] = useState(false);
  if (loading) {
    return <CheckLoader size={80} />;
  }
  return (
    <div className="max-w-screen-xl mx-auto  min-h-screen">
      <Breadcrumb heading={`Searches`} pageName="Quotation Management" />
      <div className="flex items-center p-4 border rounded-md mb-5">
        <img
          src={currentCar.image || Images.detailCar}
          alt="BMW"
          className="w-64 h-32 object-cover rounded"
        />
        <div className="ml-4 flex-1 ">
          <h1 className="text-xl font-bold pb-1">{currentCar.title}</h1>
          <p className="text-xs text-gray-600 mb-4">
            Last Updated: {currentCar.id}
          </p>
          <div className="text-xs text-gray-600  space-x-2 ">
            <span className="border-primary border px-3 py-1 rounded-[110px] mt-4 ">
              <Icons.IoCalendarOutline className="inline mb-1 text-darkBlue" />{" "}
              {currentCar.date}
            </span>
            <span>|</span>
            <span className="border-primary border px-3 py-1 rounded-[110px] mt-4">
              <Icons.IoCalendarOutline className="inline mb-1 text-darkBlue" />{" "}
              {currentCar.mileage} km
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* <Button
            textColor="white"
            borderRadius="rounded"
            text={"Edit Search"}
            fontSize="text-sm"
            // onClick={() => dispatch(openModal())}
            onClick={() => setModalOpen(true)} 
          /> */}
          <div className="flex items-center gap-5">
            <PopUpModel
              heading="Add New Quotation"
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              trigger={
                <Button
                  text="Edit Search"
                  borderRadius="rounded-md"
                  textColor="white"
                  fontSize="text-base"
                  //  icon={<FaPlus className="h-4 w-4" />}
                  onClick={() => setModalOpen(true)}
                />
              }
            >
              <AddQuotationStepper
                setModalOpen={setModalOpen}
                modalOpen={modalOpen}
                singleQuotation={singleQuotation}
              />
            </PopUpModel>
          </div>
          {/* <div className="flex items-center gap-2">
            <img src={Images.download} className="text-primary" />
            <img
              src={Images.bin}
              className="text-error cursor-pointer w-4"
              //   onClick={() => handleDeleteClick(item)}
            />
            <MdOutlineRemoveRedEye
              size={20}
              className="text-secondary cursor-pointer"
              //   onClick={() => handleNavigate(item)}
            />
          </div> */}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 py-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`${
              selectedTab === tab
                ? "bg-primary text-white"
                : "bg-gray-100 text-grayText"
            } rounded-md px-10 py-1.5 transition-colors duration-300 ease-in-out text-base sm:text-lg`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & View Toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="relative w-full shadow">
          <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search vehicles..."
            className="w-full pl-10 pr-4 py-2  rounded-md focus:outline-none "
          />
        </div>
        <div className="flex space-x-2 ml-4">
          <Button
            textColor={layout === "list" ? "white" : "darkBlue"}
            bgColor={layout === "list" ? "primary" : "white"}
            borderColor={layout === "list" ? "primary" : "darkBlue"}
            borderRadius="rounded"
            padding="px-3 py-2"
            icon={<Icons.FaListUl />}
            onClick={() => setLayout("list")}
          />
          <Button
            textColor={layout === "grid" ? "white" : "darkBlue"}
            bgColor={layout === "grid" ? "primary" : "white"}
            borderColor={layout === "grid" ? "primary" : "darkBlue"}
            borderRadius="rounded"
            padding="px-3 py-2"
            icon={<IoGridOutline />}
            onClick={() => setLayout("grid")}
          />
        </div>
      </div>

      {/* Car List */}
      {singleQuotation?.vehicles?.results.length > 0 ? (
        <div>
          {singleQuotation?.vehicles?.results?.map((car) => (
            <div
              key={car.id}
              className="flex items-center gap-8 p-4 border-b hover:bg-gray-100"
            >
              <img
                src={car.titleImage}
                alt={car.model}
                className="w-32 h-24 object-cover rounded"
              />
              <div className="ml-4">
                <h2 className="text-sm font-semibold">{car.model}</h2>
                <p className="text-xs text-gray-500 mt-1">{car.make}</p>
                <p className="text-xs text-gray-500">
                  {car.fuel} | {car.manufactureYear} | {car.mileage} km
                </p>
              </div>
              <h4 className="text-primary font-bold">{car.price} CHF</h4>
              <button className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                Not Interested
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <img src={Images.download} className="text-primary" />
                <img
                  src={Images.bin}
                  className="text-error cursor-pointer w-4"
                  //   onClick={() => handleDeleteClick(item)}
                />
                <MdOutlineRemoveRedEye
                  size={20}
                  className="text-secondary cursor-pointer"
                  onClick={() => handleNavigate(car)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataFound
          content="Vehicles not available"
          height={"h-[300px]"}
          fontSize={"text-2xl"}
        />
      )}
    </div>
  );
};

export default QuotationDetail;
