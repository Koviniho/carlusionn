import { useState } from "react";
import Images from "../../assets/images";
import Breadcrumb from "../../components/Breadcrumb";
import ReportsComponent from "../../components/reportsComponent/reportsComponent";
import TotalIncomeComponent from "../../components/reportsComponent/totalIncome";
import CarTrafficComponent from "../../components/reportsComponent/carTraffic";
import VehicleCheckComponent from "../../components/vehicleCheckComponent/vehicleCheckComponent";

const VehicleCheck = () => {
  {
    /*///////////////////// tabs////////// */
  }

  /////////// tabs management //////////
  const [selectedTab, setSelectedTab] = useState("Type Approval");

  // Tab names
  const tabs = [
    "Type Approval",
    "Reference Number",
    "Make and Model",
   
  ];

  const renderTabContent = () => {
    const tabContent = {
      "Type Approval": <VehicleCheckComponent />,
      "Reference Number": <ReportsComponent income={true} />,
      "Make and Model": <TotalIncomeComponent totalIncome={true} />,
    };
    return tabContent[selectedTab] || null;
  };
  return (
    <div>
      <Breadcrumb pageName="Vehicle Check" />
      <div className="mt-4 mb-2">
        <button
          // onClick={handleButtonClick}
          style={{
            backgroundImage: ` url(${Images.vehiclecheckimage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className=" w-full  text-white rounded-[10px] cursor-pointer "
        >
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <img src={Images.loginLogo} alt="" className="object-cover" />
            <p className="font-medium text-lg">
              Welcome back! Continue checking vehicles?
            </p>
          </div>
        </button>
      </div>
      {/*///////////////////// tabs////////// */}
      <div className="flex space-x-4  justify-center items-center py-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`${
              selectedTab === tab
                ? "bg-primary text-white"
                : "bg-gray-100 text-grayText"
            } rounded-md px-10 py-1.5 transition-colors text-lg duration-300 ease-in-out`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};
export default VehicleCheck;
