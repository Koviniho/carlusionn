import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import MainHeading from "../../components/Heading/mainHeading";
import Modal from "../../components/modal/modal";
import CustomInput from "../../components/Input/custoInput";
import Button from "../../components/Button";
import Images from "../../assets/images";
import WebPageLayout from "../../components/webPageComponent/webpageLayout";
import { Link } from "react-router-dom";
import PATHS from "../../routes/path";

export default function WebPage() {
  const [selectedTab, setSelectedTab] = useState("Settings");
  const [webPageData, setWebPageData] = useState("");
  console.log("🚀 ~ WebPage ~ webPageData:", webPageData);
  // Tab names
  const tabs = ["Settings"];

  // Render the content for the selected tab
  const renderTabContent = () => {
    const tabContent = {
      Settings: <WebPageLayout setWebPageData={setWebPageData} />,
      // "Add Location": <></>,
    };
    return tabContent[selectedTab] || null;
  };
  const [openLocationModal, setOpenLocationModal] = useState(false);
  return (
    <div>
      <Breadcrumb heading="Hello, welcome Silas Rotzetter!👋" />
      <MainHeading
        heading="Webpage Setting"
        textColor="darkBlue"
        fontWeight="font-medium"
        textSize="text-[27px]"
        fontFamily="poppins"
      />
      <div className="flex justify-between space-x-4 py-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`${
              selectedTab === tab
                ? "bg-primary text-white"
                : "bg-gray-100 text-grayText"
            } rounded-md px-32 py-2 transition-colors text-lg duration-300 ease-in-out`}
          >
            {tab}
          </button>
        ))}
        <Link to={`/webpage/${webPageData?._id}`}>
          {" "}
          <button
            // onClick={() => setOpenLocationModal(true)}
            className=" py-2 px-12 rounded-md text-primary border border-primary  font-medium text-lg outline-none flex items-center gap-2 "
          >
            <img src={Images.backBlue} className="h-5 w-5" alt="message" />

            {/* Label */}
            <span className=" ">To the website</span>
          </button>
        </Link>
      </div>

      <Modal
        isOpen={openLocationModal}
        onClose={() => setOpenLocationModal(false)}
        title={"Add Location"}
        width={"w-[40%]"}
        setModalOpen={setOpenLocationModal}
      >
        <div className="p-4">
          {/* <p className="font-medium text-left">
            Disable two-factor authentication?
          </p>
          <p className="text-sm  text-grayText mb-4 mt-2">
            To disable two-factor authentication you must enter your password.
          </p> */}
          <div className="space-y-4">
            <CustomInput
              placeholder="vehicles"
              type="file"
              label={"Upload Images"}
              className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
            />
            <CustomInput
              placeholder="Sale"
              type="text"
              label={"Branch Name"}
              className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
            />
            <CustomInput
              placeholder="enter your company name"
              type="text"
              label={"Company Name"}
              className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
            />
            <CustomInput
              placeholder="address..."
              type="text"
              label={"Address"}
              className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
            />
            <CustomInput
              placeholder="vehicles"
              type="number"
              label={"No. of Vehicles"}
              className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
            />
            <div className="flex gap-8">
              <div className="flex gap-1">
                <input
                  type="radio"
                  className="text-sm outline-none pl-4 py-3 bg-[#F5F9FE]"
                />
                <p className="text-darkBlue text-sm">Current</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  className="text-sm outline-none pl-4 py-3 w-4 h-4 bg-[#F5F9FE]"
                />
                <p className="text-darkBlue text-sm">Other</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 my-4 mt-12 ">
            <Button
              text="Save"
              borderRadius="rounded-md"
              textColor="white"
              onClick={() => setOpenLocationModal(false)}
              className={"py-2 px-12"}
            />
            <button
              className={
                "hover:bg-none px-12 py-2 text-error border-2 border-error rounded-md font-medium"
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}
